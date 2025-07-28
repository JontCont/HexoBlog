---
title: Discord (一) - 製作簡易版本機器人
date: 2023-09-24 15:49:45
categories: 
  - 後端技術
  - C#
tags: 
  - C#
  - Discord
description:
keyword: 'C#, Discord'
cover: /image/20231119_16-33-11.png
---

Discord Bot 是一個很好玩的東西，可以讓你的 Discord 伺服器更加的有趣，而且可以自己寫程式來控制機器人。本人已經玩過幾次，想要將爬蟲功能加入在伺服器當中。這篇文章會教你如何製作一個 Discord Bot，並且讓他加入你的伺服器。

## 前置作業
### 工具
1. [Visual Studio 2022](https://visualstudio.microsoft.com/zh-hant/vs/whatsnew/)
2. [Visual Studio Code](https://code.visualstudio.com/)
### 套件
1. [Discord.Net.WebSocket](https://www.nuget.org/packages/Discord.Net.WebSocket/)
2. [HtmlAgilityPack](https://www.nuget.org/packages/HtmlAgilityPack/)

---

## Discord Bots
### 前往網站、填寫資料
下方網址是前往 Discord Developer Portal 的網址，目的是要設定 Discord Bot 的資料，包含名稱、圖片、說明等等。
設定方式會比 line bot 簡單很多，可以參考下方圖片。
- [Discord Developer Portal](https://discord.com/developers/applications) 


#### 1. 創建 Bot
填寫bot 名稱，並且選擇創建。
![](/image/20230924_15-49-45.png)

{% note info flat %}
備註 : APPLICATION ID、PUBLIC KEY 目前本篇不會用到，之後看情況再補充。
![](/image/20230924_15-51-01.png)
{% endnote %}


#### 2. 設定權限
接下來，需要設定bot允許的權限。 當然，目前只需要讓他輸入文字，勾選輸入文字的選項即可。
![](/image/20230924_16-14-49.png)
選擇完畢後，按下複製按鈕並貼在瀏覽器搜尋，會導到加入哪個伺服器的地方。
![](/image/20230924_16-15-45.png)


### 3. 取得 token
![](/image/20230924_17-09-37.png)
---

## C# 撰寫程式碼
### 建立專案
這邊使用 ```Discord.WebSocket``` 製作機器人。首先，新增一個 ```class discordMessage```。

```cs
    public class discordMessage
    {
        private DiscordSocketClient _client;

        public async Task RunAsync()
        {
            _client = new DiscordSocketClient();
            _client.Log += Log;
            var token = "YOUER CLIENT SOCKET";

            await _client.LoginAsync(TokenType.Bot, token);
            await _client.StartAsync();
            // Block this task until the program is closed.
            await Task.Delay(-1);
        }
    }
```

這邊就是他初始化的部分，```token``` 是剛剛在 Discord Developer Portal > Bot 頁面複製的，這邊就是讓機器人登入的部分。

### 加入回覆留言功能
我們將觸發狀態加入在 LoginAsync 前，這樣就可以讓機器人在登入後，就可以觸發事件。可以直接對機器人留言就可以取得到```Hello```的回覆。
```cs
    ...
    ...

    //準備好時候觸發。
    _client.Ready += () =>
    {
        Console.WriteLine("Bot is ready!");
        return Task.CompletedTask;
    };

    // 當使用者輸入訊息時候觸發。
    _client.MessageReceived += async (message) =>
    {
        if (message.Author.Id == _client.CurrentUser.Id) return;
        await message.Channel.SendMessageAsync("Hello");
    }

    await _client.LoginAsync(TokenType.Bot, token);
    await _client.StartAsync();
    ...
    ...
```

---


## 實作爬蟲後回覆訊息
這邊我另外用 ```reptileWeb``` 撰寫，裡面內容是用 ```A.V.A```當作本次範例，將活動資訊寫回到我得Discord裡面。
```cs
public class reptileWeb
{
    public async Task<List<string>> GetWebInformation()
    {
        var doc = await LoadAsync("http://ava.mangot5.com/game/ava/notice");
        var xPath = "//*[@id=\"bodyContent_List1_Notice\"]/div/table/tbody/tr";
        HtmlNodeCollection content = doc.DocumentNode.SelectNodes(xPath);
        List<string> list = new();
        foreach (var item in content)
        {
            var title = item.SelectSingleNode("td[1]/a/text()").InnerText;
            title = Regex.Replace(title, @"\r\n?|\n|\r|\t", "");

            var href = item.SelectNodes("td[1]/a/@href").FirstOrDefault().Attributes.FirstOrDefault().Value.ToString(); ;
            Console.WriteLine(title + ": http://ava.mangot5.com/" + href);
            list.Add(title + ": http://ava.mangot5.com/" + href);
        }
        return list;
    }

    private async Task<HtmlDocument> LoadAsync(string url)
    {
        //取得當前 html 字串
        HttpClient client = new();
        HttpResponseMessage response = await client.GetAsync(url);
        response.EnsureSuccessStatusCode();
        string responseBody = await response.Content.ReadAsStringAsync();

        //設定response Body
        HtmlDocument doc = new();
        doc.LoadHtml(responseBody);
        return doc;
    }

}
```
這邊將剛才 discord 改寫，就可以得到我的要的結果。
```cs
 public class discordMessage
    {
        private DiscordSocketClient _client;

        public async Task RunAsync()
        {
            _client = new DiscordSocketClient();
            _client.Log += Log;
            var token = "YOUER CLIENT SOCKET";

            _client.Ready += () =>
            {
                Console.WriteLine("Bot is ready!");
                return Task.CompletedTask;
            };

            _client.MessageReceived += async (message) =>
            {
                Console.WriteLine(message);
                // Ignore messages sent by the bot itself
                if (message.Author.Id == _client.CurrentUser.Id)
                    return;

                // Respond to messages that contain "hello"
                if (message.Content.Contains("ava"))
                {
                    var reptile = new reptileWeb();
                    var list = reptile.GetWebInformation();
                    foreach (var item in list.Result)
                    {
                        await message.Channel.SendMessageAsync(item);
                    }
                }
            };
            await _client.LoginAsync(TokenType.Bot, token);
            await _client.StartAsync();

            // Block this task until the program is closed.
            await Task.Delay(-1);

        }

        private Task Log(LogMessage msg)
        {
            Console.WriteLine(msg.ToString());
            return Task.CompletedTask;
        }
    }
```

這邊我使用 netcore 7.0，```Program.cs``` 撰寫長度只需要這樣就好。
```cs

using BasicDiscordBot;

var discordBot = new discordMessage();
await discordBot.RunAsync();

```
### 效果如下
![](/image/20230924_17-08-51.png)

### 範例
以下就是我撰寫的範例，可以參考看看。
- [BasicDiscordBot](https://github.com/JontCont/BasicDiscordBot)


---
## 結論
最近有比較繁忙無法定期撰寫文章，這個樁案我擺他放了兩周才拿出來寫。後續看看Discord Bot 還有什麼花樣，我在另外寫一篇文章來介紹。