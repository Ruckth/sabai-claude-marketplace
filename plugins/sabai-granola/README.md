# Sabai Granola

Meeting intelligence plugin powered by [Granola](https://granola.ai). Search meetings, get summaries, run smart analysis by meeting type, and receive holistic coaching on your work patterns and communication.

## Prerequisites

This plugin requires the **Granola MCP** server to be configured:

```bash
claude mcp add granola --transport http https://mcp.granola.ai/mcp
```

You'll need a [Granola](https://granola.ai) account with MCP enabled.

## Commands

| Command | Description |
|---------|-------------|
| `/sabai-granola:connect` | Connect and authenticate with Granola |
| `/sabai-granola:search` | Search across your meeting history |
| `/sabai-granola:summary` | Summarize one or multiple meetings |
| `/sabai-granola:ask` | Ask questions about your meetings |
| `/sabai-granola:analyze` | Smart analysis based on meeting type |
| `/sabai-granola:coach` | Holistic coaching on work patterns |
| `/sabai-granola:next` | List upcoming meetings with context |
| `/sabai-granola:actions` | Track action items from meetings |
| `/sabai-granola:followup` | Generate follow-up emails |

## Usage Examples

### Search Meetings

```
/sabai-granola:search budget discussions with Acme
/sabai-granola:search interviews last month
/sabai-granola:search all meetings with John
```

### Summarize Meetings

```
/sabai-granola:summary Discovery call with Acme
/sabai-granola:summary all meetings yesterday
/sabai-granola:summary this week's customer calls
```

### Ask Questions

```
/sabai-granola:ask What did John say about the budget?
/sabai-granola:ask When did we last discuss the API redesign?
/sabai-granola:ask What objections has Acme raised?
/sabai-granola:ask What did I commit to this week?
```

### Upcoming Meetings

```
/sabai-granola:next
/sabai-granola:next today
/sabai-granola:next tomorrow
/sabai-granola:next this week
```

Shows upcoming meetings with context from previous interactions, open items, and prep suggestions.

### Action Items

```
/sabai-granola:actions
/sabai-granola:actions this week
/sabai-granola:actions my items
/sabai-granola:actions overdue
/sabai-granola:actions for John
```

Extracts and tracks all commitments, tasks, and follow-ups from your meetings. Shows what's overdue, due soon, delegated, and completed.

### Follow-up Emails

```
/sabai-granola:followup Discovery call with Acme
/sabai-granola:followup last meeting with John
/sabai-granola:followup Interview with Sarah
```

Generates professional follow-up emails based on meeting content. Auto-detects meeting type and adjusts tone (sales, interview, internal, executive). Includes action items, next steps, and suggested attachments.

### Smart Analysis

The `/analyze` command auto-detects meeting type and runs the appropriate analysis:

```
/sabai-granola:analyze Discovery call with Acme Corp
/sabai-granola:analyze Interview with Sarah for PM role
/sabai-granola:analyze Today's standup
/sabai-granola:analyze Steering committee Q1
```

#### Supported Meeting Types

| Type | Analysis Includes |
|------|------------------|
| **Discovery/Sales** | MEDDIC qualification, budget signals, objections, deal risk |
| **Interview** | Strengths, red flags, skills assessment, hiring recommendation |
| **Standup** | Team status, blockers, action items |
| **Steerco** | Executive report, decisions, risks, milestones |
| **1:1** | Topics, career development, follow-ups, relationship health |
| **Retrospective** | What worked, improvements, action items |

### Executive Coaching

The `/coach` command provides holistic analysis of your work patterns:

```
/sabai-granola:coach this week
/sabai-granola:coach last month
/sabai-granola:coach my sales calls
/sabai-granola:coach communication
/sabai-granola:coach time management
```

#### Coaching Dimensions

**Work Mode Assessment**
- Maker vs Manager schedule analysis
- Meeting load and deep work time
- Focus block identification

**Meeting Effectiveness**
- Meeting ROI by type
- Preparation quality
- Meetings to reconsider or decline

**Communication Analysis**
- Radical Candor quadrant assessment
- Talk/listen ratio by context
- Question quality (open vs closed)
- Language patterns (hedging, filler words, negative framing)
- Specific alternatives for improvement

**Customer & Stakeholder Handling**
- SPIN Selling question analysis
- Objection handling patterns
- Follow-up behavior

**Decision Making**
- Type 1 vs Type 2 decision recognition
- Decision velocity
- Delegation patterns

**Energy & Presence**
- Time-of-day patterns
- Fatigue signals
- High-energy moments

## Methodologies

The coaching is informed by established frameworks:

- **Radical Candor** (Kim Scott) - Communication quadrants
- **SPIN Selling** (Neil Rackham) - Question quality
- **Challenger Sale** - Customer engagement
- **MEDDIC** - Sales qualification
- **Deep Work** (Cal Newport) - Focus and productivity
- **Maker's Schedule** (Paul Graham) - Time management
- **The Coaching Habit** (Michael Bungay Stanier) - Coaching questions
- **Type 1/Type 2 Decisions** (Jeff Bezos) - Decision making

## Installation

1. Clone or download this plugin
2. Add to your Claude Code plugins directory
3. Ensure Granola MCP is configured

## About

Built by [Sabai System](https://sabaisystem.com) for the Claude Marketplace.

## License

MIT
