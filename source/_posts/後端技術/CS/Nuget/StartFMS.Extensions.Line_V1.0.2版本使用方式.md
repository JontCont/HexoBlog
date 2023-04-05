---
title: StartFMS.Extensions.Line V1.0.2版本使用方式
categories: 
  - 雲端平台
  - Nuget
tags: 
  - Nuget
description:
keyword: 'Nuget, C# ,.Net'
cover: /image/20230402_16-57-24.png
---
## 安裝
.NET CLI
```cli
dotnet add package StartFMS.Extensions.Line --version 1.0.2
```

Package Manager
```cli
NuGet\Install-Package StartFMS.Extensions.Line -Version 1.0.2
```

## 使用方式
1. DI 確認專案需求調整
2. 需要透過 新創類別修改，並繼承 StartFMS.Extensions.Line.LineBots 對象

### a.基本做法
1. 新增類別
```cs
// Helper/LineBot.cs
using StartFMS.Extensions.Line;

namespace StartFMS.Partner.API.Helper
{
    public class LineBot:LineBots
    {
        public override void MessageText()
        {
            var @event = LineReceived.events.FirstOrDefault();
            string message = @event!=null ? @event.message.text:"";
            ReplyMessage(message);
        }
    }
}

```

2. 加入Controlles
```cs
[HttpPost("", Name = "Message Reply")]
public async Task<string> Post() {

	try
	{
		var lineBots = new LineBot()
		{
			ChannelToken ="",
			AdminUserID = ""
		};

		using (var linebot = await lineBots.LoadAsync(Request.Body))
		{
			linebot.ExecuteReader();
		}

		return JsonConvert.SerializeObject(new
		{
			Success = true,
			Message = "",
		});
	}
	catch(Exception ex) {
		return JsonConvert.SerializeObject(new
		{
			Success = false,
			Message = ex.Message,
		});
	}

}
```

### b.DI 作法
1. 新增類別
```cs
// Helper/LineBot.cs
using StartFMS.Extensions.Line;

namespace StartFMS.Partner.API.Helper
{
    public class LineBot:LineBots
    {
        public override void MessageText()
        {
            var @event = LineReceived.events.FirstOrDefault();
            string message = @event!=null ? @event.message.text:"";
            ReplyMessage(message);
        }
    }
}

```

2. 設定參數
Program.cs 加入以下設定

```cs
// Program.cs 
var lineBots = new LineBot() {
    ChannelToken = "加入頻道 Token",
    AdminUserID = "加入管理者 Token"
};
builder.Services.AddSingleton<LineBot>(lineBots);
```

3. 加入Controllers
```cs
[ApiController]
[Route("/api/Line/Bot/v1.0/")]
public class LineBotsV1Controller : ControllerBase
{
    private LineBot _lineBots;

    public LineBotsV1Controller(LineBot lineBots) {
        _lineBots = lineBots;
    }

    [HttpPost("", Name = "Message Reply")]
    public async Task<string> Post() {

        try
        {
            using (var linebot = await _lineBots.LoadAsync(Request.Body))
            {
                linebot.ExecuteReader();
            }

            return JsonConvert.SerializeObject(new
            {
                Success = true,
                Message = "",
            });
        }
        catch(Exception ex) {
            return JsonConvert.SerializeObject(new
            {
                Success = false,
                Message = ex.Message,
            });
        }

    }
}
```
## Behavior method
行為 Function 有 "Join"、"Message"這兩個，使用方式如下。

### a. Join()
加入機器人之後Bot動作行為。
```cs
public override void Join() { }
```

### b.Message()
如果是第一次使用以下 Function 不建議直接修改，本擴充有把 Message 回傳類別特別回傳到指定位置。
```cs
public override void Message() { }
```

### c.Message method 
- ```public override void MessageText() { }``` : 留言文字時候執行。
- ```public override void MessageImage() { }``` : 發送圖檔時候執行。
- ```public override void MessageVideo() { }``` : 發送影片時候執行。
- ```public override void MessageAudio() { }``` : 發送音訊時候執行。
- ```public override void MessageSticker() { }``` : 發貼圖時候執行。
- ```public override void MessageLocation() { }``` : 發送地圖時候執行。

## 四、更新內容
1.0.2
- 修正 上一版無法正常使用

1.0.1 (建議不使用)
- 修正 依賴 LineBotSDK問題