---
title: C# ASPNET Core 設定跨來源資源共用（CORS）
date: 2022-06-11 22:42:03
categories: 
  - 後端技術
  - C#
tags: 
  - C#
  - core
description:
cover: /img/dotnet/bg/cs_bg_005.jpg
---

# Cors 跨來源資源共用
相信很多人使用API 時候可能會遇到這問題，例如 : localhost to ip串接不上之類問題，原則上是"跨來源資源共用"在搞鬼。

Cors 概念中，我們把網站當作(A) 、API為(B)來解釋，A需要透過B取得資訊，傳有一個資料相關內容稱為 "request"，B會確認A的來源是否一樣(same origin)就會讓他執行進去。從中得知(B)是決定(A)是否有權限取得資源。


## 使用 Core API
這便我使用 vs 開啟 API，必須要注意有沒有選擇 OpenApi這功能會幫你開啟SwaggerUI相當方便。
![](../image/Snipaste_2022-06-11_22-42-03.png)
![](../image/Snipaste_2022-06-11_22-42-58.png)


這邊使用方式以後再來介紹，下方為產生完畢的function，我們就可以在下方指令區塊輸入 dotnet watch 完成開啟API localhost動作。 
```cs
[HttpGet]
public IEnumerable<WeatherForecast> Get()
{
    var rng = new Random();
    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
    {
        Date = DateTime.Now.AddDays(index),
        TemperatureC = rng.Next(-20, 55),
        Summary = Summaries[rng.Next(Summaries.Length)]
    })
    .ToArray();
}
```

## 創建html
創建 html 用意取得剛才的api，必須要使用[Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare)才能看得到錯誤訊息。
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <title>Document</title>
</head>
<body>
<script>
    $.ajax({
        method:'get',
        url:'https://localhost:5001/WeatherForecast',
        success: function(rep){
            console.log(rep);
        }
    })
</script>
</body>
</html>
```
![](../image/Snipaste_2022-06-11_23-05-56.png)


## 設定 Cors 
現在到 API > Startup.cs 設定。下方範例省略不重要的設定。
從錯誤訊息可以知道，origin有問題會跟API也就是後端去確認情況。設定相當簡單只需要```AllowAnyOrigin() ``` 就完成了，這邊要注意這是針對全域設定方式，如果要自定義下一章再來介紹。
```cs
  // This method gets called by the runtime. Use this method to add  services to the container.
  public void ConfigureServices(IServiceCollection services)
  {
      ...
      ...

      services.AddCors(options=>
      {
          options.AddDefaultPolicy( builder =>
          {
              builder.AllowAnyOrigin();
          });
      });

      ...
      ...
  }


  // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
  public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
  {
      ....
      ....

      app.UseCors();
      ....
      ....
  }
```

![](../image/Snipaste_2022-06-11_23-19-33.png)

## 範本
[dotnetCore_CorsExample](https://github.com/JontCont/dotnetCore_CorsExample)