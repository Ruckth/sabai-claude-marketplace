# Changelog

## [1.0.1] - 2026-03-25

### Fixed
- CLAUDE_PLUGIN_DATA env var not resolved in CoWork (literal `${CLAUDE_PLUGIN_DATA}` passed instead of actual path)
- Account storage now falls back to `/tmp` when plugin directory is read-only in CoWork
- Defense-in-depth writability checks across all storage path candidates

## [1.0.0] - 2026-03-24

### Added
- Plugin scaffold with MCP server configuration
- JWT Grant authentication with auto-refresh
- Multi-account profile management (add, switch, remove accounts)
- DocuSign API client for envelopes, documents, and recipients
- `docusign-agreements` skill with domain knowledge
- `/docusign-status` command for agreement status dashboard
- `/docusign-summary` command for plain-language agreement summaries
- Support for both demo and production DocuSign environments
