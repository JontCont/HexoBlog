---
title: '【C#】Logger 內建日誌使用方式'
date: 2024-06-10 18:57:24
categories: 
  - 後端技術
  - C#
tags: 
  - C#
description:
keyword: 'C#, 日誌'
cover: /image/20240610_15-51-04.png
# sticky: 1
---


## Logger 
ASP.NET Core 內建日誌使用方式(Logger)是一個非常方便的功能，可以幫助我們在開發過程中更容易的追蹤問題，這篇文章會介紹如何使用 ASP.NET Core 內建日誌使用方式(Logger)。

### 一、[logger 階層](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/logging/?view=aspnetcore-8.0&WT.mc_id=DT-MVP-4015686#dnrvs)
在進入如何使用 Logger 之前，我們先來看看 Logger 的階層，Logger 階層分為以下幾個階層：
![](/image/20240610_15-54-11.png)


#### 1-1 階層定義
下方內容我已經定義各個階層的用途，可以參考下方內容：
0. Trace: 用於追蹤應用程式的執行流程，通常用於開發階段。
1. Debug: 用於除錯應用程式，通常用於開發階段。
2. Information: 用於追蹤應用程式的執行流程，通常用於PROD環境。
3. Warning: 用於警告應用程式的執行流程，通常用於PROD環境。
4. Error: 用於追蹤應用程式的執行流程，通常用於PROD環境。
5. Critical: 用於追蹤應用程式的執行流程，通常用於PROD環境。
6. None: 用於關閉日誌記錄。

每個階層向下就是可以顯示的內容，例如：Information 會不會顯示 Debug、Trace 的內容，其他就會顯示。

#### 1-2 ILogger 方法
ILogger 有以下幾個方法，可以使用以下方法來記錄日誌：
- LogTrace
- LogDebug
- LogInformation
- LogWarning
- LogError
- LogCritical
- Log

---

### 二、ASP.NET Core 內建日誌使用方式(Logger)

#### 2-1 [內建紀錄提供者 ( Built-in logging providers )](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/logging/?view=aspnetcore-8.0#built-in-logging-providers)

ASP.NET Core 內建日誌使用方式(Logger)提供了幾個內建的日誌提供者，可以使用以下幾個內建的日誌提供者：
- Console : ``` builder.Logging.AddConsole(); ```
- Debug : ``` builder.Logging.AddDebug(); ```
- EventSource : ``` builder.Logging.AddEventLog(); ```
- EventLog (Windows only) : ``` builder.Logging.AddEventLog(); ```

#### 2-2 清除 Logger 預設提供者
如果要清除 Logger 預設提供者，可以使用以下方式：
```csharp
builder.Logging.ClearProviders();
```


#### 2-3 使用 ILogger 物件
在 ASP.NET Core 內建日誌使用方式(Logger)中，我們可以使用 ILogger 物件來記錄日誌，以下是 ILogger 物件的使用方式：

#### 2-3-1 Controller 使用 ILogger 物件
```csharp
public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        _logger.LogTrace("這是一個 Trace 日誌");
        _logger.LogDebug("這是一個 Debug 日誌");
        _logger.LogInformation("這是一個 Information 日誌");
        _logger.LogWarning("這是一個 Warning 日誌");
        _logger.LogError("這是一個 Error 日誌");
        _logger.LogCritical("這是一個 Critical 日誌");

        return View();
    }
}
```

#### 2-3-2 Program 使用 ILogger 物件
```csharp
var app = builder.Build();
var log = app.Services.GetRequiredService<ILogger<Program>>();
log.LogTrace("這是一個 Trace 日誌");
log.LogDebug("這是一個 Debug 日誌");
log.LogInformation("這是一個 Information 日誌");
log.LogWarning("這是一個 Warning 日誌");
log.LogError("這是一個 Error 日誌");
log.LogCritical("這是一個 Critical 日誌");
```

--- 


### 三、Logger 設定 (appsettings.json)
在 ASP.NET Core 內建日誌使用方式(Logger)中，我們可以使用 appsettings.json 來設定 Logger 的設定，以下是 appsettings.json 預設的設定方式：
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
    }
  }
}
```
基本上看到 Logging 就是 Logger 的設定，LogLevel 是設定 Logger 的階層，Default 是預設的階層，Microsoft.AspNetCore 是 Microsoft 的階層。



#### 3-1 Logger 設定階層
如果要看階層範本請看 [階層定義](#1-1-階層定義) ，方便釐清待會要設定的階層。


##### 3-1-2 預設階層 vs 指定階層
在上面敘述當中 Default 視為預設階層，Microsoft.AspNetCore 是指定階層，如果有指定階層，則會以指定階層為主，如果沒有指定階層，則會以預設階層為主。

以下是預設只抓 ```Critical``` 的設定方式，但是 Microsoft.AspNetCore 會抓 ```Information``` 的設定方式，效果如下：
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Critical",
      "Microsoft.AspNetCore": "Information"
    }
  }
}
```
當我載入時候因為沒有 Critical 向下等級，所以只會抓 Critical 的日誌，但是 Microsoft.AspNetCore 會抓 Information 的日誌。下面圖為呼叫API時候產生的日誌： 
![](/image/20240610_16-26-49.png)



#### 3-2 指定 Controller 階層
如果要實作指定 Controller 階層，可以使用以下方式：
先設定 SampleAspNetCore.Controllers.WeatherForecastController 就可以了，如果要設定全部的 Controller 階層，可以使用 SampleAspNetCore.Controllers 來設定。

稍微說明一下我把 Default、Microsoft.AspNetCore設定高一點，讓 ```SampleAspNetCore.Controllers.WeatherForecastController``` 可以吃得到其他狀態會比較清楚一些。
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Critical",
      "Microsoft.AspNetCore": "Critical"

    },
    "Console": {
      "LogLevel": {
        "SampleAspNetCore.Controllers.WeatherForecastController": "Warning"
      }
    }
  }
}
```

以下為.http 範本，可以透過這個來測試API回傳狀況。
```http
@SampleAspNetCore_HostAddress = http://localhost:5268

GET {{SampleAspNetCore_HostAddress}}/weatherforecast/
Accept: application/json

###
GET {{SampleAspNetCore_HostAddress}}/template/
Accept: application/json
```

執行結果會如下圖片，可以看得到API回傳的狀態。
![](/image/20240610_16-47-44.png)


#### 3-3 設定 RequestId
如果要設定 RequestId，可以使用以下方式：
可以快速得到問題內容，通常是 seq 會用到的功能
```json
{
    "Console": {
      "IncludeScopes": "true"
    }
}
```

![](/image/20240610_16-54-16.png)
