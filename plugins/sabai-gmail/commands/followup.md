# /followup Command

Create a follow-up email for an outstanding conversation.

## Usage

```
/followup [email reference or context]
```

## Parameters

- `email reference` - Description of original email or conversation (optional)

## Behavior

When this command is invoked:

1. If reference provided, use it as context
2. If no reference, ask:
   - What conversation are you following up on?
   - When did you send the original email?
   - How many times have you followed up already?

3. Determine follow-up stage:
   - First follow-up (3-5 days)
   - Second follow-up (1 week later)
   - Final follow-up (2+ weeks)

4. Draft appropriate follow-up using the follow-up-tracking skill:
   - Reference original conversation
   - Keep it brief and friendly
   - Clear call to action

5. Present draft and offer adjustments

6. If Gmail MCP available, offer to:
   - Create draft
   - Send follow-up (with confirmation)
   - Set reminder for next follow-up

## Examples

```
/followup on the budget approval I sent last week
/followup John about the project timeline
/followup second reminder for the contract review
/followup
```

## Quick Flags

- `--first` - First follow-up (friendly reminder)
- `--second` - Second follow-up (more direct)
- `--final` - Final follow-up (closing the loop)
- `--urgent` - Add urgency to the message

## Follow-up Types

| Flag | Tone | Typical Timing |
|------|------|----------------|
| `--first` | Friendly, gentle nudge | 3-5 days |
| `--second` | Direct, still professional | 1 week later |
| `--final` | Closing, offers out | 2+ weeks |
| `--urgent` | Emphasizes time-sensitivity | Any stage |

## Output

Provide:
1. Complete follow-up email draft
2. Suggested timing for next follow-up if needed
3. Option to track response deadline
