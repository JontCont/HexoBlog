---
title: Line Bots(三) - 使用C# Reply Message
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
cover: https://d.line-scdn.net/stf/linecorp/en/pr/quickreply_en.png
# sticky: 1
---

上一篇完成簡易版本的Push Message ，這邊要稍微注意一下使用量。Line 提供兩種模式給Message API使用 "Push"、"Reply"兩種模式，其中Push用來推廣方案銷售，所以次數限量上會限縮在500則，超過後需要付費才能使用。

Reply 目前使用上沒有任何限制，所以使用上可以不必要特別拘謹。

## 前置作業、工具
處理步驟需要修改 ```launchSetting.json``` url ，並執行ngrok、```dotnet run```就可以使用。 
- launchSetting.json
- ngrok 
- 後端技術 run


{% note info flat %}
### 備註
ngrok 只要不中途離開，即使當下"網頁失效" ngrok 是會繼續執行。
{% endnote %}

### 程式碼範例
- Github [dotnetCore_LineBot](https://github.com/JontCont/dotnetCore_LineBot)


## Reply Message - 1/2
Line Reply 需要使用者回覆訊息，Bots 部分會選擇適當回覆內容回覆給對方。當中 Reply 可以判別對方發的訊息是 Message 、Images 、貼圖 ，Json 回覆部分後續再探討。

完成【C#】Line BotsReply Message 前置作業，需要完成三步驟。
### 一、取得 JSON Body
```cs
  string strBody = "";
  try{
      //取得 http Post 
      using (StreamReader reader = new(Request.Body, System.Text.Encoding.UTF8))
      {
          strBody = reader.ReadToEndAsync().Result;
          if (reader == null || string.IsNullOrEmpty(strBody))
              return JsonConvert.SerializeObject(new { success = false, message = "error : message empty " });
      }
  }catch(Exception ex){
      bot.PushMessage(adminUserID, ex.Message);
      return JsonConvert.SerializeObject(new { success = false, message = ex.Message });
  }
```

### 二、轉 JSON Data
```cs
  //RawData(should be JSON)
  var ReceivedMessage = Utility.Parsing(strBody);
  if (ReceivedMessage == null) return JsonConvert.SerializeObject(new { success = false, message = "error : message empty " });
```

### 三、取得Line Event
```cs
  var LineEvent = ReceivedMessage.events.FirstOrDefault();
  if (LineEvent == null)
  {
      return JsonConvert.SerializeObject(new { success = false, message = "error : not found event ! " });
  }
```
---
## Reply Message - 2/2
完成以上作業後，我的處理方式是把Event拆開，Line 有提供 Event 可以取得狀態。以下處理方式只有加入Join 以及message。

{% note info flat %}
### 備註
如果使用這使用 images 貼上圖片，會直接執行到 message 。處理Line Event 方式需要留意一下
{% endnote %}
```cs
  private void ReplyBotsMessage(Bot bot,Event lineEvent)
  {
      TextMessage textMessage = new ("");

      switch (lineEvent.type)
      {
          case "join":
              textMessage = new TextMessage($"大家好啊~");
              break;
          case "message":
              string text = lineEvent.message.text;
              if (text == null) break;
              textMessage =  new TextMessage($"您回應是 : {text}");
              break;
      }
      if(string.IsNullOrEmpty(textMessage.text)){
          textMessage = new ($"你回覆的訊息無法判讀，請重新輸入!!");
      }
      bot.ReplyMessage(lineEvent.replyToken, textMessage);
  }
```

### 完整程式碼
```cs
using System.Text;
using isRock.LineBot;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace dotnetCore_LineBot.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MessageController: ControllerBase
    {
        public string channelToken{get; private set;}="";
        public string adminUserID{get; private set;}="";

        [HttpPost]
        public string Post(){
            Bot bot = InitialBots();
            List<MessageBase> repMessage = new List<MessageBase>();
            string strBody = "";
            
            try{
                //取得 http Post 
                using (StreamReader reader = new(Request.Body, System.Text.Encoding.UTF8))
                {
                    strBody = reader.ReadToEndAsync().Result;
                    if (reader == null || string.IsNullOrEmpty(strBody))
                        return JsonConvert.SerializeObject(new { success = false, message = "error : message empty " });
                }
            }catch(Exception ex){
                bot.PushMessage(adminUserID, ex.Message);
                return JsonConvert.SerializeObject(new { success = false, message = ex.Message });
            }

            //RawData(should be JSON)
            var ReceivedMessage = Utility.Parsing(strBody);
            if (ReceivedMessage == null) return JsonConvert.SerializeObject(new { success = false, message = "error : message empty " });

            var LineEvent = ReceivedMessage.events.FirstOrDefault();
            if (LineEvent == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "error : not found event ! " });
            }
            ReplyBotsMessage(bot,LineEvent);

            return JsonConvert.SerializeObject(new { success = true, message = "" });
        }//public : Post


        //-------------------------//
        private Bot InitialBots(){
            string channelToken = this.channelToken;
            return new Bot(channelToken);
        }//private: InitialBots

        private void ReplyBotsMessage(Bot bot,Event lineEvent)
        {
            TextMessage textMessage = new ("");

            switch (lineEvent.type)
            {
                case "join":
                    textMessage = new TextMessage($"大家好啊~");
                    break;
                case "message":
                    string text = lineEvent.message.text;
                    if (text == null) break;
                    textMessage =  new TextMessage($"您回應是 : {text}");
                    break;
            }
            if(string.IsNullOrEmpty(textMessage.text)){
                textMessage = new ($"你回覆的訊息無法判讀，請重新輸入!!");
            }
            bot.ReplyMessage(lineEvent.replyToken, textMessage);
        }//private: ReplyBotsMessage


    }//class : MessageController
}//namespace
```

## 參考文件
- [活用 Messaging API 打造客製化的官方帳號](https://tw.linebiz.com/e-learning/oa/Messaging-API-application/)
- [LINE@ 收費計算機（2022 最新）LINE2.0 官方帳號費用線上試算](https://blog.omnichat.ai/2020/01/line-2-0-official-account-pricing/)
- [使用C#開發LINE Bot(32) – .net core 2.2 WebHook 範例](http://studyhost.blogspot.com/2019/07/cline-bot32-net-core-22-webhook.html)

