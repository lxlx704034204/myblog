# Mysql 查看连接数,状态

分类: database
日期: 2014-10-03

原文地址: 

http://blog.chinaunix.net/uid-29632145-id-4522729.html

------

****[Mysql 查看连接数,状态 ]()*2014-10-03 23:25:21*

分类： Mysql/postgreSQL

**命令： show processlist;** 
**如果是root帐号，你能看到所有用户的当前连接。如果是其它普通帐号，只能看到自己占用的连接。** 
**show processlist;****只列出前100条，如果想全列出请使用****show full processlist;** 
mysql> show processlist;

 

**命令： show status;**

**命令：show status like '%下面变量%';**

Aborted_clients 由于客户没有正确关闭连接已经死掉，已经放弃的连接数量。 
Aborted_connects 尝试已经失败的MySQL服务器的连接的次数。 
Connections 试图连接MySQL服务器的次数。 
Created_tmp_tables 当执行语句时，已经被创造了的隐含临时表的数量。 
Delayed_insert_threads 正在使用的延迟插入处理器线程的数量。 
Delayed_writes 用INSERT DELAYED写入的行数。 
Delayed_errors 用INSERT DELAYED写入的发生某些错误(可能重复键值)的行数。 
Flush_commands 执行FLUSH命令的次数。 
Handler_delete 请求从一张表中删除行的次数。 
Handler_read_first 请求读入表中第一行的次数。 
Handler_read_key 请求数字基于键读行。 
Handler_read_next 请求读入基于一个键的一行的次数。 
Handler_read_rnd 请求读入基于一个固定位置的一行的次数。 
Handler_update 请求更新表中一行的次数。 
Handler_write 请求向表中插入一行的次数。 
Key_blocks_used 用于关键字缓存的块的数量。 
Key_read_requests 请求从缓存读入一个键值的次数。 
Key_reads 从磁盘物理读入一个键值的次数。 
Key_write_requests 请求将一个关键字块写入缓存次数。 
Key_writes 将一个键值块物理写入磁盘的次数。 
Max_used_connections 同时使用的连接的最大数目。 
Not_flushed_key_blocks 在键缓存中已经改变但是还没被清空到磁盘上的键块。 
Not_flushed_delayed_rows 在INSERT DELAY队列中等待写入的行的数量。 
Open_tables 打开表的数量。 
Open_files 打开文件的数量。 
Open_streams 打开流的数量(主要用于日志记载） 
Opened_tables 已经打开的表的数量。 
Questions 发往服务器的查询的数量。 
Slow_queries 要花超过long_query_time时间的查询数量。 
Threads_connected 当前打开的连接的数量。 
Threads_running 不在睡眠的线程数量。 
Uptime 服务器工作了多少秒。

 

 

 

My.ini配置 虚拟内存

 

 

 

innodb_buffer_pool_size=576M   ->128M InnoDB引擎缓冲区

query_cache_size=100M             ->32 查询缓存
tmp_table_size=102M                  ->32M 临时表大小
key_buffer_size=16m                  ->8M

 

**设置max_connections**

**命令：show variables like '%max_connections%'**（这个办法在debian＋mysql  Ver 12.22 Distrib 4.0.22, for pc-linux (i386)
里实验了）
设置办法是在my.cnf文件中，添加下面的最后红色的一行：

 

\--------------------------------------------------------------------------------

 

[mysqld] 
port=3306 
\#socket=MySQL 
skip-locking 
set-variable = key_buffer=16K 
set-variable = max_allowed_packet=1M 
set-variable = thread_stack=64K 
set-variable = table_cache=4 
set-variable = sort_buffer=64K 
set-variable = net_buffer_length=2K 
set-variable = max_connections=32000 
（在院里的DELL机器mysql4.0里的语法不同
max_connecionts=2000
直接这么写就好了

）

 

 

\--------------------------------------------------------------------------------

 

修改完毕后，重启MySQL即可。当然，为了确保设置正确，应该查看一下max_connections。

注意： 
1、虽然这里写的32000。但实际MySQL服务器允许的最大连接数16384； 
2、除max_connections外，上述其他配置应该根据你们系统自身需要进行配置，不必拘泥； 
3、添加了最大允许连接数，对系统消耗增加不大。 
4、如果你的mysql用的是my.ini作配置文件，设置类似，但设置的格式要稍作变通。

用mysqld --help 可以查看到max_connections 变量。　
或者 mysql -uuser -p
**后mysql>show variables;也会看到max_connections 。   **

下面是修改张老师 的redhat9的方法：

先是mysql -uw01f -p
mysql>show variables;
看到max_connections 为100
mysql>exit;
vi /etc/my.cnf
​    [mysqld]
set-variable=max_connections=250  #加入这些内容
:wq

/etc/init.d/mysqld restart
好了，行了。

 

下面的是抄的，我用不了
mysql的最大连接数默认是100, 这个数值对于并发连接很多的数据库应用是远远不够的，当连接请求大于默认连接数后，就会出现无法连接数据库的错误，因此我们需要把它适当调大一些， 有两种办法可以修改最大连接数，一种是修改safe_mysqld，另一种是直接修改原代码并重新编译。下面我们就分别介绍这两种方法：

1.修改safe_mysqld 
找到safe_mysqld编辑它，找到mysqld启动的那两行，在后面加上参数 ：

-O max_connections=1000

例如 ：(其中前面有---的是原来的内容，而+++是修改过以后的） 
--- safe_mysqld.orig Mon Sep 25 09:34:01 2000 
+++ safe_mysqld Sun Sep 24 16:56:46 2000 
@@ -109,10 +109,10 @@ 
if test "$#" -eq 0 
then 
nohup $ledir/mysqld --basedir=$MY_BASEDIR_VERSION --datadir=$DATADIR / 
\- --skip-locking >> $err_log 2>&1 
\+ --skip-locking -O max_connections=1000 >> $err_log 2>&1 
else 
nohup $ledir/mysqld --basedir=$MY_BASEDIR_VERSION --datadir=$DATADIR / 
\- --skip-locking "$@" >> $err_log 2>&1 
\+ --skip-locking "$@" -O max_connections=1000 >> $err_log 2>&1 
fi 
if test ! -f $pid_file # This is removed if normal shutdown 
then 
然后关闭mysql重启它，用 
/mysqladmin所在路径/mysqladmin -uroot -p variables 
输入root数据库账号的密码后可看到 
| max_connections | 1000 | 
即新改动已经生效。

2.修改原代码

解开MySQL的原代码，进入里面的sql目录修改mysqld.cc找到下面一行：

{ "max_connections", (long*) &max_connections,1000,1,16384,0,1},

把它改为：

{ "max_connections", (long*) &max_connections,1000,1,16384,0,1},

存盘退出，然后./configure ;make;make install可以获得同样的效果。