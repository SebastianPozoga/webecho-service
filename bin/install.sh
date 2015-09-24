#!/bin/sh

# Make sure only root can run our script
if [ "$(id -u)" != "0" ]; then
   echo "This script must be run as root" 1>&2
   exit 1
fi

#install
rm -rf /otp/services/webecho
mkdir -p /opt/services/webecho
cp -r ./* /opt/services/webecho
rm /otp/services/webecho/bin/install.sh

#add to autostart
cp bin/webecho.sh /etc/init.d/webecho
chmod +x /etc/init.d/webecho
update-rc.d webecho defaults


