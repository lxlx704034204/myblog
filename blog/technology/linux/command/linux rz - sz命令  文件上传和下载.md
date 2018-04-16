[TOC]



# Linux系统下安装rz/sz命令及使用说明

对于经常使用Linux系统的人员来说，少不了将本地的文件上传到服务器或者从服务器上下载文件到本地，rz / sz命令很方便的帮我们实现了这个功能，但是很多Linux系统初始并没有这两个命令。今天，我们就简单的讲解一下如何安装和使用rz、sz命令。

### 1.软件安装

root 账号登陆后，依次执行以下命令：

```
cd /tmp
wget http://www.ohse.de/uwe/releases/lrzsz-0.12.20.tar.gz
tar zxvf lrzsz-0.12.20.tar.gz && cd lrzsz-0.12.20
./configure && make && make install

```

​      上面安装过程默认把lsz和lrz安装到了/usr/local/bin/目录下，现在我们并不能直接使用，下面创建软链接，并命名为rz/sz：

```
cd /usr/bin
ln -s /usr/local/bin/lrz rz
ln -s /usr/local/bin/lsz sz

```

### 2.使用说明

#### 简介

​      sz命令发送文件到本地：

```
 # sz filename
```

​      rz命令本地上传文件到服务器：

```
# rz
```

​      执行该命令后，在弹出框中选择要上传的文件即可。
​      说明：打开SecureCRT软件 -> Options -> session options -> X/Y/Zmodem 下可以设置上传和下载的目录。



#### rz -be (推荐使用)      

​     rz可以批量上传文件，也可以上传单个文件。使用的协议是ZMODEM协议。   
    下面简单说下ZModem协议的事情，先得从XMODEM协议（XMODEM Protocol）说起。XMODEM协议是一种使用拨号调制解调器的个人计算机通信中广泛使用的异步文件运输协议。这种协议以128字节块的形式传输数 据，并且每个块都使用一个校验和过程来进行错误检测。如果接收方关于一个块的校验和与它在发送方的校验和相同时，接收方就向发送方发送一个认可字节。然 而，这种对每个块都进行认可的策略将导致低性能，特别是具有很长传播延迟的卫星连接的情况时，问题更加严重。　　

​        使用循环冗余校验的与XMODEM相应的一种协议称为XMODEM－CRC。还有一种是XMODEM－1K，它以1024字节一块来传输数据。 YMODEM也是一种XMODEM的实现。它包括XMODEM－1K的所有特征，另外在一次单一会话期间为发送一组文件，增加了批处理文件传输模式。　　            
        ZMODEM是最有效的一个XMODEM版本，它不需要对每个块都进行认可。事实上，它只是简单地要求对损坏的块进行重发。ZMODEM对按块 收费的分组交换网络是非常有用的。不需要认可回送分组在很大程度上减少了通信量。它是Xmodem 文件传输协议的一种增强形式，不仅能传输更大的数据，而且错误率更小。包含一种名为检查点重启的特性，如果通信链接在数据传输过程中中断，能从断点处而不 是从开始处恢复传输。

在命令行中敲一下rz -be，在SecureCRT下就会弹出文件选择框让你选择需要上传的文件了，而且可以选择多个；不过，如果是用putty，那就无能为力了。

​      与rz命令相对应的，sz命令可以实现从[**Linux**](javascript:;)服务器下载文件到本地。

　　**常用参数**

　　-b 以二进制方式，默认为文本方式。（Binary （tell it like it is） file transfer override.）

　　-e 对所有控制字符转义。（Force sender to escape all control characters; normally XON， XOFF， DLE， CR-@-CR， and Ctrl-X are escaped.）

　　如果要保证上传的文件内容在服务器端保存之后与原始文件一致，最好同时设置这两个标志，如下所示方式使用：

　　**rz -be**

　　此命令执行时，会弹出文件选择对话框，选择好需要上传的文件之后，点确定，就可以开始上传的过程了。上传的速度取决于当时网络的状况。

　　如果执行完毕显示“0错误”，文件上传就成功了，其他显示则表示文件上传出现问题了。

　　有些版本的Linux下，执行rz命令报“command not found”，可以到安装盘中找 lrzsz*.rpm 去安装。

　　**使用示例**

　　**示例一 将本地的jdk安装程序上传到Linux服务器**

　　代码如下：

　　［root@qzt196 setup］# rz -be

　　rz waiting to receive.

　　正在开始 zmodem 传输。 按 Ctrl+C 取消。

　　正在传输 jdk-6u21-linux-i586-rpm.bin.。。

　　100% 77628 KB 137 KB/s 00:09:23 0 错误

　　［root@qzt196 setup］# ls -l jdk-6u21-linux-i586-rpm.bin

　　-rw-r--r-- 1 root root 79491215 06-25 07:06 jdk-6u21-linux-i586-rpm.bin

　　［root@qzt196 setup］#





来源： [http://blog.csdn.net/kobejayandy/article/details/13291655](http://blog.csdn.net/kobejayandy/article/details/13291655)