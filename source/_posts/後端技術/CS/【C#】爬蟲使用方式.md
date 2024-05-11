---
title: 【C#】爬蟲使用方式
date: 2022-05-30 22:07:59
categories: 
  - 後端技術
  - C#
tags: 
  - C#
description:
keyword: 'C#,Core'
cover: /image/20230530_22-07-59.png
---
## 前言
主要是最近有個專案忘記紀錄以前寫的 Code ，順便把爬蟲那段拿出來紀錄。爬蟲是透過 Response 回來後的html 並從裡面竊取資料，執行動作必須要確認當前站台是否有開放能拿取資料的設定檔，如 robots.txt 。這邊就以簡單範例為例。
---

## 前置作業
- Html Agility Pack : [點選我](https://html-agility-pack.net/)

## 撰寫爬蟲頁面
這邊使用 "https://udn.com/news/cate/2/6644" 聯合報新聞來做示範。

### response當前頁面
```cs
using HtmlAgilityPack;
namespace networkReptile
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            //設定爬的網站
            string url = "https://udn.com/news/cate/2/6644";
            
            //取得當前 html 字串
            HttpClient client = new();
            HttpResponseMessage response = await client.GetAsync(url);
            
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();

            //設定response Body
            HtmlDocument doc = new ();
            doc.LoadHtml(responseBody);

        }
    }
}
```

## 取得想要的資料
```cs
    //取得想要的內容
    for (int i = 1; i<10; i++)
    {
        string xpath = @$"/html/body/main/div/section[2]/section[2]/div[1]/div[{i}]/div[2]/h2/a";
        HtmlNodeCollection content = doc.DocumentNode.SelectNodes(xpath);
        if(content == null) { continue; }
        foreach (HtmlNode node in content)
        {
            string href = doc.DocumentNode.SelectNodes(xpath+ @"/@href").FirstOrDefault().Attributes.FirstOrDefault().Value.ToString();
            Console.WriteLine($"{i} - {node.InnerText} (https://udn.com/{href})");
            break;
        }//foreach (HtmlNode node in content)
    }//for()
```

## 完整程式碼
```cs
using HtmlAgilityPack;

namespace networkReptile
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            //設定爬的網站
            string url = "https://udn.com/news/cate/2/6644";
            
            //取得當前 html 字串
            HttpClient client = new();
            HttpResponseMessage response = await client.GetAsync(url);
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();

            //設定response Body
            HtmlDocument doc = new ();
            doc.LoadHtml(responseBody);

            Console.WriteLine($"!! ----- 即時新聞 ------ !!");

            //取得想要的內容
            for (int i = 1; i<10; i++)
            {
                string xpath = @$"/html/body/main/div/section[2]/section[2]/div[1]/div[{i}]/div[2]/h2/a";
                HtmlNodeCollection content = doc.DocumentNode.SelectNodes(xpath);
                if(content == null) { continue; }
                foreach (HtmlNode node in content)
                {
                    string href = doc.DocumentNode.SelectNodes(xpath+ @"/@href").FirstOrDefault().Attributes.FirstOrDefault().Value.ToString();
                    Console.WriteLine($"{i} - {node.InnerText} (https://udn.com/{href})");
                    break;
                }//foreach (HtmlNode node in content)
            }//for()

        }//main()
    }
}
```

## 參考文件
- [使用 HtmlAgilityPack 來採集網頁](https://exfast.me/2016/07/c-use-the-htmlagilitypack-to-collect-web-pages/)