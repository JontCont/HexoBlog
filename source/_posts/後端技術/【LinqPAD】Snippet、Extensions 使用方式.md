---
title: 【LinqPAD】Snippet、Extensions 使用方式
date: 2024-05-26 16:22:46
categories: 
  - 後端技術
  - LINQPad
tags: 
  - LINQPad
description:

cover: /image/20240526_16-31-14.png
---

## 前言
近期稍微認真一下把之前 will 保哥上過的Linqpad 使用方式再重新整理一下，這次主要是針對 Snippet、Extensions 的使用方式，這兩個功能可以讓我們在撰寫程式碼時更加方便，也可以讓我們的程式碼更加簡潔。


## LinqPad 使用方式 Snippet、Extensions
### 一、擴充 Extensions
LinqPad 裡面會一個 My Extensions 的檔案，他可以讓我們自己定義一些常用的方法，這樣在撰寫程式碼時就可以直接使用這些方法，而不用每次都重新撰寫一次。

- static class MyExtensions : 從 Code 裡面可以看到有三段地方，原則上會使用 MyExtensions 這個類別，通常是要使用小工具之類加入在這裏面，，這樣就可以在撰寫程式碼時直接使用這些方法。
- region Advanced : 這裡面是一些進階的方法，這裡面的方法通常是一些比較複雜的方法，這樣就可以在撰寫程式碼時直接使用這些方法。裡面如果要針對各Framework 有不同的方法，可以使用官方已經自動的 #if 來區分。

![](/image/20240526_15-58-05.png)


使用方式效果如下

```csharp
void Main()
{
    // 使用自定義的方法
    "Hello World".Dump();
    "Hello World".ToTitleCase().Dump();
}

//(My Extension file)  Define other methods and classes here
public static class MyExtensions
{
    public static string ToTitleCase(this string str)
    {
        return CultureInfo.CurrentCulture.TextInfo.ToTitleCase(str);
    }
}
```


### 二、片段 Snippet
Snippet 是一個程式碼片段，可以讓我們在撰寫程式碼時，直接使用這些片段，這樣就可以省去一些重複的工作，也可以讓我們的程式碼更加簡潔。

#### 2-1 Snippet 的使用方式
下面我寫一段 mininal api 的片段，這樣在撰寫程式碼時就可以直接使用這個片段，而不用每次都重新撰寫一次。這裡注意是如果不使用 UseUrls 執行時候是預設 5000 port，如果要指定 port 可以使用 UseUrls 來指定。

```csharp
var builder = WebApplication.CreateBuilder();
builder.WebHost.UseUrls("http://localhost:4000");

var app = builder.Build();

app.MapGet("/api/test",() =>
{
	return Enumerable.Range(1, 5).Select(e => new
	{
		number = Random.Shared.Next(-20, 55)
	}).ToList().Dump();
})
.WithName("GetTest");


var uriBase = "http://localhost:4000/api";
StartWebBrowser($"{uriBase}/test");

app.Run();

void StartWebBrowser(string uri)
{
	Process.Start(new ProcessStartInfo(uri) { UseShellExecute = true });
}

```

接下來，選取全部程式碼後按下右鍵```Create Code Snippet```，Code 的區塊會帶入 Queries 選取後的程式碼，這樣就可以在撰寫程式碼時直接使用這個片段，而不用每次都重新撰寫一次。
上面的選項如果有任何改變 refence、namespace、using 之類會自動包含在裡面，如果要再使用這個片段就可以不用去using。

![](/image/20240526_16-15-40.png)
![](/image/20240526_16-17-55.png)
![](/image/20240526_16-23-01.png)


#### 2-2 Snippet 快捷鍵
一旦使用 Snippet 之後，一定要學會如何加入 snippet 的快捷鍵，這樣在撰寫程式碼時就可以直接使用這個片段，不用透過滑鼠點擊。

1. 請至新的 Quries 使用 ```Ctrl + K + X ``` 
2. 出現 ``` Insert Snippet ``` 包含下拉選單會出現 ``` My LinqPad Snippets ``` 選擇你要的片段即可。

如果你要使用C#片段一樣也可以使用這個方式，這樣就可以在撰寫程式碼時直接使用這個片段，而不用每次都重新撰寫一次。 