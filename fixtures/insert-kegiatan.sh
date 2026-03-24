#!/bin/bash

# Script to insert kegiatan data from JSON file
# Usage: ./fixtures/insert-kegiatan.sh

API_URL="${API_URL:-http://localhost:8787}"
DATA_FILE="fixtures/kegiatan.json"

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "Error: jq is required but not installed."
    echo "Install with: sudo apt install jq"
    exit 1
fi

# Check if data file exists
if [ ! -f "$DATA_FILE" ]; then
    echo "Error: Data file not found: $DATA_FILE"
    exit 1
fi

echo "Inserting kegiatan from $DATA_FILE to $API_URL/api/kegiatan"
echo "---"

# Read the JSON file and iterate through each item
jq -c '.[]' "$DATA_FILE" | while read -r item; do
    waktu=$(echo "$item" | jq -r '.waktu')
    kegiatan=$(echo "$item" | jq -r '.kegiatan')

    echo "Inserting: $waktu - $kegiatan"

    response=$(curl -s -w "\n%{http_code}" -X POST \
        -H "Content-Type: application/json" \
        -d "{\"waktu\": \"$waktu\", \"kegiatan\": \"$kegiatan\"}" \
        "$API_URL/api/kegiatan")

    http_code=$(echo "$response" | tail -n 1)
    body=$(echo "$response" | sed '$d')

    if [ "$http_code" -eq 200 ] || [ "$http_code" -eq 201 ]; then
        echo "  Success: $body"
    else
        echo "  Failed (HTTP $http_code): $body"
    fi

    echo ""
done

echo "---"
echo "Done!"