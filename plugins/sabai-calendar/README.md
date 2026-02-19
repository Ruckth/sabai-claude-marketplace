# Sabai Calendar

**Calendar assistant with Google Calendar integration for event management, meeting scheduling, and time optimization.**

| Field | Value |
|-------|-------|
| Type | Skills + Commands |
| Version | 1.1.0 |
| Status | Active |
| Command | `/today`, `/event`, `/schedule`, `/briefing` |
| Repo | `plugins/sabai-calendar` |

---

## Overview

A calendar management assistant plugin that integrates Google Calendar with Claude. Supports natural language event creation, daily/weekly schedule viewing, recurring events, availability checking, timezone handling, and video conferencing integration (Google Meet/Zoom). Includes smart time blocking features like focus time protection and calendar health analysis.

## Key Features

- Natural language event creation
- Daily and weekly schedule views
- Meeting scheduling with availability checking
- Timezone support for global teams
- Video conferencing integration (Google Meet/Zoom)
- Focus time blocking
- Calendar health analysis and recommendations

## Use Cases

- "What's on my calendar today?"
- "Schedule a team meeting tomorrow at 2pm for 1 hour"
- "Block 2 hours of focus time tomorrow morning"
- "Check my availability this week"
- "Give me my morning briefing"

## Commands

- `/today` - Show today's schedule
- `/week [start]` - Show weekly overview
- `/briefing [date]` - Get comprehensive daily briefing
- `/availability [range] [attendees]` - Check free time
- `/event [title] [time] [duration]` - Create a calendar event
- `/schedule [desc] [duration] [attendees]` - Schedule a meeting
- `/focus [duration] [when]` - Block protected focus time
- `/health [period]` - Calendar health check and recommendations

## Configuration

### Connection Options

There are two ways to connect Google Calendar with Claude:

| Option | Scope | Best For |
|--------|-------|----------|
| **Claude Built-in Integration** | Account-wide (all devices) | Personal use, quick setup |
| **Google Calendar MCP** | Per-device | Team/work accounts, multiple Google accounts |

### Option 1: Claude Built-in Integration

Use Claude's native Google integration:

1. Go to **Claude Settings** → **Integrations**
2. Connect your Google account
3. Grant Calendar permissions

**Note:** This connection applies to all devices using your Claude account.

### Option 2: Google Calendar MCP (Recommended for Work)

Use the Google Calendar MCP server for per-device control:

```json
{
  "mcpServers": {
    "google-calendar": {
      "command": "npx",
      "args": ["-y", "@anthropic/google-calendar-mcp@latest"]
    }
  }
}
```

**Benefits:**
- Connect different Google accounts on different devices
- Work calendar on work machine, personal on personal
- OAuth tokens stored locally per device
- More granular control over permissions

**Setup:**
1. Add the MCP configuration to your Claude settings
2. On first use, a browser window opens for Google OAuth
3. Sign in with the Google account you want to use on this device
4. Authorize the requested Calendar permissions

### Using Multiple Google Accounts

To use different accounts:

1. **Work laptop**: Connect via MCP with work Google account
2. **Personal device**: Connect via MCP with personal Google account
3. **Shared device**: Use Claude built-in integration (switches with Claude account)

## Authentication

OAuth via Google. Browser opens for sign-in on first use.

### Re-authenticating

If you need to switch accounts or re-authorize:

1. Delete the OAuth token file (location shown in terminal on first auth)
2. Restart Claude Code
3. Re-authenticate with the new account

## Permissions

Required Claude Code permissions:
- Google Calendar MCP tools for calendar operations

## Dependencies

- **Required**: Google Calendar MCP server (`@anthropic/google-calendar-mcp`)
- **Optional**: Google Meet or Zoom for video conferencing

## Limitations

- Requires Google account with Calendar access
- OAuth consent required on first use

## Links

- [README](https://github.com/sabaisystem/sabai-claude-marketplace/tree/main/plugins/sabai-calendar)
- [CHANGELOG](https://github.com/sabaisystem/sabai-claude-marketplace/tree/main/plugins/sabai-calendar/CHANGELOG.md)
