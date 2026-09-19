#!/bin/bash
cd "$(dirname "$0")"
PORT=8080

# Check if port 8080 is available, else fallback to 8000 or random
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    PORT=8081
fi

echo "=========================================="
echo "   Life Simulator Game - Local Server    "
echo "=========================================="
echo "Starting server on http://localhost:$PORT ..."

python3 -m http.server $PORT &
SERVER_PID=$!
sleep 1

# Open default browser
if which open > /dev/null; then
    open "http://localhost:$PORT"
elif which xdg-open > /dev/null; then
    xdg-open "http://localhost:$PORT"
fi

echo "Game running at http://localhost:$PORT"
echo "Keep this window open while playing. Press Ctrl+C to stop."
wait $SERVER_PID
