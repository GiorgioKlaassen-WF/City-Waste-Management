#!/bin/bash
echo 'Starting....'
ng serve & DISPLAY=:0 chromium-browser -start-maximized --kiosk --app=http://localhost:4200 && fg
