# Sabai PM

Product Manager assistant with Linear integration. Create tickets from templates, manage your backlog, and generate PRDs.

## Features

- **PRD Creation** - Generate structured Product Requirement Documents
- **Ticket Templates** - Create consistent, well-structured tickets
- **Backlog Management** - View and prioritize your Linear backlog
- **Linear Integration** - Directly create and manage tickets in Linear

## Prerequisites

- Linear MCP server configured and connected
- Linear API key with appropriate permissions

### Setting up Linear MCP

Add to your Claude configuration:

```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "@linear/mcp-server"],
      "env": {
        "LINEAR_API_KEY": "your-linear-api-key"
      }
    }
  }
}
```

Get your API key from: Linear Settings → API → Personal API Keys

## Commands

| Command | Description |
|---------|-------------|
| `/prd [description]` | Create a Product Requirement Document |
| `/ticket [type] [description]` | Create a ticket from template |
| `/backlog [options]` | View and manage backlog |

## Ticket Types

- `feature` - New feature
- `bug` - Bug report
- `improvement` - Enhancement
- `spike` - Research task
- `epic` - Large initiative

## Usage Examples

### Create a PRD
```
/prd User authentication with SSO support
```

### Create a Feature Ticket
```
/ticket feature Add export to CSV functionality
```

### Create a Bug Ticket
```
/ticket bug Users can't reset password on mobile
```

### View Backlog
```
/backlog --team Engineering
```

### Prioritize Backlog
```
/backlog prioritize
```

## Skills

This plugin includes skills for:

- **PRD Creation** (`skills/prd.md`) - Templates and guidance for PRDs
- **Ticket Templates** (`skills/ticket-templates.md`) - Templates for all ticket types

## Tips

- Use `/prd` first to document features, then break down into tickets
- Be specific in ticket descriptions - future you will thank you
- Use labels consistently across your team
- Set priorities based on user impact, not just urgency

## Links

- [Linear](https://linear.app)
- [Sabai System](https://sabaisystem.com)
