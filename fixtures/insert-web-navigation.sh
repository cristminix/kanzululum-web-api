#!/bin/bash

# Script to insert web navigation data from fixtures/web-navigation-list.json to KV
#
# Usage:
#   ./fixtures/insert-web-navigation.sh [options]
#
# Options:
#   --local        Use local KV storage (default)
#   --remote       Use remote KV storage
#   --env <env>    Environment to use
#
# Examples:
#   ./fixtures/insert-web-navigation.sh              # Insert to local KV
#   ./fixtures/insert-web-navigation.sh --remote     # Insert to remote KV
#   ./fixtures/insert-web-navigation.sh --env production  # Insert to production env

set -e

# Configuration
FIXTURES_DIR="$(cd "$(dirname "$0")" && pwd)"
FIXTURE_FILE="$FIXTURES_DIR/web-navigation-list.json"
KV_NAMESPACE_ID="04d0e33bf17247628c22f96b93bc0362"

# Parse arguments
STORAGE_FLAG="--local"
STORAGE_LABEL="local"
ENV_FLAG=""
while [[ $# -gt 0 ]]; do
  case $1 in
    --local)
      STORAGE_FLAG="--local"
      STORAGE_LABEL="local"
      shift
      ;;
    --remote)
      STORAGE_FLAG=""
      STORAGE_LABEL="remote"
      shift
      ;;
    --env)
      ENV_FLAG="--env $2"
      shift 2
      ;;
    *)
      shift
      ;;
  esac
done

# Check if jq is installed
if ! command -v jq &> /dev/null; then
  echo "Error: jq is required but not installed."
  exit 1
fi

# Check if fixture file exists
if [ ! -f "$FIXTURE_FILE" ]; then
  echo "Error: $FIXTURE_FILE not found"
  exit 1
fi

echo "=== Web Navigation Insertion Script ==="
echo "Reading from: $FIXTURE_FILE"
echo "Storage target: $STORAGE_LABEL"
echo ""

TOTAL=$(jq 'length' "$FIXTURE_FILE")
KEYS_ARRAY="[]"

for (( i=0; i<$TOTAL; i++ )); do
  RECORD_ID=$((i + 1))
  ITEM=$(jq -c ".[$i]" "$FIXTURE_FILE")
  TITLE=$(echo "$ITEM" | jq -r '.title')

  # Prepare the record with ID
  RECORD_JSON=$(echo "$ITEM" | jq -c --arg id "$RECORD_ID" '{id: ($id | tonumber)} + .')

  echo "[$RECORD_ID/$TOTAL] Inserting '$TITLE' (web_navigation_$RECORD_ID)..."
  echo "$RECORD_JSON" | jq .

  npx wrangler kv key put "web_navigation_$RECORD_ID" "$RECORD_JSON" --namespace-id="$KV_NAMESPACE_ID" $STORAGE_FLAG $ENV_FLAG

  KEYS_ARRAY=$(echo "$KEYS_ARRAY" | jq -c --arg id "$RECORD_ID" '. + [($id | tonumber)]')
  echo ""
done

# Update the keys array
echo "Updating web_navigation_keys with $KEYS_ARRAY..."
npx wrangler kv key put "web_navigation_keys" "$KEYS_ARRAY" --namespace-id="$KV_NAMESPACE_ID" $STORAGE_FLAG $ENV_FLAG

echo ""
echo "--- Summary ---"
echo "Total inserted: $TOTAL"
echo "Keys: $KEYS_ARRAY"
echo "Done!"
