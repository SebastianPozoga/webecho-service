#!/bin/sh
### BEGIN INIT INFO
# Provides:          webecho
# Required-Start:    $local_fs
# Required-Stop:     $local_fs
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# X-Interactive:     false
# Short-Description: Start webecho daemon at boot time
# Description:       Enable webecho service provided by daemon.
### END INIT INFO

DESC="Enable webecho service provided by daemon."
NAME=webecho
FILEPATH=/var/run/webecho
LOGPATH=/var/log/webecho.log
#DAEMON=

do_start()
{
   if [ -f $1 ]
   then
     echo "The process is alredy run"
     exit 1
   fi
   node /opt/services/webecho/webecho.js >>$2 2>&1 &
   echo $! > $1
   echo "Run webecho service with pid `cat $1`"
}


do_debug()
{
      if [ -f $1 ]
   then
     echo "The process is alredy run"
     exit 1
   fi
   node /opt/services/webecho/webecho.js --debug >>$2 2>&1 &
   echo $! > $1
   echo "Run webecho service with pid `cat $1`"
}

do_stop()
{
   echo $1
   if [ ! -f $1 ]
   then
     echo "No run process"
     exit 1
   fi
   kill -9 `cat $1` >>$2 2>&1
   rm $1
}

#init data directory
mkdir -p /tmp/services

case "$1" in
   start)
     do_start $FILEPATH $LOGPATH
     ;;
   stop)
     do_stop $FILEPATH $LOGPATH
     ;;
   debug)
     do_debug $FILEPATH $LOGPATH
     ;;
   restart|reload|condrestart)
     do_stop $FILEPATH $LOGPATH
     do_start $FILEPATH $LOGPATH
     ;;
   *)
     echo $"Usage: $0 {start|debug|stop|restart|reload|status}"
     exit 1
esac

exit 0

