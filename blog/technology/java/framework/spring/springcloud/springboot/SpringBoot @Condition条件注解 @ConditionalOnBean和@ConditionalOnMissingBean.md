[TOC]



# SpringBoot @Condition条件注解 



## 自动配置的bean

SpringBoot的自动配置是用标准@Configuration类实现的。同时附加@Conditional注释用于限制何时应用自动配置。

通常自动配置类使用@ConditionalOnClass和 @ConditionalOnMissingBean注释。这样可以确保自动配置仅适用于相关类和未声明自己的相关类时@Configuration。

> 您可以浏览源代码spring-boot-autoconfigure 以查看@Configuration我们提供的类（请参阅 META-INF/spring.factories 文件）。

## 定位auto-configuration候选者

Spring Boot检查META-INF/spring.factories您发布的jar中是否存在文件。该文件应该在EnableAutoConfiguration密钥下列出您的配置类 。

```
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.mycorp.libx.autoconfigure.LibXAutoConfiguration,\
com.mycorp.libx.autoconfigure.LibXWebAutoConfiguration123
```

如果需要以特定顺序应用配置，则可以使用 @AutoConfigureAfter或 @AutoConfigureBefore注释。例如，如果您提供特定于Web的配置，您的类可能需要在之后应用 WebMvcAutoConfiguration。

您也可以使用@AutoconfigureOrder。该注释具有与常规@Order注释相同的语义，同时为自动配置类提供专用的顺序。

## 条件注解@Condition注解

Spring Boot包含很多@Conditional注解，你可以在自己的代码中通过注解@Configuration类或单独的@Bean方法来重用它们。

@ConditionalOnMissingBean注解是一个常见的示例，它经常用于允许开发者覆盖auto-configuration。

## Class条件

@ConditionalOnClass和@ConditionalOnMissingClass注解允许根据特定类是否出现来跳过配置。由于注解元数据是使用ASM来解析的，你实际上可以使用value属性来引用真正的类，即使该类可能实际上并没有出现在运行应用的classpath下。如果你倾向于使用一个String值来指定类名，你也可以使用name属性。

```
package com.lf.bean;

import com.lf.Application;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingClass;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by LF on 2017/4/21.
 */
@Configuration
public class ConfigBean {

    //如果存在Application类则创建个值为hello的字符串类型的bean
    @ConditionalOnClass(value = Application.class)
    @Bean
    public String get() {
        return "hello";
    }

    //如果存在Application类则创建个值为hello的字符串类型的bean
    @ConditionalOnClass(name ="com.lf.Application")
    @Bean
    public String getString() {
        return "hello";
    }
    //如果存在Application类则不创建创建个值为hello的字符串类型的bean
    @Bean
    @ConditionalOnMissingClass(value ="com.lf.Application")
    public String createHello() {
        return "hello";
    }

} 
```

测试代码：

```
package com.lf;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
public class ConditionApplicationTests {

    @Autowired
    private String string;

    @Test
    public void contextLoads() {
        System.err.println(string);
    }

} 
```

## Bean条件

@ConditionalOnBean和@ConditionalOnMissingBean注解允许根据特定beans是否出现来跳过配置。你可以使用value属性来指定beans（by type），也可以使用name来指定beans（by name）。search属性允许你限制搜索beans时需要考虑的ApplicationContext的层次。

> 当@Configuration类被解析时@Conditional注解会被处理。Auto-configure @Configuration总是最后被解析（在所有用户定义beans后面），然而，如果你将那些注解用到常规的@Configuration类，需要注意不能引用那些还没有创建好的bean定义。
>
> @ConditionalOnBean并且@ConditionalOnMissingBean不会阻止@Configuration 类被创建。在类级别使用这些条件相当于使用注释标记每个包含的@Bean方法。

```
package com.lf.bean;

import com.lf.Application;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.SearchStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by LF on 2017/4/21.
 */
@Configuration
public class BeanConditionConfig {

    //如果存在Application的bean则创建个值为hello的字符串类型的bean
    @ConditionalOnBean(value = Application.class)
    @Bean
    public String get() {
        return "hello";
    }


    //如果存在的bean的上面有SpringBootApplication注解，则创建个值为hello的字符串类型的bean
    @ConditionalOnBean(annotation = SpringBootApplication.class)
    @Bean
    public String get1() {
        return "hello";
    }
    //如果存在的bean的上面有SpringBootApplication注解，则创建个值为hello的字符串类型的bean
    @ConditionalOnBean(search = SearchStrategy.CURRENT)
    @Bean
    public String get2() {
        return "hello";
    }
} 
```

## Property条件

@ConditionalOnProperty注解允许根据一个Spring Environment属性来决定是否包含配置。可以使用prefix和name属性指定要检查的配置属性。默认情况下，任何存在的只要不是false的属性都会匹配。你也可以使用havingValue和matchIfMissing属性创建更高级的检测。

```
@ConditionalOnProperty(prefix = "spring.application.admin", value = "enabled", havingValue = "true", matchIfMissing = false)
 
```

## Resource条件

@ConditionalOnResource注解允许只有在特定资源出现时配置才会被包含。资源可以使用常见的Spring约定命名，例如file:/home/user/test.dat。

## Web Application条件

@ConditionalOnWebApplication和@ConditionalOnNotWebApplication注解允许根据应用是否为一个’web应用’来决定是否包含配置。一个web应用是任何使用Spring WebApplicationContext，定义一个session作用域或有一个StandardServletEnvironment的应用。

## SpEL表达式条件

@ConditionalOnExpression注解允许根据SpEL表达式结果来跳过配置。





https://blog.csdn.net/l_sail/article/details/70340438