# /followup Command

Find emails needing follow-up and create responses.

## Usage

```
/followup                           # Detect emails needing follow-up
/followup --detect                  # Same as above
/followup --detect --days 3         # Last 3 days only
/followup [email reference]         # Follow up on specific email
```

## Parameters

- `--detect` - Run follow-up detection algorithm (default if no reference)
- `--days N` - Number of days to scan (default: 7)
- `email reference` - Description of original email or conversation

## Behavior

### Mode 1: Detection (default)

When invoked without a reference or with `--detect`:

1. **Run detection algorithm** using the follow-up-detection skill:
   - Search Gmail for emails in the last N days
   - Filter out newsletters, automated emails, already-replied threads
   - Score each email by urgency

2. **Present results** sorted by urgency:
   - Urgent (score 7+)
   - Should reply soon (score 4-6)
   - Can wait (score 1-3)

3. **Ask user** which email to follow up on

4. **Proceed to draft** the follow-up email

### Mode 2: Direct Follow-up

When invoked with a specific email reference:

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
