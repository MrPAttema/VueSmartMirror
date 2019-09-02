#!/usr/bin/env bash

# This is an installer script for VueSmartMirror. It works well enough
# that it can detect if you have Node installed, run a binary script
# and then download and run VueSmartMirror.

echo -e "\e[0m"
echo '__      __             _____                          _    __  __  _                         '
echo '\ \    / /            / ____|                        | |  |  \/  |(_)                        '
echo ' \ \  / /_   _   ___ | (___   _ __ ___    __ _  _ __ | |_ | \  / | _  _ __  _ __  ___   _ __ '
echo '  \ \/ /| | | | / _ \ \___ \ | _  _  \  /  _  ||  __|| __|| |\/| || ||  __||  __|/ _ \ |  __|'
echo '   \  / | |_| ||  __/ ____) || | | | | || (_| || |   | |_ | |  | || || |   | |  | (_) || |   '
echo '    \/   \__,_| \___||_____/ |_| |_| |_| \__,_||_|    \__||_|  |_||_||_|   |_|   \___/ |_|   '
echo -e "\e[0m"

# Define the tested version of Node.js.
NODE_TESTED="v8.11.1"

# Determine which Pi is running.
ARM=$(uname -m) 

# Check the Raspberry Pi version.
if [ "$ARM" != "armv7l" ]; then
	echo -e "\e[91mSorry, your Raspberry Pi is not supported."
	echo -e "\e[91mPlease run VueSmartMirror on at least a Raspberry Pi 2 or higher."
	echo -e "\e[91mIf this is a Pi Zero, you are in the same boat as the original Raspberry Pi. You must run in server only mode."
	exit;
fi

# Define helper methods.
function version_gt() { test "$(echo "$@" | tr " " "\n" | sort -V | head -n 1)" != "$1"; }
function command_exists() { type "$1" &> /dev/null ;}

sudo raspi-config

# Update before first apt-get
echo -e "\e[96mUpdating packages ...\e[90m"
sudo apt-get update || echo -e "\e[91mUpdate failed, carrying on installation ...\e[90m"

sudo apt-get install chromium-browser unclutter xscreensaver xautomation

# [Desktop Entry]
# Version=1.0
# Type=Application
# Name=unclutter
# Exec=unclutter -idle 1 -root
# Terminal=false
# StartupNotify=false
sudo nano ~/.config/autostart/unclutter.desktop

# Configure xscreensaver put the following in the file; mode: off
sudo nano ~/.xscreensaver

# Installing helper tools
echo -e "\e[96mInstalling helper tools ...\e[90m"
sudo apt-get --assume-yes install curl wget git build-essential unzip || exit

# Installing Caddy
echo -e "\e[96mInstalling Caddy Webserver ...\e[90m"
curl https://getcaddy.com | bash -s personal http.cgi,http.cors,http.geoip,http.minify

# Check if we need to install or upgrade Node.js.
echo -e "\e[96mCheck current Node installation ...\e[0m"
NODE_INSTALL=false
if command_exists node; then
	echo -e "\e[0mNode currently installed. Checking version number.";
	NODE_CURRENT=$(node -v)
	echo -e "\e[0mMinimum Node version: \e[1m$NODE_TESTED\e[0m"
	echo -e "\e[0mInstalled Node version: \e[1m$NODE_CURRENT\e[0m"
	if version_gt $NODE_TESTED $NODE_CURRENT; then
		echo -e "\e[96mNode should be upgraded.\e[0m"
		NODE_INSTALL=true

		# Check if a node process is currenlty running.
		# If so abort installation.
		if pgrep "node" > /dev/null; then
			echo -e "\e[91mA Node process is currently running. Can't upgrade."
			echo "Please quit all Node processes and restart the installer."
			exit;
		fi

	else
		echo -e "\e[92mNo Node.js upgrade necessary.\e[0m"
	fi

else
	echo -e "\e[93mNode.js is not installed.\e[0m";
	NODE_INSTALL=true
fi

# Install or upgrade node if necessary.
if $NODE_INSTALL; then
	
	echo -e "\e[96mInstalling Node.js ...\e[90m"

	# Fetch the latest version of Node.js from the selected branch
	# The NODE_STABLE_BRANCH variable will need to be manually adjusted when a new branch is released. (e.g. 7.x)
	# Only tested (stable) versions are recommended as newer versions could break VueSmartMirror.
	
	NODE_STABLE_BRANCH="9.x"
	curl -sL https://deb.nodesource.com/setup_$NODE_STABLE_BRANCH | sudo -E bash -
	sudo apt-get install -y nodejs
	echo -e "\e[92mNode.js installation Done!\e[0m"
fi

# Install VueSmartMirror
cd ~
if [ -d "$HOME/VueSmartMirror" ] ; then
	echo -e "\e[93mIt seems like VueSmartMirror is already installed."
	echo -e "To prevent overwriting, the installer will be aborted."
	echo -e "Please rename the \e[1m~/VueSmartMirror\e[0m\e[93m folder and try again.\e[0m"
	echo ""
	echo -e "If you want to upgrade your installation run \e[1m\e[97mgit pull\e[0m from the ~/VueSmartMirror directory."
	echo ""
	exit;
fi

echo -e "\e[96mCloning VueSmartMirror ...\e[90m"
if git clone --depth=1 https://github.com/MrPAttema/VueSmartMirror.git; then 
	echo -e "\e[92mCloning VueSmartMirror Done!\e[0m"
else
	echo -e "\e[91mUnable to clone VueSmartMirror."
	exit;
fi

cd ~/VueSmartMirror  || exit
echo -e "\e[96mInstalling dependencies ...\e[90m"
if npm install; then 
	echo -e "\e[92mDependencies installation Done!\e[0m"
else
	echo -e "\e[91mUnable to install dependencies!"
	exit;
fi

# Use sample config for start VueSmartMirror
cp config/config.js.sample config/config.js

# Use pm2 control like a service VueSmartMirror
read -p "Do you want use pm2 for auto starting of your VueSmartMirror (y/N)?" choice
if [[ $choice =~ ^[Yy]$ ]]; then
    sudo npm install -g pm2
    sudo su -c "env PATH=$PATH:/usr/bin pm2 startup linux -u pi --hp /home/pi"
    pm2 start ~/VueSmartMirror/installers/pm2_VueSmartMirror.json
    pm2 save
fi

echo " "
echo -e "\e[92mWe're ready! Run \e[1m\e[97mDISPLAY=:0 npm start\e[0m\e[92m from the ~/VueSmartMirror directory to start your VueSmartMirror.\e[0m"
echo " "
echo " "