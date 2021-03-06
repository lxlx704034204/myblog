[TOC]



# 优化 SQL SELECT 语句性能的 6 个简单技巧

分类: database
日期: 2015-05-14

原文地址: 

http://blog.chinaunix.net/uid-29632145-id-5028022.html

------

****[优化 SQL SELECT 语句性能的 6 个简单技巧]()*2015-05-14 11:38:46*

分类： Mysql/postgreSQL

本文由 [伯乐在线](http://blog.jobbole.com/) - [xianhu](http://blog.jobbole.com/author/xianhu/) 翻译，[进林](http://blog.jobbole.com/author/8zjl8/) 校稿。未经许可，禁止转载！
英文出处：[msiman.ga](http://msiman.ga/2014/03/simple-sql-select-statement-performance.html)。欢迎加入[翻译小组](http://www.jobbole.com/groups/6/?utm_source=jobboleblog-article)。

SELECT语句的性能调优有时是一个非常耗时的任务，在我看来它遵循[帕累托原则](http://en.wikipedia.org/wiki/Pareto_principle)。20%的努力很可能会给你带来80%的性能提升，而为了获得另外20%的性能提升你可能需要花费80%的时间。除非你在[金星](http://curiosity.discovery.com/question/venus-day-longer-year)工作，那里的每一天都等于地球上的243天，否则交付期限很有可能使你没有足够的时间来调优SQL查询。

根据我多年编写和运行SQL语句的经验，我开始开发一个检查列表，当我试图提高查询性能时供我参考。在进行查询计划和阅读我使用的数据库文档之前，我会参考其中的内容，数据库文档有时会很复杂。我的检查列表绝对说不上全面或科学，它更像是一个保守计算，但我可以说，遵循这些简单的步骤大部分时间我确实能得到性能提升。检查列表如下。

## **检查索引**

在SQL语句的WHERE和JOIN部分中用到的所有字段上，都应该加上索引。进行[这个3分钟SQL性能测试](http://use-the-index-luke.com/3-minute-test)。不管你的成绩如何，一定要阅读那些带有信息的结果。

## **限制工作数据集的大小**

检查那些SELECT语句中用到的表，看看你是否可以应用WHERE子句进行过滤。一个典型的例子是，当表中只有几千行记录时，一个查询能够很好地执行。但随着应用程序的成长，查询慢了下来。解决方案或许非常简单，限制查询来查看当前月的数据即可。

当你的查询语句带有子查询时，注意在子查询的内部语句上使用过滤，而不是在外部语句上。

## **只选择你需要的字段**

额外的字段通常会增加返回数据的纹理，从而导致更多的数据被返回到SQL客户端。另外：

?使用带有报告和分析功能的应用程序时，有时报告性能低是因为报告工具必须对收到的、带有详细形式的数据做聚合操作。
?偶尔查询也可能运行地足够快，但你的问题可能是一个网络相关的问题，因为大量的详细数据通过网络发送到报告服务器。
?当使用一个面向列的DBMS时，只有你选择的列会从磁盘读取。在你的查询中包含的列越少，IO开销就越小。

## **移除不必要的表**

移除不必要的表的原因，和移除查询语句中不需要的字段的原因一致。

编写SQL语句是一个过程，通常需要大量编写和测试SQL语句的迭代过程。在开发过程中，你可能将表添加到查询中，而这对于SQL代码返回的数据可能不会有任何影响。一旦SQL运行正确，我发现许多人不会回顾他们的脚本，不会删除那些对最终的返回数据没有任何影响和作用的表。通过移除与那些不必要表的JOINS操作，你减少了大量数据库必须执行的流程。有时，就像移除列一样，你会发现你减少的数据又通过数据库返回来了。

## **移除外部连接查询**

这说起来容易做起来难，它取决于改变表的内容有多大的影响。一个解决办法是通过在两个表的行中放置占位符来删除OUTER JOINS操作。假设你有以下的表，它们通过定义OUTER JOINS来确保返回所有的数据：

| customer_id | customer_name |
| ----------- | ------------- |
| 1           | John Doe      |
| 2           | Mary Jane     |
| 3           | Peter Pan     |
| 4           | Joe Soap      |

| customer_id | sales_person  |
| ----------- | ------------- |
| NULL        | Newbee Smith  |
| 2           | Oldie Jones   |
| 1           | Another Oldie |
| NULL        | Greenhorn     |

解决办法是在customer表的行中增加一个占位符，并更新sales表中的所有NULL值到占位符。

| customer_id | customer_name |
| ----------- | ------------- |
| 0           | NO CUSTOMER   |
| 1           | John Doe      |
| 2           | Mary Jane     |
| 3           | Peter Pan     |
| 4           | Joe Soap      |

| customer_id | sales_person  |
| ----------- | ------------- |
| 0           | Newbee Smith  |
| 2           | Oldie Jones   |
| 1           | Another Oldie |
| 0           | Greenhorn     |

你不只是删除了对OUTER JOIN操作的依赖，同时标准化了没有客户的销售人员如何表示。其他开发人员不必编写额外语句，例如ISNULL(customer_id, “No customer yet”)。

## **删除JOIN和WHERE子句中的计算字段**

这是另外一个有时可能说起来容易做起来难的技巧，它取决于你更改表模式的权限大小。可以将连接语句中用到的计算字段作为一个新字段在表中创建。给出以下SQL语句：

在sales表中利用年和月增加一列，可以提高性能。更新后的SQL语句将如下:

## **总结**

上边的建议可以归结为以下几点：

?检查索引
?在所需要的最小数据集上操作
?移除不必要的字段和表
?移除你JOIN和WHERE子句中的计算操作

如果所有的这些建议都没能提高你的SQL查询性能，最后一个建议是搬去金星吧。你需要的就是一天能调优你的SQL语句。