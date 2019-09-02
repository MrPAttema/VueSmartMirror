#!/usr/bin/env bash

# Specify an app name
--name <VueSmartMirror>

# Set memory threshold for app reload
--max-memory-restart <200MB>

# Delay between automatic restarts
--restart-delay <1000>

# Prefix logs with time
--time

# Do not auto restart app
--no-autorestart

# Specify cron for forced restart
--cron <0 * * * * ./update.sh>

caddy &

DISPLAY=:0 chromium-browser -start-maximized --kiosk https://localhost:2015