#!/bin/bash

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$SCRIPT_DIR"

# Check if mcp-remote auth cache exists for Tella
MCP_AUTH_DIR="$HOME/.mcp-auth"
TELLA_URL="https://api.tella.com/mcp"

# Function to check if authenticated
check_auth() {
  # mcp-remote stores auth in ~/.mcp-auth
  if [ -d "$MCP_AUTH_DIR" ]; then
    # Check if there are any tella-related tokens
    if ls "$MCP_AUTH_DIR"/*tella* 2>/dev/null | grep -q .; then
      return 0
    fi
  fi
  return 1
}

# If not authenticated, run the auth flow first
if ! check_auth; then
  echo "🔐 No Tella authentication found. Starting OAuth flow..." >&2
  echo "A browser window will open for you to sign in with Tella." >&2
  echo "" >&2

  # Run mcp-remote-client to trigger OAuth flow
  npx -y mcp-remote@latest mcp-remote-client "$TELLA_URL" --auth-timeout 300 2>&1 | head -20 >&2

  echo "" >&2
  echo "✅ Authentication complete! Starting MCP server..." >&2
fi

# Run the MCP server
exec npx -y mcp-remote@latest "$TELLA_URL"
