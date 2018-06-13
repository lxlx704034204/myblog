[TOC]



# spring 手动提交事务

## 简介

　　在使用Spring声明式事务时，不需要手动的开启事务和关闭事务，但是对于一些场景则需要开发人员手动的提交事务，比如说一个操作中需要处理大量的数据库更改，可以将大量的数据库更改分批的提交，又比如一次事务中一类的操作的失败并不需要对其他类操作进行事务回滚，就可以将此类的事务先进行提交，这样就需要手动的获取Spring管理的Transaction来提交事务。

## 手动提交事务

```java
ClassPathXmlApplicationContext applicationContext = getClassPathXmlApplicationContext();

DataSourceTransactionManager transactionManager = (DataSourceTransactionManager) applicationContext
    .getBean("transactionManager");

DefaultTransactionDefinition transDefinition = new DefaultTransactionDefinition();
//配置事务属性为开启新事物
transDefinition
    .setPropagationBehavior(DefaultTransactionDefinition.PROPAGATION_REQUIRES_NEW);
//这里会获取数据库连接并传入配置事务属性
TransactionStatus transStatus = transactionManager.getTransaction(transDefinition);
try {

    // todo 处理具体需要事务的逻辑

    transactionManager.commit(transStatus);
} catch (Exception e) {
    transactionManager.rollback(transStatus);
}
```



使用示例:



```java
@Resource(name = "mainTransactionManager")
private DataSourceTransactionManager mainTransactionManager;
    
 
//这里会获取数据库连接并传入配置事务属性
TransactionStatus transStatus = mainTransactionManager.getTransaction(new DefaultTransactionDefinition());
 
        
try {

    // todo 处理具体需要事务的逻辑

    
    mainTransactionManager.commit(transStatus);
} catch (Exception e) {
    mainTransactionManager.rollback(transStatus);
    //异常处理
} 
```





http://www.cnblogs.com/banning/p/6346669.html