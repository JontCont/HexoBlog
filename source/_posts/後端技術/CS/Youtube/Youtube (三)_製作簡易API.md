---
title: Youtube (三) - 製作簡易API
categories: 
  - 後端技術
  - C#
  - Youtube
tags: 
  - C#
  - Youtube
  - API
description:
keyword: 'Form  , C#'
cover: https://www.youtube.com/s/desktop/82a4cf4f/img/favicon_144x144.png
# sticky: 1
---

## 前言
前面使用授權部分完成後，就可以開始 API 抓取動作。Oauth2 最難部分已經完成剩下如何使用 Youtube API，API 可以透過 [Youtube Data API](https://developers.google.com/youtube/v3/docs/search/list)測試結果在執行 Code部分。

備註 : 這篇主要目的做做看，之後依據情況製作下一章介紹。

## Search 搜尋
- API : ```https://youtube.googleapis.com/youtube/v3/search```
備註 : method 是 Request parameters 使用下方範例需要把他串成string 才能成功執行。
```cs
    [Authorize]
    [HttpGet("search")]
    public async Task<string> SearchAsync()
    {
        var users = User.Claims.Select(x => new { type = x.Type, value = x.Value });
        string access_token = users.Where(x => x.type == "access_token").Select(x => x.value).FirstOrDefault();
        //取得當前 html 字串
        HttpClient client = new();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", access_token);
        client
            .DefaultRequestHeaders
            .Accept
            .Add(new MediaTypeWithQualityHeaderValue("text/json"));

        string reqUrl = "https://youtube.googleapis.com/youtube/v3/search";
        var request = new HttpRequestMessage(HttpMethod.Get, reqUrl);
        request.Content = new StringContent("", Encoding.UTF8, "text/json");
        var response = await client.SendAsync(request);

        if (response.StatusCode != HttpStatusCode.OK)
        {
            return JsonConvert.SerializeObject(new
            {
                Success = false,
                Message = ""
            });
        }
        var content = await response.Content.ReadAsStringAsync();
        var result = JsonConvert.DeserializeObject(content);
        return JsonConvert.SerializeObject(new
        {
            Success = true,
            Message = result
        });
    }

```

## Subscriptions 訂閱 
訂閱部分需要傳入相關參數與 Search 不同於需要使用JSON Request 才能達到效果。

```cs
    [Authorize]
    [HttpGet("VaildTestInsert")]
    public async Task<string> VaildTestInsertAsync()
    {
        var users = User.Claims.Select(x => new { type = x.Type, value = x.Value });
        string access_token = users.Where(x => x.type == "access_token").Select(x => x.value).FirstOrDefault();
        //取得當前 html 字串
        HttpClient client = new();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", access_token);
        client
            .DefaultRequestHeaders
            .Accept
            .Add(new MediaTypeWithQualityHeaderValue("application/json"));

        string reqUrl = "https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet";
        var request = new HttpRequestMessage(HttpMethod.Post, reqUrl);
        var data = new
        {
            snippet = new
            {
                resourceId = new
                {
                    kind = "youtube#channel",
                    channelId = "UC8vYGLZz142UOeopDvOBmAg"
                }
            }
        };
        request.Content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "text/json");
        var response = await client.SendAsync(request);
        var content = await response.Content.ReadAsStringAsync();

        if (response.StatusCode != HttpStatusCode.OK)
        {
            return JsonConvert.SerializeObject(new
            {
                Success = false,
                Message = content.ToString()
            });
        }
        var result = JsonConvert.DeserializeObject(content);
        return JsonConvert.SerializeObject(new
        {
            Success = true,
            Message = result
        });
    }
```

## 參考文件 
- Youtube Data API: [https://developers.google.com/youtube/v3/docs/search/list](https://developers.google.com/youtube/v3/docs/search/list)
- Github : [https://github.com/JontCont/Youtube](https://github.com/JontCont/Youtube)