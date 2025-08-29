#!/bin/bash
# Check if a commit message was provided
if [ -z "$1" ]; then
  echo "Usage: ./git.sh <commit-message>"
  exit 1
fi
# Capture the commit message
COMMIT_MESSAGE="$1"

git add .
git commit -m "$COMMIT_MESSAGE"
git push
