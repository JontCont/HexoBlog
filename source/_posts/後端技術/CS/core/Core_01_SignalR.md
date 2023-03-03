---
title: C# .Net Core SignalR (1)- SignalR 使用方式
categories: 
  - 後端技術
  - C#
tags: 
  - C#
  - VSC
description:
keyword: 'C#,SignalR'
cover: /img/dotnet/bg/cs_bg_005.png
---

# SignalR
SignalRASP.NET Core是開放原始碼程式庫，可簡化將即時 Web 功能新增至應用程式。 即時 Web 功能可讓伺服器端程式碼立即將內容推送至用戶端。

SignalR 提供 API 來建立伺服器對用戶端 遠端程序呼叫， (RPC) 。 RPC 會從伺服器端 .NET Core 程式碼叫用用戶端上的函式。 有數個 支援的平臺，每個平臺都有各自的用戶端 SDK。 因此，RPC 呼叫所叫用的程式設計語言會有所不同。
適合的候選項目 SignalR ：

- 需要經常從伺服器取得更新的應用程式。 例如遊戲、社交網路、投票、拍賣、地圖和 GPS 應用程式。
- 儀表板和監視應用程式。 範例包括公司儀表板、即時銷售更新或旅行警示。
- 共同作業應用程式。 共同作業應用程式的範例包括白板應用程式和小組會議軟體。
- 需要通知的應用程式。 社交網路、電子郵件、交談、遊戲、旅行警示和其他使用通- 知的應用程式。
  
以下是 ASP.NET Core 的 SignalR 一些功能：

- 自動處理連線管理。
- 同時將訊息傳送給所有連線的用戶端。 例如，聊天室。
- 將訊息傳送給特定用戶端或用戶端群組。
- 調整以處理增加的流量。

## 傳輸
SignalR 支援下列技術來處理即時通訊 
- WebSocket
- Sever-Sent 事件
- 長輪詢
SignalR 會自動選擇伺服器和用戶端功能內的最佳傳輸方法。

## 中樞
SignalR 會使用 中樞 在用戶端和伺服器之間進行通訊。中樞會傳送包含用戶端方法名稱和參數的訊息來呼叫用戶端程式代碼。 以方法參數方式傳送的物件會使用已設定的通訊協定還原序列化。 用戶端會嘗試將名稱與用戶端程式代碼中的方法相符。 當用戶端找到相符專案時，它會呼叫 方法，並將其傳遞至還原序列化參數資料

# 使用方式
## 使用工具
- Visual Studio Code : [請點選](https://code.visualstudio.com/)

## 創建專案
創建專案可以使用下方語法，目前創建出來會是 net6.0若不太習慣可以使用 ```-framework  "net5.0" ```。

```console
dotnet new mvc
dotnet run
```

## 創建Hub
創建Hub位置以及ChatHub.cs，內容請參考下方程式碼。
```cs
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalR.Hubs{
    public class ChatHub : Hub{
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        } // SendMessage
    }//class : ChartHub    
}// namespace : SignalRChat
```
![](/image/Snipaste_2022-07-19_21-28-02.png)

## 註冊SignalR服務
以下註冊方式提供參考。
### net6.0
```cs
builder.Services.AddSignalR();

app.MapHub<ChatHub>("/chathub");
```

### net5.x 
```cs
services.AddSignalR();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<SampleHub>("/chathub"); //加入這行 代表連接SignalR的路由與配對的Hub
});
```
![](/image/Snipaste_2022-07-19_21-34-47.png)


## 創建html 頁面環境
加入後，就會彈出alert 視窗，後續再試試如何轉變成留言板。
```html
@{
    ViewData["Title"] = "Home Page";
}

<script src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/6.0.5/signalr.min.js" integrity="sha512-Wj6cUe+56vJ4FtfeF4QqPHy4VGO9gZ2iU8GFlLRjawhx1f4sW3BezJLU1ewaZl3bZV8iya0EJOmRY5SD9XTwvw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script>
    var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
    connection.on("ReceiveMessage",function(user,message){
        alert(`Hi ${user}  , you said : ${message}`);
    });

    connection.start().then(()=>{
        connection.invoke("SendMessage","Cons","Hello World - 1  !!").catch((err)=>{
            return console.error(err.toString());
        });
    }).catch((err)=>{
        return console.error(err.toString());
    });

</script>
```

![](/img/dotnet/cs/signalr/Snipaste_2022-07-19_21-48-59.png)
