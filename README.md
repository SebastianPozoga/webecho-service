# webecho-service

It make possible:
 - realtime communication webbrowser and servers scripts (like php, node etc)
 - provide security based on tokens and roles (for all actions)
 - provide dynamic filters for socket (to observable only select collections and ids with those)
 - provide socket api and rest api

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

# Config
```
{
  "port": 8191,
  "tokens": [
    {
      "token": "7574DI3HzLX2EekxgZ2my3fLb77690z4",
      "roles": {
        "echo": "w"
      }
    },
    {
      "token": "2D427CC2B8FD379A8E99DA3F9CF1F",
      "roles": {
        "echo": "a"
      }
    },
    {
      "token": "*",
      "roles": {
        "echo": "r"
      }
    }
  ]
}
```
##Descriptions:
 - port - echoservice port
 - tokens - list of tokens use to auth
 - token -  a secret string use to auth and get connect roles
 - roles - token roles map [action_name => role]

##Roles:
 - r (read) - can listen,
 - w (write) - can emit
 - a (all) - can read and write

# Tokens
Don't use special chars. You can generate token by http://randomkeygen.com (Recomended: CodeIgniter Encryption Keys)

# Standalone
If you want run the script without install you can use:
```
node webecho.js [optional args]
```
Arguments:
 - **--debug** - to show web debug console (default on 8091 port)

# Simple usage
You can connect to the service by socket.io (or other socket library). Default port is 8191.
```
socket = io({
    query: 'token=' + token
});
```

if you have write role you can:
```
socket.emit('echo', {
  action: "my_action",
  data: {
    desc: "action data"
  }
});
```

if you have read role you can:
```
socket.on('my_action', function(date){
  // use data
});
```

more on: http://socket.io

# Filters
You can filter user by actions and ids. To set your socket filter emit filter

```
function setDefaultFilters(socket) {
    socket.emit('update_filters', {
        actions: ['my_action_name'],
        ids: [1, 2, 3]
    });
};
```
if actions is null or empty the filter is disable.
if ids is null or empty the filter is disable.
Default all filters are disable.

# Client libraries
 - PHP: https://github.com/SebastianPozoga/webecho-php
