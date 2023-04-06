---
title: Line Login 使用方式
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


## (正篇) 使用Line Login 
進入官方網站後，請創建一個 "Line Login" 頁面，介於設定內容沒有特別要注意，這邊就沒有把創建畫面貼上來。
- [Line Developer](https://developers.line.biz/console/)
![](/image/20230406_09-48-38.png)


### 需要保存項目
進入 【Basic Setting】 頁籤後，必須要記住三個資料，並寫入在設定檔當中。
1. Channel secret 
2. Your user ID 
3. Channel ID 
![](/image/20230406_09-50-56.png)
![](/image/20230406_09-51-19.png)


### LINE Login settings
進入 【Line Login Setting】頁籤後，Callback URL 是支援 Localhost URL ，測試前可以將URL填上去務必在更新至正式版本需要改回來。
![](/image/20230406_09-55-45.png)

---

1. 加入參數
目前設定方式會透過這個 ```LineLogin```類別進行登入，若有更好的想法可以在下方或是Github 留言。
```cs
//Program.cs
var lineLogin = new LineLogin()
{
    ChannelToken = config.GetValue<string>("Line:Login:channelToken"),
    AdminUserID = config.GetValue<string>("Line:Login:adminUserID"),
    urlRequest = new LineLogin.UrlRequest
    {
        url = config.GetValue<string>("Line:Login:openIdConnect:url"),
        response_type = config.GetValue<string>("Line:Login:openIdConnect:response_type"),
        client_id = config.GetValue<string>("Line:Login:openIdConnect:client_id"),
        redirect_uri = config.GetValue<string>("Line:Login:openIdConnect:redirect_uri"),
        scope = config.GetValue<string>("Line:Login:openIdConnect:scope"),
        state = config.GetValue<string>("Line:Login:openIdConnect:state"),
    }
};
builder.Services.AddSingleton<LineLogin>(lineLogin);
```

2. 加入 Controllers
```cs
    private LineLogin _LineLogin;

    public LineLoginV1Controller(LineLogin LineLogin)
    {
        _LineLogin = LineLogin;
    }

    [HttpGet(Name = "")]
    public IActionResult ReceivedAuthorize([FromQuery] string? code)
    {
        if (string.IsNullOrEmpty(code))
        {
            string Url = _LineLogin.GetLoginUrl();
            return Redirect(Url); //發送網址

        }
        var token = _LineLogin.GetTokenFromCode(code);
        var profile = _LineLogin.GetUserProfile(token.access_token);
        return Ok(new { sccess = true, token, profile });
    }
```

以上即可完成登入動作，畫面入下圖。後續可以直接在 ReceivedAuthorize() 進行修改即可或是相要知道 [Callback Function 回呼函式](../../../%E5%89%8D%E7%AB%AF%E6%8A%80%E8%A1%93/JS/js-callback.md)資訊可以點進來看。
![](/image/20230406_10-01-48.png)
![](/image/20230406_10-02-20.png)