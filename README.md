Реализация REST контейнера.

#Компонеты
* [Jersey](https://jersey.java.net/) - реализация [JAX-RS](https://jcp.org/en/jsr/detail?id=311)
* [Grizzly](https://grizzly.java.net/) - nio https server 
* [slf4j](http://www.slf4j.org/) и [logback](http://logback.qos.ch/) - логи
* [Jackson](http://jackson.codehaus.org/) - реализация маппига JSON
* [Metrics](https://dropwizard.github.io/metrics/3.1.0/) - health check, сбор метрик приложения и jvm
* [Swagger](https://github.com/swagger-api) - информация об api, документирование api

#Запуск
Для запуска сервера  укажите com.lardi_trans.http.service.Bootstrap как main class.<br/>
Например:

    $ mvn clean compile exec:java -DmainClass=com.lardi_trans.http.service.Bootstrap
    
Сервер запустится с конфигурацией по умолчанию:

    13:31:59.750 [com.lardi_trans.http.service.Bootstrap.main()] INFO  o.g.g.http.server.NetworkListener - Started listener bound to [localhost:9999]
    13:31:59.762 [com.lardi_trans.http.service.Bootstrap.main()] INFO  o.g.grizzly.http.server.HttpServer - [HttpServer] Started.
    13:31:59.763 [com.lardi_trans.http.service.Bootstrap.main()] INFO  c.lardi_trans.http.service.Bootstrap - Start service at http://localhost:9999<br/>
    13:31:59.764 [com.lardi_trans.http.service.Bootstrap.main()] INFO  c.lardi_trans.http.service.Bootstrap - Wadl available by http://localhost:9999/application.wadl
    13:31:59.764 [com.lardi_trans.http.service.Bootstrap.main()] INFO  c.lardi_trans.http.service.Bootstrap - Swagger api available by http://localhost:9999/api
    13:31:59.765 [com.lardi_trans.http.service.Bootstrap.main()] WARN  c.lardi_trans.http.service.Bootstrap - lardi constants soa not available


#Конфигурация
Задать конфигурацию серевера можно через -Dservice.config указав путь к json файлу. Или положив файл config.json в classpath.

Полный файл может содержать(<b>все параметры являются не обязательными</b>):

    {
      "title": "HTTP service", //Имя сервиса
      "networkConfig": { //Настрокий http сервера 
        "compression": "FORCE", //Принудительно использовать копрессию
        "transactionTimeout": 30, //Таймаут в секундах после которого у потока воркера вызовется interrupt(естесвенно не гарантируется что поток прервется)
        "workersCoreSize": 4, //Началное количество потоков воркеров
        "workersMaxSize": 200, //Максимальное количество потоков воркеров
        "workersQueryLimit": -1 //Лимит очереди воркеров(-1 без лимита)
      },
      "host": "localhost", //Адресс сервера
      "path": "", //Базовый путь в урл
      "port": 9999, //Порт сервера
      "resourcesPackages": [], //Списоке пакетов, в которых jersey будет искать рессурсы
      "properties": { //свободный набор переменных доступных в контейнере
        "jersey.config.server.monitoring.enabled": true
      },
      "slowRequestLogTime": 1000 //Логирование медленных запросов
    }

Также для более тонкой настрокий вы можите указать applicationClass в файле конфигурации:

    package com.lardi_trans.some.cool.service;
    
    import com.lardi_trans.http.service.HttpServiceApplication;
    import com.lardi_trans.http.service.config.HttpServiceConfig;
    
    public class SomeCoolApplication extends HttpServiceApplication {
        public SomeCoolApplication(HttpServiceConfig config) {
            super(config);
            
            register(SomeCoolResource.class);
        }
    }

В этом классе доступны все возможности конфигурирования jersey

#Api
Есть 2 способа получить описание api сервера:

1. [application.wadl](https://ru.wikipedia.org/wiki/WADL) файл генерируемый jersey
2. [swagger-api](https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md) 

##Swagger-Api
Json описание апи севера доступно по пути `/api`<br/>
[Swagger UI](http://petstore.swagger.io/) доступен по `/`

Api генерируется автоматически по аннотациям JAX-RS.<br/>
Так же есть ряд аннотация позволяющих более детально описать рессурс:

* @ApiMethod(value="Короткое описание метода", details="Более детальное описание метода") применяется к методам классов
* @ApiParam("Описание параметра метода") применяется к параметрам метода
* @Require помечает в апи параметр как обязательный
* @ApiIgnore не генерировать api для данного рессурса, применяется к классу или методу
* @ApiCategory("имя категории") групперовка рессурсов в апи, применяется к классу или методу 
* @ApiResponse(value="Описание ответа", model=SomeResponseModel.class, httpCode=200, container=ApiContainerType.ARRAY)
 описание ответ севера, можно указать код статуса, модель данных которая возварщается в ответе,
  а так же указать что результат явлется массивом или мапой моделей.
* @ApiResponses служит для группировки нескольких @ApiResponse
    
    
#Полный список дотупный встроенных рессурсов
1. `/` - swagger ui
2. `/api` - swagger api
3. `/application.wadl` - wadl описание приложения
4. `/info` - некая базовая информация о приложении
    * uptime
    * startTime
    * systemLoad
    * Heap Usage
    * Heap Max
    * systemProperties
5. `/config` - эффективный конфиг файл сервера(со значениями по умолчанию)
6. `/health` - health check сервера, есть встроенная проверка на deadlocks, [можно добавлять свои](https://dropwizard.github.io/metrics/3.1.0/getting-started/#health-checks)
7. `/statistic/{time}` - мониторинг времени запросов jersey. Доступно если передано property `"jersey.config.server.monitoring.enabled": true`.<br/>
 time может принемать значания:
    * all - за все вермя
    * 1s - за последнюю секунду
    * 15s -  за последние 15 секунд
    * 1m - за последнюю минуту
    * 15m - за последние 15 минут
    * 1h - за псоледний час 
8. `/statistic/error` - мониторинг ошибок jersey
9. `/log` - последение 150 сообщений(самые последние сначала) из лога сервера(см. раздел Логи)
10. `/threads/dump` - дамп потоков приложения
11. `/metrics/{type}` - получить информацию о метриках запрсов или любых метрик определенных вами. Доступно если передано property `"metrics.enable": true`
12. `/metrics/service` - метрики запрсов и ощибок. 
13. `/metrics/jvm/{type}` - метрики jvm. Доступно если передано property `"metrics.jvm.enable": true`. type может быть:
    * classes - метрика загруженных классов
    * memory - метрики памяти
    * gc - метрики сборщика мусора
    * buffers - метрика nio буфферов
    * threads - метрики потоков
    * files - открытые файлы
    
#Метрики
При влюченных метриках(`"metrics.jvm.enable": true`). Можно снимать метрики точечно с запросов помечая их аннотациями.

@Metered - общее количество запросов, запросов в секунду за 1, 5 и 15 минут, и среднее кочисечтво. 

    "com.lardi_trans.http.service.resources.InfoResource.getConfig": {
        "count": 0,
        "m15_rate": 0,
        "m1_rate": 0,
        "m5_rate": 0,
        "mean_rate": 0,
        "units": "events/second"
    }

@Timed - метрика времени выполнения запроса и вызовов за секунду:

    "com.lardi_trans.http.service.resources.InfoResource.getIndex": {
        "count": 1,
        "max": 53.490279,
        "mean": 53.490279,
        "min": 53.490279,
        "p50": 53.490279,
        "p75": 53.490279,
        "p95": 53.490279,
        "p98": 53.490279,
        "p99": 53.490279,
        "p999": 53.490279,
        "stddev": 0,
        "m15_rate": 0.0011018917421948848,
        "m1_rate": 0.014712537947741825,
        "m5_rate": 0.0032510706679223173,
        "mean_rate": 0.05568139089288508,
        "duration_units": "milliseconds",
        "rate_units": "calls/second"
    }
    
Есть смысл использовать такие метрики в том случае есть не нужен полный мониторинг запросов(с целью производительности).<br/>
Можно создавать свои метрики: 

    MetricRegistry metrics = SharedMetricRegistries.getOrCreate("some_metrics")
    Meter someMeter = metrics.meter("some_meter");
    someMeter.mark()
    
Эта метрика будет доступна по пути `/metrics/some_metrics`<br/>
Так же можно создавать свои heath checks:

    public class DatabaseHealthCheck extends HealthCheck {
        private final Database database;
    
        public DatabaseHealthCheck(Database database) {
            this.database = database;
        }
    
        @Override
        public HealthCheck.Result check() throws Exception {
            if (database.isConnected()) {
                return HealthCheck.Result.healthy();
            } else {
                return HealthCheck.Result.unhealthy("Cannot connect to " + database.getUrl());
            }
        }
    }
    
    public class SomeCoolApplication extends HttpServiceApplication {
        public SomeCoolApplication(HttpServiceConfig config) {
            super(config);
            
            HealthCheckRegistry healthCheckRegistry = SharedHealthCheckRegistries.getOrCreate("healthCheck");
            healthCheckRegistry.register("database", new DatabaseHealthCheck(...));
        }
    }
    
    
[Больше о метриках и heath checks](https://dropwizard.github.io/metrics/3.1.0/)

#Логи
Для вывода логов используется [logback](http://logback.qos.ch/). <br/>

Для совместимости log4j c slf4j можно использовать:

    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>log4j-over-slf4j</artifactId>
        <version>1.7.12</version>
    </dependency>
    
или

    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-to-slf4j</artifactId>
        <version>2.2</version>
    </dependency>
    
[Конфигурирование logback](http://logback.qos.ch/manual/configuration.html)

Получения логов по `/log` необходимо добавть в конфигурацию следующий appender:

    <appender name="HTML" class="com.lardi_trans.http.service.utils.HtmlAppender">
        <reversePrint>true</reversePrint>
    </appender>
    
Имя аппендера имеет значение. reversePrint позволяет настроить порядок в котором выводится логи.
Можно так же указать pattern:

    <appender name="HTML" class="com.lardi_trans.http.service.utils.HtmlAppender">
        <pattern>%date%level%logger{36}%msg</pattern>
    </appender>


#Исключения
Для контролируеммых ошибок(ошибки логики, ошибки которые должен обработать клиент и тд), можно использотвать исключение WebApplicationException.
Он позволяет передать httpStatus . Jersey уже содержит классы исключений для наиболее популярных ошибок:

* NotFoundException
* BadRequestException
* ClientErrorException
* NotSupportedException
* и т.д.

Исключения наследуемы не от WebApplicationException возвращяются в ответе со статусом 500
    
    