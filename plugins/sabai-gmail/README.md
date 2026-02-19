# Sabai Gmail

**Gmail assistant for email composition, inbox management, templates, and follow-up tracking.**

| Field | Value |
|-------|-------|
| Type | MCP App + Skills + Commands |
| Version | 1.3.0 |
| Status | Active |
| Command | `/email`, `/reply`, `/inbox`, `/template`, `/followup` |
| Repo | `plugins/sabai-gmail` |

---

## Overview

A Gmail assistant plugin for email composition, inbox management, templates, and follow-up tracking. Features an embedded email editor UI, smart drafts with tone adjustment, contextual reply assistance, built-in email templates, email triage and prioritization, thread summarization, and multi-language support.

## Key Features

- **MCP App Email Editor** - Embedded UI for composing and editing emails directly in Claude
- Smart email drafts with appropriate tone
- Contextual reply assistance based on email threads
- 8 built-in email templates (intro, follow-up, thank-you, meeting-request, update, decline, referral, feedback)
- Inbox triage and prioritization
- Thread summarization
- Action item extraction
- Multi-language support

## Use Cases

- "Draft an email to john@example.com about the project update"
- "Reply to this email with a professional tone accepting their proposal"
- "Summarize the marketing campaign email thread"
- "Use the meeting-request template"

## MCP App Email Editor

The email editor provides an embedded UI in Claude for composing emails:

- **To/CC/BCC fields** - Email chips for easy recipient management
- **Subject field** - Editable subject line
- **Body editor** - Full text editor for email content
- **Signature** - Displays configured signature
- **Actions** - Send, Save Draft, or Discard

### MCP Tools

- `compose_email` - Open the email editor with optional pre-filled content
- `update_draft` - Save changes to a draft (UI-only)
- `send_email` - Send the composed email (UI-only)
- `save_draft` - Save and close the editor (UI-only)
- `discard_draft` - Discard the draft (UI-only)

## Commands

- `/email [recipient] [subject]` - Compose a new email
- `/reply [context]` - Draft a reply to an email
- `/followup [email-ref]` - Detect and manage follow-up emails
- `/inbox [filter]` - View and triage inbox
- `/search [query]` - Search emails with advanced filters
- `/template [name]` - Use an email template
- `/summarize [thread]` - Summarize an email thread

## Configuration

### MCP Server Setup

```json
{
  "mcpServers": {
    "gmail": {
      "command": "npx",
      "args": ["-y", "@anthropic/gmail-mcp@latest"]
    },
    "google-calendar": {
      "command": "npx",
      "args": ["-y", "@anthropic/google-calendar-mcp@latest"]
    },
    "sabai-gmail-editor": {
      "command": "npx",
      "args": ["tsx", "mcp/main.ts"],
      "cwd": "."
    }
  }
}
```

## Authentication

OAuth via Google. Browser opens for sign-in on first use.

## Permissions

Required Claude Code permissions:
- Gmail MCP tools for email operations

## Dependencies

- **Required**: Gmail MCP server (`@anthropic/gmail-mcp`)
- **Required for MCP App**: `tsx` (for running TypeScript server)
- **Optional**: Google Calendar MCP (for meeting scheduling)

## Limitations

- Requires Google account with Gmail
- OAuth consent required on first use

## Links

- [README](https://github.com/sabaisystem/sabai-claude-marketplace/tree/main/plugins/sabai-gmail)
- [CHANGELOG](https://github.com/sabaisystem/sabai-claude-marketplace/tree/main/plugins/sabai-gmail/CHANGELOG.md)
