#!/bin/bash
# Installs dependencies when a Claude Code cloud session starts (claude.ai/code).
# Locally this does nothing: your node_modules are already there.
# Wired up from .claude/settings.json (SessionStart hook).

if [ "$CLAUDE_CODE_REMOTE" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/..}" || exit 0

if [ -d node_modules ] && [ node_modules/.package-lock.json -nt package-lock.json ]; then
  echo "install.sh: dependencies already installed"
  exit 0
fi

echo "install.sh: installing dependencies for the cloud session"
npm ci --no-audit --no-fund
