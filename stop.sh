#!/bin/bash
echo 'start'
ps -ef | grep 'app.js' | grep -v 'grep' | awk '{print $2}' | xargs kill -9 2>/dev/null
echo 'end'
