[TOC]



# 使用Spring Cloud Feign作为HTTP客户端调用远程HTTP服务

## 什么是Feign

Feign是一种声明式、模板化的HTTP客户端。在Spring Cloud中使用Feign, 我们可以做到使用HTTP请求远程服务时能与调用本地方法一样的编码体验，开发者完全感知不到这是远程方法，更感知不到这是个HTTP请求。

## 使用Feign

### 在service的pom.xml中加入

```
<dependency>
     <groupId>org.springframework.cloud</groupId>
     <artifactId>spring-cloud-starter-feign</artifactId>
     <version>1.2.2.RELEASE</version> <!-- 这里可以不指定version spring-boot-parent中已经有版本定义 -->
 </dependency>

```

### 在Application.java启动类中加上注解`@EnableFeignClients`

```
//开启FeignClient注解
@EnableFeignClients
@Slf4j
@SpringBootApplication
@ImportResource({"classpath:spring-config.xml"})
@EnableAspectJAutoProxy
public class Application {
    public static void main(String[] args) {
        log.info("start execute Application...\n");
        SpringApplication.run(Application.class, args);
        log.info("end execute Application...\n");
    }
}
```

### 定义Feign接口，不需要实现，直接`@Autowire`注入服务即可使用

```
//远程Eureka实例的名字
@FeignClient("simple-service1")
public interface UserClient {
    @RequestMapping(value="/", method= RequestMethod.GET)
    String index();
    @RequestMapping(value="/hello", method= RequestMethod.GET)
    String hello(String name,@RequestParam("age") Integer age);
}
```

注意：

> 默认情况下，Feign会将标有@RequestParam注解的参数转换成字符串添加到URL中，将没有注解的参数通过Jackson转换成json放到请求体中。注意，如果在@RequetMapping中的method将请求方式指定为POST，那么所有未标注解的参数将会被忽略,所以这里的@RequestMapping必须制定，并且必须制定value的值，否则将报`QueryMap parameter must be a Map`错误

## 替换Feign访问Http的Http Client

Feign在默认情况下使用的是JDK原生的URLConnection发送HTTP请求，没有连接池，但是对每个地址会保持一个长连接，即利用HTTP的persistence connection 。我们可以用Apache的HTTP Client替换Feign原始的http client, 从而获取连接池、超时时间等与性能息息相关的控制能力

```
<!-- 使用Apache HttpClient替换Feign原生httpclient -->
<dependency>
    <!--不是netfix包下了，应该是独立出来开源了-->
    <groupId>io.github.openfeign</groupId>
    <artifactId>feign-httpclient</artifactId>
    <!-- <version>9.5.1</version>   这里可以不指定version spring-boot-parent中已经有版本定义-->
</dependency>
```

在application.properties中配置

```
feign.httpclient.enabled=true
或者
feign:
  httpclient:
    enabled: true
```

## Feign 结合 `Hystrix`熔断器

这个熔断器是当依赖服务访问失败时将访问`@FeignClient`注解中的fallback属性的类，返回一个默认的值，防止由于服务的级联依赖导致雪崩的现象。

### 在application.properties中添加如下配置

```
#使用httpclient 连接池
feign.httpclient.enabled=true
#Hystrix支持，如果为true，hystrix库必须在classpath中
feign.hystrix.enabled=true
# hystrix进入follback的超时时间，第一次访问接口时由于要初始化http pools等，这里我们设置超时时间比http请求时间长一点
hystrix.command.default.execution.isolation.thread.timeoutInMilliseconds=10000
```

### 添加默认接口的实现类

```
@FeignClient(
        name="productClient",
        url = "http://localhost:8081/orderService/test",
        fallback = ProductClientFallback.class
)
public interface ProductClient {
    /**
     * 查询商品规格的详细
     * 使用RequestBody即可发送POST请求的requestBody
     * 返回的结果将json解析成我们的实体类
     * @param itemCodeDtos
     * @return
     */
    @RequestMapping("/goods/queryGoodsDetailList")
    ApiResult queryGoodsDetailList(@RequestBody List<ProductItemCodeDto> itemCodeDtos);
    @RequestMapping("/queryGoodsDetail")
    ApiResult queryGoodsDetail(@RequestParam("name") String name);
}
@Component
class ProductClientFallback implements ProductClient {
    @Override
    public ApiResult queryGoodsDetailList(List<ProductItemCodeDto> itemCodeDtos) {
        //这里可以写一些mock的接口数据
        return RespUtils.success("查询详情列表失败，这是返回的默认值");
    }
    @Override
    public ApiResult queryGoodsDetail(String name) {
        //这里可以写一些mock的接口数据
        return RespUtils.success("查询详情失败，这是返回的默认值" + name);
    }
}
```

## 修改默认的Feign访问超时时间，及重试机制

```
/**
默认的请求connectionTimeout为10s,readTimeout为60s
@see feign.Request
public Options() {
      this(10 * 1000, 60 * 1000);
    }
*/
 @Bean
    Request.Options feignOptions() {
        return new Request.Options(/**connectTimeoutMillis**/1 * 1000, /** readTimeoutMillis **/1 * 1000);
    }
/**
默认的重试次数5次
@see feign.Retryer
public Default() {
      this(100, SECONDS.toMillis(1), 5);
    }
*/
   @Bean
    Retryer feignRetryer() {
        return Retryer.NEVER_RETRY;
    }
```

上一篇: [Spring Cloud Eureka Server注册服务器高可用配置](http://okeeper.leanote.com/post/Spring-Cloud%E5%BE%AE%E6%9C%8D%E5%8A%A1-%E6%B3%A8%E5%86%8C%E4%B8%AD%E5%BF%83%E9%AB%98%E5%8F%AF%E7%94%A8)

下一篇: [Spring Cloud 配置中心Config Server](http://okeeper.leanote.com/post/Spring-Cloud-%E9%85%8D%E7%BD%AE%E4%B8%AD%E5%BF%83Config-Server)



 http://okeeper.leanote.com/post/%E4%BD%BF%E7%94%A8Spring-Cloud-Feign%E4%BD%9C%E4%B8%BAHTTP%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%B0%83%E7%94%A8%E8%BF%9C%E7%A8%8BHTTP%E6%9C%8D%E5%8A%A1