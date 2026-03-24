#!/bin/bash

# Script to insert social network links data from fixtures/social-network-links.json to KV
#
# Usage:
#   ./fixtures/insert-social-network-links.sh [options]
#
# Options:
#   --local        Use local KV storage (default)
#   --remote       Use remote KV storage
#   --env <env>    Environment to use
#
# Examples:
#   ./fixtures/insert-social-network-links.sh              # Insert to local KV
#   ./fixtures/insert-social-network-links.sh --remote     # Insert to remote KV
#   ./fixtures/insert-social-network-links.sh --env production  # Insert to production env

set -e

# Configuration
FIXTURES_DIR="$(cd "$(dirname "$0")" && pwd)"
FIXTURE_FILE="$FIXTURES_DIR/social-network-links.json"
KV_NAMESPACE_ID="04d0e33bf17247628c22f96b93bc0362"
RECORD_ID=1

# Parse arguments
STORAGE_FLAG="--local"
ENV_FLAG=""
while [[ $# -gt 0 ]]; do
  case $1 in
    --local)
      STORAGE_FLAG="--local"
      shift
      ;;
    --remote)
      STORAGE_FLAG="--remote"
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

# Check if fixture file exists
if [ ! -f "$FIXTURE_FILE" ]; then
  echo "Error: $FIXTURE_FILE not found"
  exit 1
fi

echo "=== Social Network Links Insertion Script ==="
echo "Reading from: $FIXTURE_FILE"
echo ""

# Read the fixture data
DATA=$(cat "$FIXTURE_FILE")

# Create temp files for the data
TEMP_RECORD=$(mktemp)
TEMP_KEYS=$(mktemp)

# Prepare the record with ID and write to temp file
echo "$DATA" | jq --arg id "$RECORD_ID" '. + {id: ($id | tonumber)}' > "$TEMP_RECORD"

# Prepare the keys array and write to temp file
echo "[$RECORD_ID]" > "$TEMP_KEYS"

echo "Record to insert:"
cat "$TEMP_RECORD" | jq .
echo ""

# Insert the record
echo "Inserting record with ID $RECORD_ID..."
npx wrangler kv key put "social_network_links_$RECORD_ID" --namespace-id="$KV_NAMESPACE_ID" $STORAGE_FLAG $ENV_FLAG --path "$TEMP_RECORD"

# Update the keys array
echo "Updating keys array..."
npx wrangler kv key put "social_network_links_keys" --namespace-id="$KV_NAMESPACE_ID" $STORAGE_FLAG $ENV_FLAG --path "$TEMP_KEYS"

# Cleanup temp files
rm -f "$TEMP_RECORD" "$TEMP_KEYS"

echo ""
echo "--- Summary ---"
echo "Record ID: $RECORD_ID"
echo "Keys: [$RECORD_ID]"
echo "Done!"