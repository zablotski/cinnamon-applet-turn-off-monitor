#!/usr/bin/env bash
#
# Removes old applet files from current OS with files from current repo
#
rm -rf ~/.local/share/cinnamon/applets/turn-off-monitor@zablotski
cp -pr turn-off-monitor@zablotski/files/* ~/.local/share/cinnamon/applets/turn-off-monitor@zablotski