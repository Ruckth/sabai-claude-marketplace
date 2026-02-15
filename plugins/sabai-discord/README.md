# Sabai Discord

Discord assistant for server management, messaging, channel organization, and community engagement.

## Features

### Messaging
- **Send Messages** - Post messages to any channel
- **Read Messages** - Retrieve recent message history
- **Edit & Delete** - Modify or remove messages
- **Reactions** - Add or remove emoji reactions

### Server Management
- **Server Info** - Get detailed server information
- **User Lookup** - Find user IDs by username
- **Direct Messages** - Send private messages to users

### Channel Management
- **Create Channels** - Set up new text channels
- **Delete Channels** - Remove unused channels
- **List Channels** - View all channels in a server
- **Categories** - Organize channels into categories

### Role Management
- **Create Roles** - Set up new server roles
- **Assign Roles** - Add roles to users
- **Remove Roles** - Take roles away from users
- **Edit Roles** - Modify role settings

### Webhooks
- **Create Webhooks** - Set up webhook integrations
- **Send via Webhook** - Post messages as webhooks
- **List Webhooks** - View webhook configurations

## Prerequisites

- Discord MCP server configured and connected
- Discord Bot Token with appropriate permissions

### Setting up Discord MCP

Add to your Claude configuration:

```json
{
  "mcpServers": {
    "discord-mcp": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e", "DISCORD_TOKEN",
        "-e", "DISCORD_GUILD_ID",
        "mcp/discord-mcp"
      ],
      "env": {
        "DISCORD_TOKEN": "your-bot-token-here",
        "DISCORD_GUILD_ID": "your-default-server-id"
      }
    }
  }
}
```

See [Discord MCP documentation](https://github.com/SaseQ/discord-mcp) for setup details.

### Bot Permissions

Your Discord bot needs these permissions:
- Send Messages
- Read Message History
- Manage Messages (for edit/delete)
- Add Reactions
- Manage Channels
- Manage Roles
- Manage Webhooks

## Commands

### Messaging
| Command | Description |
|---------|-------------|
| `/discord-send [channel] [message]` | Send a message to a channel |
| `/discord-read [channel]` | Read recent messages from a channel |
| `/discord-dm [user] [message]` | Send a direct message to a user |
| `/discord-react [message-id] [emoji]` | React to a message |

### Server Management
| Command | Description |
|---------|-------------|
| `/discord-server` | Get server information |
| `/discord-channels` | List all channels |
| `/discord-roles` | List all roles |
| `/discord-user [username]` | Look up a user |

### Administration
| Command | Description |
|---------|-------------|
| `/discord-channel-create [name]` | Create a new channel |
| `/discord-channel-delete [name]` | Delete a channel |
| `/discord-role-create [name]` | Create a new role |
| `/discord-role-assign [user] [role]` | Assign a role to a user |

## Usage Examples

### Send a Message
```
/discord-send general Hello everyone! The meeting starts in 5 minutes.
```

### Read Recent Messages
```
/discord-read announcements
```

### Send a DM
```
/discord-dm @john Check out the new feature I just pushed!
```

### Create a Channel
```
/discord-channel-create project-updates
```

### Assign a Role
```
/discord-role-assign @sarah moderator
```

### Get Server Info
```
/discord-server
```

## Skills

This plugin includes skills for:

| Skill | Description |
|-------|-------------|
| `discord-messaging.md` | Writing effective Discord messages |
| `server-management.md` | Managing Discord server settings |
| `community-engagement.md` | Building active communities |
| `moderation.md` | Community moderation best practices |

## Tips

- Use `/discord-server` to check bot permissions and server setup
- Read channel history before posting to maintain context
- Use direct messages for private or sensitive communications
- Organize channels into categories for better navigation
- Set up appropriate roles before assigning them to users

## Links

- [Discord](https://discord.com)
- [Discord MCP](https://github.com/SaseQ/discord-mcp)
- [Sabai System](https://sabaisystem.com)
