---
title: Line Notify (二) 使用方式
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
## 使用NUGET
1. [StartFMS.Extensions.Line](https://www.nuget.org/packages/StartFMS.Extensions.Line)
2. [LineBotSDK](https://www.nuget.org/packages/LineBotSDK)
3. [StartFMS.Extensions.Configuration](https://www.nuget.org/packages/StartFMS.Extensions.Configuration)

## StartFMS.Extensions.Line
本章節使用 v1.1.1 版本，版本已經釋出 Line Login 、Line Notify 正常使用，設定格是可以參考下方json設定檔。下方範例如果有保留值表示官方提供傳值設定，無須更改。
```json
  "Line": {
    "Bots": {
      "channelToken": "",
      "adminUserID": ""
    }, //Bots
    "Login": {
      "channelToken": "",
      "adminUserID": "",
      "openIdConnect": {
        "url": "https://access.line.me/oauth2/v2.1/authorize",
        "response_type": "code",
        "client_id": "", //Channel ID 
        "redirect_uri": "",
        "state": "12345abcde",
        "scope": "profile openid",
        "nonce": "09876xyz"
      } //openIdConnect
    }, //Login
    "Notify": {
      "channelToken": ""
    }
```

### Line Notify 
Notify 只需要設定一個 Token 無需要取得其他資料

## StartFMS.Extensions.Configuration
本章節雖然非必要存在，後續章節會介紹到這個使用方式。如果要使用【管理使用者密碼】可以使用下方指令，最新版本為v1.0.1 可以使用，並且還支援 Azure 取得值的功能。
```cs
//限制 net6.0 後的版本
var config = Config.GetConfiguration<Program>(); //加入設定檔

//限制 core 1.0 ~ core 5.0 的版本
var config = Config.GetConfiguration<Startup>(); //加入設定檔
```

## (正篇) 使用Line Notify
- [Line Notify](https://notify-bot.line.me/zh_TW/) 
![](/image/20230406_10-14-15.png)

1. 設定參數
```cs
var lineNotify = new LineNotify()
{
    ChannelToken = config.GetValue<string>("Line:Notify:channelToken"),
};
builder.Services.AddSingleton<LineNotify>(lineNotify);
```

2. 加入 Controller 
```cs
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using StartFMS.Extensions.Line;
using StartFMS.Models.Backend;
using StartFMS.Partner.API.Helper;

namespace StartFMS.Partner.API.Controllers;

[ApiController]
[Route("/api/Line/Notify/v1.0/")]
public class LineNotifyV1Controller : ControllerBase
{
    private LineNotify _LineNotify;

    public LineNotifyV1Controller(LineNotify LineNotify)
    {
        _LineNotify = LineNotify;
    }

    [HttpGet]
    public string SendMessage()
    {
        _LineNotify.Send($"發送訊息時間 : {DateTime.Now}");
        return JsonConvert.SerializeObject(new
        {
            Success = true,
            Message = ""
        });
    }
}

```