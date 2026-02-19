import { registerAppResource, registerAppTool, RESOURCE_MIME_TYPE } from "@modelcontextprotocol/ext-apps/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult, ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";
import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

// Works both from source (server.ts) and compiled (dist/server.js)
const DIST_DIR = import.meta.filename.endsWith(".ts")
  ? path.join(import.meta.dirname, "dist")
  : import.meta.dirname;

// ============ EMAIL EDITOR STATE ============

interface EmailDraft {
  id: string;
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  body: string;
  signature: string;
  replyToThreadId?: string;
  replyToMessageId?: string;
  createdAt: number;
  updatedAt: number;
}

// In-memory draft storage
const drafts = new Map<string, EmailDraft>();

function generateId(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

// ============ MCP SERVER ============

export function createServer(): McpServer {
  const server = new McpServer({
    name: "Sabai Gmail Editor",
    version: "1.0.0",
  });

  const resourceUri = "ui://gmail-editor/mcp-app.html";

  // Main tool to open the email editor
  registerAppTool(server,
    "compose_email",
    {
      title: "Compose Email",
      description: "Open the email editor to compose or edit an email. Use this when the user wants to write, reply to, or edit an email.",
      inputSchema: {
        to: z.array(z.string()).optional().describe("Pre-filled recipients"),
        cc: z.array(z.string()).optional().describe("Pre-filled CC recipients"),
        bcc: z.array(z.string()).optional().describe("Pre-filled BCC recipients"),
        subject: z.string().optional().describe("Pre-filled subject line"),
        body: z.string().optional().describe("Pre-filled email body (can include draft content)"),
        signature: z.string().optional().describe("Email signature to append"),
        reply_to_thread_id: z.string().optional().describe("Thread ID if this is a reply"),
        reply_to_message_id: z.string().optional().describe("Message ID if this is a reply"),
        draft_id: z.string().optional().describe("Resume editing an existing draft"),
      },
      _meta: { ui: { resourceUri } },
    },
    async (args): Promise<CallToolResult> => {
      const {
        to = [],
        cc = [],
        bcc = [],
        subject = "",
        body = "",
        signature = "",
        reply_to_thread_id,
        reply_to_message_id,
        draft_id
      } = args;

      let draft: EmailDraft;

      if (draft_id && drafts.has(draft_id)) {
        // Resume existing draft
        draft = drafts.get(draft_id)!;
      } else {
        // Create new draft
        draft = {
          id: generateId(),
          to: Array.isArray(to) ? to : [],
          cc: Array.isArray(cc) ? cc : [],
          bcc: Array.isArray(bcc) ? bcc : [],
          subject: subject || "",
          body: body || "",
          signature: signature || "",
          replyToThreadId: reply_to_thread_id,
          replyToMessageId: reply_to_message_id,
          createdAt: Date.now(),
          updatedAt: Date.now()
        };
        drafts.set(draft.id, draft);
      }

      const draftData = {
        draft_id: draft.id,
        to: draft.to,
        cc: draft.cc,
        bcc: draft.bcc,
        subject: draft.subject,
        body: draft.body,
        signature: draft.signature,
        is_reply: !!(draft.replyToThreadId || draft.replyToMessageId),
        reply_to_thread_id: draft.replyToThreadId,
        reply_to_message_id: draft.replyToMessageId,
      };

      return {
        content: [
          {
            type: "text",
            text: `Email editor opened. The user can now compose their email in the editor above.`
          },
          {
            type: "text",
            text: JSON.stringify(draftData)
          }
        ]
      };
    },
  );

  // Tool to update the draft (called by UI as user types)
  registerAppTool(server,
    "update_draft",
    {
      title: "Update Draft",
      description: "Update the email draft content",
      inputSchema: {
        draft_id: z.string().describe("The draft ID"),
        to: z.array(z.string()).optional().describe("Updated recipients"),
        cc: z.array(z.string()).optional().describe("Updated CC recipients"),
        bcc: z.array(z.string()).optional().describe("Updated BCC recipients"),
        subject: z.string().optional().describe("Updated subject"),
        body: z.string().optional().describe("Updated body"),
      },
      _meta: { ui: { resourceUri, visibility: ["app"] } },
    },
    async (args): Promise<CallToolResult> => {
      const draft = drafts.get(args.draft_id);
      if (!draft) {
        return { content: [{ type: "text", text: JSON.stringify({ error: "Draft not found" }) }], isError: true };
      }

      // Update fields if provided
      if (args.to !== undefined) draft.to = args.to;
      if (args.cc !== undefined) draft.cc = args.cc;
      if (args.bcc !== undefined) draft.bcc = args.bcc;
      if (args.subject !== undefined) draft.subject = args.subject;
      if (args.body !== undefined) draft.body = args.body;
      draft.updatedAt = Date.now();

      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            draft_id: draft.id,
            updated: true,
            updated_at: draft.updatedAt
          })
        }]
      };
    },
  );

  // Tool to send the email (triggers actual send via Gmail MCP)
  registerAppTool(server,
    "send_email",
    {
      title: "Send Email",
      description: "Send the composed email. This will trigger the Gmail MCP to actually send the email.",
      inputSchema: {
        draft_id: z.string().describe("The draft ID to send"),
      },
      _meta: { ui: { resourceUri, visibility: ["app"] } },
    },
    async (args): Promise<CallToolResult> => {
      const draft = drafts.get(args.draft_id);
      if (!draft) {
        return { content: [{ type: "text", text: JSON.stringify({ error: "Draft not found" }) }], isError: true };
      }

      // Validate required fields
      if (draft.to.length === 0) {
        return { content: [{ type: "text", text: JSON.stringify({ error: "No recipients specified" }) }], isError: true };
      }
      if (!draft.subject.trim()) {
        return { content: [{ type: "text", text: JSON.stringify({ error: "Subject is required" }) }], isError: true };
      }

      // Prepare the email data for sending
      // The actual sending will be done by Claude using the Gmail MCP
      const emailToSend = {
        ready_to_send: true,
        draft_id: draft.id,
        to: draft.to,
        cc: draft.cc,
        bcc: draft.bcc,
        subject: draft.subject,
        body: draft.body + (draft.signature ? `\n\n${draft.signature}` : ""),
        reply_to_thread_id: draft.replyToThreadId,
        reply_to_message_id: draft.replyToMessageId,
      };

      // Remove from drafts after preparing to send
      drafts.delete(args.draft_id);

      return {
        content: [{
          type: "text",
          text: JSON.stringify(emailToSend)
        }]
      };
    },
  );

  // Tool to save as draft (close editor but keep draft)
  registerAppTool(server,
    "save_draft",
    {
      title: "Save Draft",
      description: "Save the email as a draft and close the editor",
      inputSchema: {
        draft_id: z.string().describe("The draft ID to save"),
      },
      _meta: { ui: { resourceUri, visibility: ["app"] } },
    },
    async (args): Promise<CallToolResult> => {
      const draft = drafts.get(args.draft_id);
      if (!draft) {
        return { content: [{ type: "text", text: JSON.stringify({ error: "Draft not found" }) }], isError: true };
      }

      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            saved: true,
            draft_id: draft.id,
            message: "Draft saved. You can resume editing later using the draft ID."
          })
        }]
      };
    },
  );

  // Tool to discard the draft
  registerAppTool(server,
    "discard_draft",
    {
      title: "Discard Draft",
      description: "Discard the email draft and close the editor",
      inputSchema: {
        draft_id: z.string().describe("The draft ID to discard"),
      },
      _meta: { ui: { resourceUri, visibility: ["app"] } },
    },
    async (args): Promise<CallToolResult> => {
      const existed = drafts.delete(args.draft_id);

      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            discarded: true,
            existed,
            message: existed ? "Draft discarded." : "Draft was already discarded or did not exist."
          })
        }]
      };
    },
  );

  // Register the HTML resource
  registerAppResource(server,
    resourceUri,
    resourceUri,
    { mimeType: RESOURCE_MIME_TYPE },
    async (): Promise<ReadResourceResult> => {
      const html = await fs.readFile(path.join(DIST_DIR, "mcp-app.html"), "utf-8");
      return {
        contents: [{ uri: resourceUri, mimeType: RESOURCE_MIME_TYPE, text: html }],
      };
    },
  );

  return server;
}
