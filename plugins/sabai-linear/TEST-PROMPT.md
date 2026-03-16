# Sabai Linear — Test Prompts

## MCP Tools

**T1:** `Call linear_get_teams` → Returns team list with "Sabai Claude Marketplace"

**T2:** `Call linear_get_team for SCM` → Returns members, states, labels

**T3:** `Call linear_get_issue with issueId "SCM-97"` → Returns issue with title, state, relations

**T4:** `Call linear_search_issues with query "ADR-" and limit 10` → Returns issues array

**T5:** `Call linear_list_issues with limit 3` → Returns 3 issues with `pageInfo`

**T6:** `Call linear_get_cycles for SCM team` → Returns cycles array

## Commands

**T7:** `/release-notes v1.0.0 --since Mar-1` → Categorized release notes with SCM-XX identifiers

**T8:** `/release-notes v1.0.0 --since 3/1` → Same result as T7

**T9:** `/release-notes v1.0.0 --since Mar-1 --project sabai-linear` → Only Sabai Linear tickets

**T10:** `/decision Use Redis for caching. Context: fast session lookups. Options: Redis (chosen), Memcached. Trade-off: manage cluster.` → Formatted ADR, offers Save/Edit/Draft

**T11:** `/risk sabai-linear` → Risk assessment with scored risks and recommendations

**T12:** `/risk SCM-97` → Single ticket risk analysis

**T13:** `/roadmap q1` → Timeline with projects by month and status indicators

**T14:** `/prioritize rice SCM-97` then `R=1000, I=2, C=80, E=2` → Score = 800

**T15:** `/prioritize rice SCM-97` then `R=-100, I=5, C=200, E=0` → Rejects all values

**T16:** `/dependencies SCM-97` → Dependency tree or "no dependencies"

**T17:** `/refine SCM-97` → Completeness score 0-10 with suggestions

**T18:** `/ticket feature Add dark mode` → Creates ticket, returns URL

**T19:** `/standup` → Done / In Progress / Blockers format

**T20:** `/stale 14` → Tickets not updated in 14+ days

## Error Handling

**T21:** `/risk nonexistent-project` → Lists available projects, no crash

**T22:** `/roadmap q1 --team Engineering` → Lists available teams, no crash

## Data Quality (Linear config, not code)

**T23:** Check T2 labels for `Decision` → If missing, create in Linear
