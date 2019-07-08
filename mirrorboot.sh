#!/bin/bash

# cd ~/Projects/VueSmartMirror/

caddy &

DISPLAY=:0 chromium-browser -start-maximized --kiosk https://localhost:2015