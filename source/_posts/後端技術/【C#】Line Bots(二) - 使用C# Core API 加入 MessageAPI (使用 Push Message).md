---
title: 【C#】Line Bots(二) - 使用C# Core API 加入 MessageAPI (使用 Push Message)
date: 2022-09-09 17:16:33
categories: 
  - 後端技術
  - C#
  - Line
tags: 
  - C#
  - Line
description:
keyword: 'Net FrameWork, C# , Line '
cover: https://developers.line.biz/media/services/messaging-api-thumb1.png
# sticky: 1
---

【C#】Line Bots使用方式會主要使用 C# 撰寫，如果是使用其他語言只僅供參考。繼上篇紀錄儲存相關資訊後，需要準備一個 [ngrok](/2022/08/11/Note/ngrok/) 即可。

本章節範例 : 
- Github [dotnetCore_LineBot](https://github.com/JontCont/dotnetCore_LineBot)

## 一、 創建 C# Web API 專案
使用環境 Net6 WebAPI 來開發，dotnet 指令可以不用特別去設定 ```-f net6.0```。
第一步、Cmd 指令下達 ```dotnet new webapi```指令，後續再安裝重要的Nuget。
第二步、設定Cors就完成前置任務。

### 安裝 Nuget
專案部分需要安裝部分，如下:
- [LineBotSDK](https://www.nuget.org/packages/LineBotSDK)
- [Newtonsoft.Json](https://www.nuget.org/packages/Newtonsoft.Json/13.0.2-beta2)

### Cors 設定 (Program.cs) 
Net6.0 因為只有Program 可以設定，只要是 Mvc 、Blazor 、驗證等透過他設定。這邊我們為了方便測試先加入一小段 Cors ，後續排除問題動作可以減少。

```cs
//add cors
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod();
        });
});
app.UseCors();
```

## 二、 Message API - 使用 Push Message 
我們用非常簡單的範例。先加入MessageController.cs 並把自己得 Token、ID 加入上去。撰寫程式部分到這邊就結束了。
```cs
    [ApiController]
    [Route("[controller]")]
    public class MessageController
    {
        public string channelToken{get; private set;} =@"你的 Token ";
        public string adminUserID{get; private set;}  =@"你的 User ID";

        [HttpPost]
        public string Post(){
            Bot bot = InitialBots();
            bot.PushMessage(adminUserID, "Push Message !!");
            return JsonConvert.SerializeObject(new { success = true, message = "" });
        }


        //-------------------------//
        private Bot InitialBots(){
            string channelToken = this.channelToken;
            return new Bot(channelToken);
        }
    }
```
### 開啟 ngrok 
剩下最後一項工作，必須要加入ngrok。【C#】Line BotsWebhook URL 這個選像是待會再把ngrok網址貼在上面，這東西因為不能用```localhost``` 必須要使用ngrok;

首先，先到launchSetting.json 修改一小段。暫時把原本applicationUrl註解，並往下加入你想要的Port。
```json
    "dotnetCore_LineBot": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "launchUrl": "swagger",
      // "applicationUrl": "https://localhost:7231;http://localhost:5196",
      "applicationUrl": "http://localhost:5196",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
```

目前要長期使用又不想要開IIS ，暫時輸入 ```dotnet watch```、```ngrok http 5196```即可。兩個指令建議用各自用**指令視窗**。

如果不會使用 ngrok 可以參考連結 : [點選我](/2022/08/11/Note/ngrok/)

## 三、Line Message API 設定
接下來，只要在[Line Developer](https://developers.line.biz/zh-hant/) 設定。
回到我們的Line Developer ，把 ngrok Url 加入在 webhook setting 當中，務必別忘了加入 ```Message```名稱。 
![](/img/dotnet/Line/Snipaste_2022-09-09_17-16-33.png)

設定完成後，建議點選 Verify 按鈕驗證API是不是有通，按下按鈕後出現 ```Success ```訊息代表順利完成了。題外話，官方網POST動作只看能不能傳回來，所以範例其實沒有特別撰寫內容。






