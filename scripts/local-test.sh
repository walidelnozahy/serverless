#!/bin/bash

# Step 1: Get changed files
CHANGED_FILES=$(git diff --name-only HEAD~1 HEAD | grep '^docs/')

if [ -z "$CHANGED_FILES" ]; then
  echo "No changes in /docs directory. Skipping."
  exit 0
fi

echo "Changed files:"
echo "$CHANGED_FILES"

# Optionally, export CHANGED_FILES as an environment variable
export CHANGED_FILES

# Additional steps can be added here if needed