# webecho-service

It make possible:
 - realtime communication webbrowser and servers scripts (like php, node etc)
 - filter data by actions & ids
 - make read / write role connections

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
      "roles": [
        "write",
        "read"
      ]
    },
    {
      "token": "*",
      "roles": [
        "read"
      ]
    },
    {
      "token": "user_with_filters",
      "roles": [
        "read"
      ],
      "filters": {
        "ids": [],
        "actions": []
      }
    }
  ]
}
```
 - port - echoservice port
 - tokens - list of tokens use to auth
 - token -  a secret string use to auth and get connect roles
 - roles - connection roles (read - can listen, write - can emit)

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
  action: "emit_action_name",
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
