#!/bin/bash

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$SCRIPT_DIR"

# Install runtime dependencies only if needed
if [ ! -d "node_modules" ]; then
  echo "Installing runtime dependencies..." >&2
  npm install --omit=dev >&2
fi

# Validate prebuilt artifacts (bundled with plugin)
if [ ! -f "dist/main.js" ] || [ ! -f "dist/mcp-app.html" ]; then
  echo "Missing prebuilt MCP artifacts in dist/. Reinstall the plugin package." >&2
  exit 1
fi

# Run the precompiled server for fast, deterministic startup
exec node dist/main.js
