# top cpu负载



```
[root@test02 apache-tomcat-8.5.24]# top


Tasks: 191 total,   2 running, 189 sleeping,   0 stopped,   0 zombie
%Cpu(s):  1.5 us,  0.9 sy,  0.0 ni, 97.5 id,  0.1 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem : 16267952 total,   529184 free, 14519168 used,  1219600 buff/cache
KiB Swap:        0 total,        0 free,        0 used.  1448196 avail Mem 

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND                                                                                                            
13337 root      20   0 5015840 431844   5852 S   7.7  2.7  23:37.27 java                                                                                                               
  828 root      20   0  532960  15272    668 S   0.7  0.1   1:23.44 docker-current                                                                                                     
11350 root      20   0 10.029g 1.637g   4532 S   0.7 10.6  16:03.65 java                                                                                                               
   17 root      20   0       0      0      0 R   0.3  0.0   2:21.17 rcu_sched                                                                                                          
 2054 root      20   0  113640   1172    456 S   0.3  0.0   3:00.34 start.sh                                                                                                           
 3317 root      20   0  840180  46156   2312 S   0.3  0.3  11:28.78 salt-minion                                                                                                        
10894 root      20   0 5823120 414192   1872 S   0.3  2.5   5:31.04 java                                                                                                               
11179 root      20   0 6285820 429540   3068 S   0.3  2.6   6:45.59 java                                                                                                               
28533 root      20   0 9843824 849976  15208 S   0.3  5.2   0:27.18 java                                                                                                               
29829 root      20   0 9837.9m 2.341g   7044 S   0.3 15.1   4:04.36 java                                                                                                               
    1 root      20   0   44180   5436   1212 S   0.0  0.0   0:22.18 systemd                                                                                                            
    2 root      20   0       0      0      0 S   0.0  0.0   0:00.00 kthreadd                                                                                                           
    3 root      20   0       0      0      0 S   0.0  0.0   0:00.15 ksoftirqd/0                                                                                                        
    5 root       0 -20       0      0      0 S   0.0  0.0   0:00.00 kworker/0:0H                                                                                                       
    7 root      rt   0       0      0      0 S   0.0  0.0   0:03.39 migration/0                                                                                                        
    8 root      20   0       0      0      0 S   0.0  0.0   0:00.00 rcu_bh                                                                                                             
    9 root      20   0       0      0      0 S   0.0  0.0   0:00.00 rcuob/0                                                                                                            
   10 root      20   0       0      0      0 S   0.0  0.0   0:00.00 rcuob/1                                                                                                            
   11 root      20   0       0      0      0 S   0.0  0.0   0:00.00 rcuob/2                                                                                                            
   12 root      20   0       0      0      0 S   0.0  0.0   0:00.00 rcuob/3                                                                                                            
   13 root      20   0       0      0      0 S   0.0  0.0   0:00.00 rcuob/4                                                                                                            
   14 root      20   0       0      0      0 S   0.0  0.0   0:00.00 rcuob/5                                                                                                            
   15 root      20   0       0      0      0 S   0.0  0.0   0:00.00 rcuob/6                                                                                                            
   16 root      20   0       0      0      0 S   0.0  0.0   0:00.00 rcuob/7                                                                                                            
   18 root      20   0       0      0      0 S   0.0  0.0   0:30.95 rcuos/0                                                                                                            
   19 root      20   0       0      0      0 S   0.0  0.0   0:28.43 rcuos/1                                                                                                            
   20 root      20   0       0      0      0 S   0.0  0.0   0:26.54 rcuos/2                                                                                                            
   21 root      20   0       0      0      0 S   0.0  0.0   0:28.07 rcuos/3                                                                                                            
   22 root      20   0       0      0      0 S   0.0  0.0   0:28.09 rcuos/4                                                                                                            
   23 root      20   0       0      0      0 S   0.0  0.0   0:28.31 rcuos/5                                                                                                            
   24 root      20   0       0      0      0 S   0.0  0.0   0:27.13 rcuos/6                                                                                                            
   25 root      20   0       0      0      0 S   0.0  0.0   0:30.31 rcuos/7                                                                                                            
   26 root      rt   0       0      0      0 S   0.0  0.0   0:00.14 watchdog/0
```

