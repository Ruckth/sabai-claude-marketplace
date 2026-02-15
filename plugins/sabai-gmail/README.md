# Sabai Gmail

Gmail assistant for email composition, inbox management, templates, and follow-up tracking.

## Features

### Email Composition
- **Smart Drafts** - Generate professional emails with appropriate tone
- **Reply Assistance** - Draft contextual replies based on email threads
- **Email Templates** - Use and customize templates for common scenarios

### Inbox Management
- **Email Triage** - Prioritize and categorize emails efficiently
- **Label Suggestions** - Organize emails with smart labeling
- **Search Assistance** - Find emails with advanced search queries

### Follow-up & Tracking
- **Follow-up Reminders** - Track emails needing responses
- **Meeting Requests** - Draft meeting invitations and calendar events
- **Action Items** - Extract and track action items from emails

### Communication
- **Tone Adjustment** - Rewrite emails for different contexts (formal, casual, etc.)
- **Summarization** - Summarize long email threads
- **Translation** - Draft emails in different languages

## Prerequisites

- Gmail MCP server configured and connected
- Google Calendar MCP (optional, for meeting scheduling)

### Setting up Gmail MCP

Add to your Claude configuration:

```json
{
  "mcpServers": {
    "gmail": {
      "command": "npx",
      "args": ["-y", "@anthropic/gmail-mcp-server"],
      "env": {
        "GOOGLE_OAUTH_CREDENTIALS": "/path/to/credentials.json"
      }
    }
  }
}
```

See [Gmail MCP documentation](https://github.com/anthropics/gmail-mcp-server) for OAuth setup.

## Commands

### Composing Emails
| Command | Description |
|---------|-------------|
| `/email [recipient] [subject]` | Compose a new email |
| `/reply [context]` | Draft a reply to an email |
| `/followup [email-ref]` | Create a follow-up email |

### Inbox Management
| Command | Description |
|---------|-------------|
| `/inbox [filter]` | View and triage inbox |
| `/search [query]` | Search emails with advanced filters |
| `/labels [action]` | Manage email labels |

### Templates & Productivity
| Command | Description |
|---------|-------------|
| `/template [name]` | Use an email template |
| `/meeting [attendees] [topic]` | Schedule a meeting via email |
| `/summarize [thread]` | Summarize an email thread |

## Email Templates

Built-in templates for common scenarios:

- `intro` - Professional introduction
- `follow-up` - Follow-up on previous conversation
- `thank-you` - Thank you email
- `meeting-request` - Request a meeting
- `update` - Status update
- `decline` - Politely decline a request
- `referral` - Request or give a referral
- `feedback` - Request or provide feedback

## Usage Examples

### Compose a New Email
```
/email john@example.com Project Update
```

### Reply to an Email
```
/reply with a professional tone accepting their proposal
```

### Search Your Inbox
```
/search from:jane has:attachment after:2024-01-01
```

### Schedule a Meeting
```
/meeting team@company.com Q1 Planning Session
```

### Use a Template
```
/template meeting-request
```

### Summarize a Thread
```
/summarize the marketing campaign discussion
```

## Skills

This plugin includes skills for:

| Skill | Description |
|-------|-------------|
| `email-composition.md` | Writing effective emails |
| `email-templates.md` | Template library and customization |
| `inbox-management.md` | Organization and triage strategies |
| `tone-adjustment.md` | Adapting communication style |
| `follow-up-tracking.md` | Managing follow-ups and reminders |

## Tips

- Use `/inbox` at the start of each day to prioritize
- Draft important emails with `/email` and review before sending
- Use `/summarize` for long threads before responding
- Set up templates for emails you send frequently
- Use `/followup` to ensure important conversations don't slip

## Links

- [Gmail](https://mail.google.com)
- [Sabai System](https://sabaisystem.com)
