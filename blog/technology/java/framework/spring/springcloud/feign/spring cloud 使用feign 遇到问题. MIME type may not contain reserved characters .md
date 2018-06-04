[TOC]



# spring cloud 使用feign 遇到问题

spring cloud 使用feign 项目的搭建 在这里就不写了，本文主要讲解在使用过程中遇到的问题以及解决办法

## 1:RequestMapping不支持

```
@RequestMapping(value = "/generate/password", method = RequestMethod.POST)  
KeyResponse generatePassword(@RequestBody String passwordSeed);   
```

在这里 只能使用 @RequestMapping(value = "/generate/password", method = RequestMethod.POST) 注解 不能使用 @PostMapping 否则项目启动会报  
Caused by: java.lang.IllegalStateException: Method generatePassword not annotated with HTTP method type (ex. GET, POST) 异常 

## 2:首次访问超时问题

原因： Hystrix默认的超时时间是1秒，如果超过这个时间尚未响应，将会进入fallback代码。
而首次请求往往会比较慢（因为Spring的懒加载机制，要实例化一些类），这个响应时间可能就大于1秒了。
解决方法：

<1： 配置Hystrix的超时时间改为5秒

```
hystrix.command.default.execution.isolation.thread.timeoutInMilliseconds: 5000  
```

<2：禁用Hystrix的超时时间

```
hystrix.command.default.execution.timeout.enabled: false  
```

<3：禁用feign的hystrix 功能

```
feign.hystrix.enabled: false  
```

注： 个人推荐 第一 或者第二种 方法

## 3:FeignClient接口中，如果使用到@PathVariable ，必须指定其value

## 4:spring cloud feign 使用 Apache HttpClient  没有指定 Content-Type 是情况下 会出现如下异常 ？ 这里很纳闷？

```
Caused by: java.lang.IllegalArgumentException: MIME type may not contain reserved characters  
```

在这里有兴趣的朋友可以去研究下源码

ApacheHttpClient.class 

```java
  private ContentType getContentType(Request request) {  
    ContentType contentType = ContentType.DEFAULT_TEXT;  
    for (Map.Entry<String, Collection<String>> entry : request.headers().entrySet())  
    // 这里会判断 如果没有指定 Content-Type 属性 就使用上面默认的 text/plain; charset=ISO-8859-1  
    // 问题出在默认的 contentType ： 格式 text/plain; charset=ISO-8859-1   
    // 转到 ContentType.create(entry.getValue().iterator().next(), request.charset()); 方法中看  
    if (entry.getKey().equalsIgnoreCase("Content-Type")) {  
      Collection values = entry.getValue();  
      if (values != null && !values.isEmpty()) {  
        contentType = ContentType.create(entry.getValue().iterator().next(), request.charset());  
        break;  
      }  
    }  
    return contentType;  
  }  
```

ContentType.class  


```java
   public static ContentType create(final String mimeType, final Charset charset) {  
        final String normalizedMimeType = Args.notBlank(mimeType, "MIME type").toLowerCase(Locale.ROOT);  
    // 问题在这 check  中 valid f方法中  
        Args.check(valid(normalizedMimeType), "MIME type may not contain reserved characters");  
        return new ContentType(normalizedMimeType, charset);  
    }  
   private static boolean valid(final String s) {  
        for (int i = 0; i < s.length(); i++) {  
            final char ch = s.charAt(i);  
        // 这里 在上面 text/plain;charset=UTF-8 中出现了 分号 导致检验没有通过   
            if (ch == '"' || ch == ',' || ch == ';') {  
                return false;  
            }  
        }  
        return true;  
    }  
```

解决办法 ：

```java
@RequestMapping(value = "/generate/password", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE) 
```

暂时遇到以上问题， 后续深入学习 时 如有问题 会及时更新， 希望对你有帮助 谢谢





https://blog.csdn.net/u010131277/article/details/76033794