---
title: 【C#】Line Notify (一) 使用 C# 創建 Line Notify
date: 2022-10-08 22:20:10
categories: 
  - 後端技術
  - C#
  - Line
tags: 
  - C#
  - Line
description:
keyword: 'Net FrameWork, C# , Line '
cover: https://d.line-scdn.net/stf/linecorp/en/pr/quickreply_en.png
#sticky: 1
---
之前有已經結束Line Bot 簡易製作、使用方式，這是會使用Nottify 使用方式。目前為止Bot 製作上，Notift 不論是創建、呼叫、API 測試相對的比Bot 友善許多，Notify 可以應用很多方式(Exmpale : 監控、提示訊息、警示資訊等)。若有使用常駐、監聽伺服方式可以不妨加入Notify 功能。

## Line Notify
Notify 是由 Line 官方提供，主要應用通知訊息使用與Bots應用上有所不同。Notify可以免費傳送訊息，若Bots 有意外錯誤訊息可以透過Notify 合併、協助。


### 連動的服務
目前有提供項目有以下三個。
- [Mackerel](https://en.mackerel.io/)
- [Github](https://github.com/)
- [IFTTT](https://ifttt.com/line)

### 前置作業、工具
- [Line Notify 官方](https://notify-bot.line.me/zh_TW/)
- [Visual Studio Code](https://code.visualstudio.com/)

## 創建Line Notify Project
創建順序 : [Line Notify 官方] > [個人頁面]  >按下 [發行權杖(Token)] > 選擇 [透過1對1聊天接收Line Notify 的通知] > 複製 Line Notify Token 
![](/img/dotnet/LineNotify/Snipaste_2022-10-08_22-20-10.png)
![](/img/dotnet/LineNotify/Snipaste_2022-10-08_22-21-24.png)
![](/img/dotnet/LineNotify/Snipaste_2022-10-08_22-22-00.png)
![](/img/dotnet/LineNotify/Snipaste_2022-10-08_22-22-48.png)


## 使用C# WebApi
### 前置作業
1. 使用 命令字元或是Powershell ，輸入下方網址創建專案。
備註 : 這邊範例使用 Net6.0。
```cmd
dotnet new webapi
```
2. 準備Line Notify Token 



### 程式碼 - Program.cs 
加入 Cors 設定
```cs
var builder = WebApplication.CreateBuilder(args);
//add cors
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod();
        });
});

var app = builder.Build();
app.UseCors();
```
### 程式碼 - NotifyController

```cs
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
namespace dotnetCore_LineNotify.Controllers;

[ApiController]
[Route("[controller]")]
public class NotifyController : ControllerBase
{
    public string notifyToken { get; private set; } = "輸入 Line Notify Token";

    private readonly ILogger<NotifyController> _logger;

    public NotifyController(ILogger<NotifyController> logger)
    {
        _logger = logger;
    }
    [HttpGet]
    public IActionResult Get()
    {
        string msg = "測試阿!";
        isRock.LineNotify.Utility.SendNotify(notifyToken, msg);
        return Ok(msg);
    }
}
```
![](/img/dotnet/LineNotify/Snipaste_2022-10-08_23-03-58.png)

以上步驟完成後，Notify 就已經可以正常回覆訊息，如果要更詳細使用方式可以參考官方提供的文件。


- [LINE Notify API Document](https://notify-bot.line.me/doc/en/)