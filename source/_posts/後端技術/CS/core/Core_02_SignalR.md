---
title: C# .Net Core SignalR (2) - 留言板
date: 2022-07-19 21:28:02
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

# [Hub 類別](https://docs.microsoft.com/zh-tw/dotnet/api/microsoft.aspnetcore.signalr.hub?view=aspnetcore-6.0)

## 屬性
種類有以下三個。
1. Clients	
  - All : 在所有連線的用戶端上呼叫方法
  - Caller : 在客戶端上呼叫一個呼叫了hub方法的方法
  - Others : 在所有連接的客戶端上呼叫方法，但呼叫該方法的客戶端除外
2. Context	
3. Groups	

上面列表中的每個屬性或方法的回傳值都提供呼叫SendAsync方法。SendAsync可以指定要呼叫用戶端的方法名稱，並傳入參數。


# 留言板
## html
```html
   <div class="container">
        <div class="row">&nbsp;</div>
        <div class="row">
            <div class="col-2">User</div>
            <div class="col-4"><input type="text" id="userInput" /></div>
        </div>
        <div class="row">
            <div class="col-2">Message</div>
            <div class="col-4"><input type="text" id="messageInput" /></div>
        </div>
        <div class="row">&nbsp;</div>
        <div class="row">
            <div class="col-6">
                <input type="button" id="sendButton" value="Send Message" />
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <hr />
        </div>
    </div>
    <div class="row">
        <div class="col-6">
            <ul id="messagesList"></ul>
        </div>
    </div>

```

## JavaScript
```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/6.0.5/signalr.min.js" integrity="sha512-Wj6cUe+56vJ4FtfeF4QqPHy4VGO9gZ2iU8GFlLRjawhx1f4sW3BezJLU1ewaZl3bZV8iya0EJOmRY5SD9XTwvw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script>
    var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
    connection.on("ReceiveMessage",function(user,message){
         var li = document.createElement("li");
        document.getElementById("messagesList").appendChild(li);
        // We can assign user-supplied strings to an element's textContent because it
        // is not interpreted as markup. If you're assigning in any other way, you 
        // should be aware of possible script injection concerns.
        li.textContent = `${user} : ${message}`;
    });

    connection.start().then(()=>{
        document.getElementById("sendButton").disabled = false;

    }).catch((err)=>{
        return console.error(err.toString());
    });


    document.getElementById("sendButton").addEventListener("click", function (event) {
        var user = document.getElementById("userInput").value;
        var message = document.getElementById("messageInput").value;
        connection
            .invoke("SendMessage", user, message)
            .catch(function (err) {
                return console.error(err.toString());
            });
        event.preventDefault();
    });
</script>

```

![](/img/dotnet/cs/signalr/Snipaste_2022-07-19_22-12-27.png)

