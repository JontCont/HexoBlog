title: '【C#】實戰 Net Core ResultFilter '
categories:
  - 後端技術
  - C#
tags:
  - Core
  - C#
  - Filter
keyword: 'Core, Filter , C#'
cover: /image/20230831_22-23-40.png
date: 2023-12-18 22:23:40
---

## 前言

過去幾個專案在執行時，有時候 API 格式規劃、調整、修改必須要有一個統性規劃，也是新手在開發時常常會忽略的部分，因此這篇主要是紀錄一下 ResultFilter 的使用方式。

### 參考文件

- [ASP.NET Core 中的結果過濾器](https://docs.microsoft.com/zh-tw/aspnet/core/mvc/controllers/filters?view=aspnetcore-5.0#result-filters)
- [ASP.NET Core Web API 入門教學(13_5) - ResultFilter 之統一回傳格式紀錄](https://www.youtube.com/watch?v=0MogPVe_l3E)

### 補充

需要學習進階 API 使用方式，可以參考上方文章、影片會有所幫助。

---

## 何謂 ResultFilter

ResultFilter 是一個可以在執行結果前、後進行處理的過濾器，主要是透過 OnResultExecuting、OnResultExecuted 來進行處理，以下為官方文件範例。

```cs
public class SampleResultFilterAttribute : Attribute, IResultFilter
{
    public void OnResultExecuting(ResultExecutingContext context)
    {
        // Do something before the action executes.
    }

    public void OnResultExecuted(ResultExecutedContext context)
    {
        // Do something after the action executes.
    }
}
```

再所有的過濾器中，ResultFilter 是最後一個執行的過濾器，因此可以在這裡進行統一回傳格式、紀錄等等。因此我們可以利用這個特性來進行統一回傳格式。
![](/image/20231218_22-32-41.png)

### 一、建立 ResultFilter

首先我們先建立一個 ResultFilter，並且繼承 IResultFilter，接著我們在 OnResultExecuting、OnResultExecuted 進行處理，以下為範例。

```cs
public class ResultFilter : IResultFilter
{
    public void OnResultExecuting(ResultExecutingContext context)
    {
        // Do something before the action executes.
    }

    public void OnResultExecuted(ResultExecutedContext context)
    {
        // Do something after the action executes.
    }
}
```

### 二、註冊 ResultFilter

接著我們需要註冊 ResultFilter，這裡我們使用 AddMvcOptions 來註冊，以下為範例。

```cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddControllersWithViews(options =>
    {
        options.Filters.Add(typeof(ResultFilter));
    });
}
```

### 創建統一回傳格式

接著我們就可以加入一個 RetrunJson 簡單的吃我們的格式。

```cs
   public class RetrunJson
   {
       public dynamic? Data { get; set; }
       public int HttpCode { get; set; } = (int)HttpStatusCode.BadRequest;
       public string? ErrorMessage { get; set; }
   }
```

### 四、使用 ResultFilter

接著我們就可以在 ResultFilter 中進行處理並利用剛創建的 RetrunJson 一起使用，以下為範例。

備註 : 
OnResultExecuted : 在執行結果後進行處理。
OnResultExecuting : 在執行結果前進行處理。
以上這兩者是不同情境下使用的，因此在使用時要注意。

```cs
public class ResultFilter : IResultFilter
{
    public void OnResultExecuting(ResultExecutingContext context)
    {
        // Do something before the action executes.
    }

    public void OnResultExecuted(ResultExecutedContext context)
    {
        context.Result = new JsonResult(new RetrunJson { 
            Data = context.Result,
        });

    }
}
```

### 五、結果
這邊我使用登入的API來使用，會呈現如下結果。包含著value、formatters、contentTypes、declaredType、statusCode等等。

```json
{
    "data": {
        "value": {
            "data": null,
            "httpCode": 400,
            "errorMessage": "資料驗證失敗"
        },
        "formatters": [],
        "contentTypes": [],
        "declaredType": null,
        "statusCode": 400
    },
    "httpCode": 400,
    "errorMessage": null
}
```


如要移除掉方式如下，直接把 context.Result 轉為 ObjectResult取出 Value 即可。

```cs
if (context.Result is ObjectResult objectResult)
{
    context.Result = objectResult.Value;
}
```

---


## 其餘作法
那未來可能會有其他情境，例如我們只想要在特定的 API 使用 ResultFilter，這時候我們可以使用 Attribute 來進行設定，以下為範例。

```cs
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class ResultFilterAttribute : Attribute, IResultFilter
{
    public void OnResultExecuting(ResultExecutingContext context)
    {
        // Do something before the action executes.
    }

    public void OnResultExecuted(ResultExecutedContext context)
    {
        context.Result = new JsonResult(new RetrunJson { 
            Data = context.Result,
        });
    }
}
```

接著我們就可以在 API 上使用 Attribute 來進行設定，以下為範例。

```cs
[HttpGet]
[ResultFilter]
public IActionResult Get()
{
    return Ok();
}
```

---

## 結論

這篇主要是紀錄一下 ResultFilter 的使用方式，主要是透過 OnResultExecuting、OnResultExecuted 來進行處理，並且可以透過 Attribute 來進行設定，這樣就可以在特定的 API 使用 ResultFilter。

r。

