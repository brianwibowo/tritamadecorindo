# Server Information

```bash
[omag8228@musi ~]$ php -v
PHP 8.4.24 (cli) (built: Aug 18 2026 00:00:00) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.4.24, Copyright (c) Zend Technologies
    with the ionCube PHP Loader v15.5.0, Copyright (c) 2002-2026, by ionCube Ltd.
[omag8228@musi ~]$ free -h
               total        used        free      shared  buff/cache   available
Mem:           251Gi        87Gi        11Gi       7.2Gi       163Gi       163Gi
Swap:           15Gi       1.8Gi        14Gi
[omag8228@musi ~]$ php -m
[PHP Modules]
bcmath
bz2
calendar
clos_ssa
Core
ctype
curl
date
dba
dom
enchant
exif
fileinfo
filter
ftp
gd
gettext
gmp
hash
iconv
imap
intl
ionCube Loader
json
libxml
mbstring
monarxprotect
mysqli
mysqlnd
odbc
openssl
pcntl
pcre
PDO
pdo_mysql
PDO_ODBC
pdo_sqlite
Phar
posix
pspell
random
readline
Reflection
session
shmop
SimpleXML
snmp
soap
sockets
sodium
SPL
sqlite3
standard
tidy
tokenizer
xml
xmlreader
xmlrpc
xmlwriter
xsl
zip
zlib

[Zend Modules]
the ionCube PHP Loader

[omag8228@musi ~]$ php -i | grep memory_limit
top - 12:46:43 up 41 days, 11:14,  0 users,  load average: 20.64, 23.21, 23.68
Tasks:   2 total,   1 running,   1 sleeping,   0 stopped,   0 zombie
%Cpu(s): 15.7 us,  5.5 sy,  0.2 ni, 77.8 id,  0.1 wa,  0.2 hi,  0.5 si,  0.0 st
MiB Mem : 257030.5 total,  11146.4 free,  88965.8 used, 167746.5 buff/cache
MiB Swap:  16384.0 total,  14545.6 free,   1838.4 used. 168064.6 avail Mem

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
 734614 omag8228  20   0    5360   4476   3588 S   0.0   0.0   0:00.04 bash
 750664 omag8228  20   0    7996   4008   3412 R   0.0   0.0   0:00.00 top

[omag8228@musi ~]$ df -i
Filesystem        Inodes    IUsed     IFree IUse% Mounted on
/dev/sda4       19660800  1562576  18098224    8% /
/dev/sda3      193880064 34317988 159562076   18% /tmp
/dev/sda5       19660800   187869  19472931    1% /var/lib/mysql
tmpfs             819200     1673    817527    1% /run/dbus
tmpfs           32899902        1  32899901    1% /dev/shm
[omag8228@musi ~]$ php -i | grep -E "memory_limit|max_execution_time|upload_max_filesize|post_max_size"
max_execution_time => 0 => 0
memory_limit => 256M => 256M
post_max_size => 10M => 10M
upload_max_filesize => 10M => 10M
[omag8228@musi ~]$
```
