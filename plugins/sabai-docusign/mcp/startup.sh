#!/bin/bash

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$SCRIPT_DIR"

# Load env vars from config if exists
if [ -f "$SCRIPT_DIR/config/.env" ]; then
  set -a
  source "$SCRIPT_DIR/config/.env"
  set +a
fi

# Fix unexpanded CLAUDE_PLUGIN_DATA (CoWork sometimes passes literal "${CLAUDE_PLUGIN_DATA}")
if [[ "${CLAUDE_PLUGIN_DATA:-}" == *'${'* ]]; then
  export CLAUDE_PLUGIN_DATA="/tmp/sabai-docusign-data"
  mkdir -p "$CLAUDE_PLUGIN_DATA" 2>/dev/null || true
  echo "INFO: CLAUDE_PLUGIN_DATA was unexpanded, using fallback: $CLAUDE_PLUGIN_DATA" >&2
fi

# Run the MCP server
exec node index.js
