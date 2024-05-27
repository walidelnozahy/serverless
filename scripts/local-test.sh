#!/bin/bash

# Step 1: Get changed files
EDITED_FILES=$(git diff --name-only --diff-filter=M HEAD~1 HEAD | grep '^docs/')
DELETED_FILES=$(git diff --name-only --diff-filter=D HEAD~1 HEAD | grep '^docs/')
ADDED_FILES=$(git diff --name-only --diff-filter=A HEAD~1 HEAD | grep '^docs/')

if [ -z "$EDITED_FILES" ] && [ -z "$DELETED_FILES" ] && [ -z "$ADDED_FILES" ]; then
  echo "No changes in /docs directory. Skipping."
  exit 0
fi

echo "Edited files:"
echo "$EDITED_FILES"

echo "Deleted files:"
echo "$DELETED_FILES"

echo "Added files:"
echo "$ADDED_FILES"

# Optionally, export as environment variables
export EDITED_FILES
export DELETED_FILES
export ADDED_FILES

# Additional steps can be added here if needed