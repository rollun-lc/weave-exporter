# Create directory in /etc
mkdir -p /etc/weave-exporter
# install depth
npm install
# copy files
cp -R ./ /etc/weave-exporter
# delete old systemd configuration
rm -f /lib/systemd/system/weave-exporter.service
# add service to systemd
cat > /lib/systemd/system/weave-exporter.service << EOL
[Unit]
Description=Weave exporter
After=network.target
[Service]
Type=simple
User=root
EnvironmentFile=/etc/weave-exporter/.env
ExecStart=/usr/bin/node /etc/weave-exporter/index.js
Restart=on-failure
[Install]
WantedBy=multi-user.target
EOL
# reload systemd
systemctl daemon-reload
# run weave expose to be able to connect to containers
weave expose
# start service
systemctl start weave-exporter
# add start on VM boot
systemctl enable weave-exporter

echo "You can check status of your exporter using: systemctl status weave-exporter.service"
