#!/bin/bash

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$SCRIPT_DIR"

# Check for token - warn if not authenticated
if [ ! -f "$SCRIPT_DIR/config/token.json" ]; then
  echo "WARNING: Not authenticated. Run 'cd $SCRIPT_DIR && npm run auth' to set up Gmail access." >&2
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..." >&2
  npm install >&2
fi

# Check if dist folder exists with built assets
if [ ! -d "dist" ] || [ ! -f "dist/mcp-app.html" ]; then
  echo "Building MCP server and app..." >&2
  npm run build >&2
fi

# Run the server using tsx (development) or node (production)
if [ -f "dist/server.cjs" ]; then
  # Use bundled server if available
  exec node dist/server.cjs
else
  # Fall back to tsx for development
  exec npx tsx main.ts
fi
