# Sabai Calendar

Calendar assistant with Google Calendar integration. Manage events, schedule meetings, get daily briefings, and optimize your time with smart time blocking.

## Features

### Event Management
- **Create Events** - Quick event creation with natural language
- **View Schedule** - See today's or this week's events at a glance
- **Recurring Events** - Set up daily, weekly, or monthly repeats
- **Event Updates** - Modify or cancel existing events

### Meeting Scheduling
- **Find Availability** - Check your free time or shared availability
- **Schedule Meetings** - Find optimal times for all attendees
- **Timezone Support** - Handle meetings across timezones
- **Video Integration** - Auto-add Google Meet or Zoom links

### Daily Briefing
- **Morning Briefing** - Start your day with a schedule overview
- **Prep Reminders** - Know which meetings need preparation
- **Focus Time** - Identify available deep work blocks
- **Tomorrow Preview** - Plan ahead with next-day preview

### Time Blocking
- **Focus Blocks** - Protect time for deep work
- **Calendar Health** - Analyze meeting load and patterns
- **Recommendations** - Get suggestions to optimize your schedule
- **Buffer Time** - Prevent back-to-back meeting fatigue

## Prerequisites

- Google Calendar MCP server configured and connected
- Google Calendar API access

### Setting up Google Calendar MCP

Add to your Claude configuration:

```json
{
  "mcpServers": {
    "google-calendar": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-google-calendar"],
      "env": {
        "GOOGLE_CREDENTIALS": "/path/to/credentials.json"
      }
    }
  }
}
```

See [Google Calendar MCP](https://github.com/anthropics/mcp-google-calendar) for setup instructions.

## Commands

### Viewing Schedule
| Command | Description |
|---------|-------------|
| `/today` | Show today's schedule |
| `/week [start]` | Show weekly overview |
| `/briefing [date]` | Get comprehensive daily briefing |
| `/availability [range] [attendees]` | Check free time |

### Creating Events
| Command | Description |
|---------|-------------|
| `/event [title] [time] [duration]` | Create a calendar event |
| `/schedule [desc] [duration] [attendees]` | Schedule a meeting with others |
| `/focus [duration] [when]` | Block protected focus time |

### Analysis
| Command | Description |
|---------|-------------|
| `/health [period]` | Calendar health check and recommendations |

## Usage Examples

### View Today's Schedule
```
/today
```

### Get Morning Briefing
```
/briefing
```

### Create an Event
```
/event Team lunch tomorrow 12pm 1h
```

### Schedule a Meeting
```
/schedule Project kickoff 1h alice@example.com, bob@example.com
```

### Block Focus Time
```
/focus 2h tomorrow morning
```

### Check Availability
```
/availability this week
```

### Calendar Health Check
```
/health this week
```

## Skills

This plugin includes skills for:

| Skill | Description |
|-------|-------------|
| `event-management.md` | Event CRUD operations and templates |
| `meeting-scheduling.md` | Finding availability and scheduling |
| `daily-briefing.md` | Morning briefing generation |
| `time-blocking.md` | Focus time and calendar optimization |

## Tips

- Run `/briefing` every morning to start your day prepared
- Use `/focus` to protect your deep work time
- Check `/health` weekly to maintain calendar hygiene
- Use natural language with `/event` for quick event creation
- Schedule meetings for 25 or 50 minutes to build in buffer time
- Block recurring focus time to establish a routine

## Links

- [Google Calendar](https://calendar.google.com)
- [Sabai System](https://sabaisystem.com)
