# Action Items Tracker

Extract, track, and cross-reference action items across meetings.

## How it works

Action items live inside meeting notes and transcripts as unstructured text. This skill extracts them, figures out who owns each one, and — crucially — cross-references across multiple meetings with the same company or participants to determine which items have been completed and which are still pending.

## Workflow

1. **Determine scope.** From the user's request, figure out what to look at:
   - A specific meeting? (e.g., "action items from the Acme call")
   - A person? (e.g., "what action items does Sarah have?")
   - A time range? (e.g., "action items from this week")
   - Everything? (e.g., "what do I need to do?")

2. **Gather action items.**

   **For a specific meeting:** Call `get_meetings` with the meeting ID to pull details and notes that contain action items.

   **For broader queries:** Call `query_granola_meetings` with a prompt like:
   > "What action items, to-dos, commitments, or follow-up tasks were assigned in recent meetings? For each item, include who is responsible and any deadline mentioned."

   **For a person:** Target the query:
   > "What action items or tasks were assigned to [name] in recent meetings?"

3. **Cross-reference for completion status.** This is what makes the skill valuable. For each action item found:

   - Identify the company or group of participants involved
   - Look at subsequent meetings with the same company/participants using `query_granola_meetings`:
     > "In follow-up meetings with [Acme / these participants], were any of these action items addressed, completed, or discussed as done? Items: [list items]"
   - Mark items as **completed** if a later meeting confirms they were done
   - Mark items as **pending** if there's no evidence of completion
   - Mark items as **overdue** if a deadline was mentioned and has passed

4. **Extract due dates (best-effort).** Action items in meeting notes rarely have clean dates. Do your best to parse relative dates ("by end of week", "before the next meeting", "by March 15") and convert them to actual dates based on when the meeting took place. Flag these as approximate.

5. **Format the output.** Present action items with checkboxes:

   ```
   ### Acme Corp

   From: Acme Q1 Review (March 5) [[0]](url)

   - [x] Send updated pricing proposal — **Sarah** (due March 7) ✅ Addressed in March 8 follow-up [[1]](url)
   - [ ] Review contract redlines — **You** (due March 10)
   - [ ] Schedule demo for technical team — **John** (no deadline set) ⚠️ Overdue?

   ### Internal — Dev Team

   From: Team Standup (March 6) [[2]](url)

   - [x] Fix login bug on staging — **Mike** ✅ Confirmed fixed in March 7 standup [[3]](url)
   - [ ] Write API documentation for v2 endpoints — **You** (due March 14)
   ```

6. **Preserve citation links.** Every action item should trace back to its source meeting. Include `[[0]](url)` citations from `query_granola_meetings`, and when referencing the meeting where completion was confirmed, cite that too.

7. **Handle edge cases:**
   - If no action items are found, say so and suggest the user try a specific meeting or broader time range
   - If completion status is ambiguous (mentioned but not clearly resolved), flag it as "unclear — may want to follow up"
   - If the user asks to filter by assignee, only show items owned by that person

## What counts as an action item

Look for language patterns like:
- "[Person] will [do something]"
- "Action item: ..."
- "TODO: ..."
- "Let's make sure to..."
- "Can you [do something] by [date]?"
- "I'll take care of..."
- "Next steps: ..."

Be inclusive rather than exclusive — it's better to surface a potential action item than to miss a real one. The user can ignore false positives.
