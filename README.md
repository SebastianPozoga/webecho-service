# webecho-service

It make possible:
 - real time communication with webbrowser and scripts (like php websites etc)

# Install
```
git clone https://github.com/SebastianPozoga/webecho-service.git
cd webecho-service
make build
make install
```

needs:
 - Bower
 - Nodejs v0.12.x (or later)
 - Npm
 - make (or you can run: bash -x bin/build.sh & bash -x bin/install.sh)

# Service
You can use service like:
```
sudo service webecho start/stop/debug/restart
```

# Standalone
If you want run the script without install you can use:
```
node webecho.js [optional args]
```
Arguments:
 - **--debug** - to show web debug console (default on 8091 port)
 - **--config=$path** - to change config path

# Usage
security tokens....

# Usage
You can connect to the service by socket.io (or other socket library). Default port is 8191.
```
io.emit('write', {
  port: "my_port_name",
  value: true
});
```
