---
title: C# resXManager (一) - 製作多國語言 
categories: 
  - dotnet
  - C#
tags: 
  - C#
  - VSC
  - resXManager
description:
keyword: 'C#,SignalR'
cover: /img/dotnet/bg/cs_bg_resXManager.png
---
## 前言
開發時期，許多人會注意開發最後須要有環境去做切換語言的動作。使用多國語言處理方式有很多種，如果使用老派一點可以使用Excel方式讀取指定要讀取的文字，可以參考NPOI、LinqToExcel 兩種套件效果會相當不錯。

# resXManager
resXManager 是資源文件編輯工具，使用方式相當簡單。內建有包含翻譯(不能太依賴)、Excel匯入出、創建語言時自動產生Resource檔案等，維護上可以套用同一個Resource開發上會相對快速。

首先第一步需要請各位先自行安裝ResXManager。

- ResXManger : [請點選](https://marketplace.visualstudio.com/items?itemName=TomEnglert.ResXManager)
- Github : [請點選](https://github.com/JontCont/dotnet_resXManager)

## 創建專案
此文章是使用 framework 4.7.2 ，目前筆者嘗試過一些版本可以參考Github資訊。創建完畢後在```Properties``` 裡面新增 ```resources.resx``` 檔案，方便待會存放文字。


{% note info flat %}
    ### VB.NET
    目前嘗試WebForm 版本初始預設位置會是在 App_GlobalResources ，會與C#使用方式不太同。
{% endnote %}

![](/img/dotnet/cs/resXManager/Snipaste_2022-07-23_20-06-59.png)
![](/img/dotnet/cs/resXManager/Snipaste_2022-07-23_20-09-19.png)


## 加入Resource
為了讓resources有資料，第一個動作可以先把指定的文字去選取、```Move to Resource``` 加入ResXManger當中，後面設定語言會比較方便一些。

剛才創建的resources會自動加入在裡面當中。
![](/img/dotnet/cs/resXManager/Snipaste_2022-07-23_20-11-09.png)
![](/img/dotnet/cs/resXManager/Snipaste_2022-07-23_20-13-19.png)


## 創建類別
這邊會透由一些管道去取得ResXManger內容，需要建立Function方便取得。我們創建一個 ```LanguageHelper``` 之後讓cshtml取的內容。


{% note info flat %}
    ### ResourceManager 設定
    1. ```dotnet_resXManager.Properties.ResourceLanguage```可以透由創建的resx檔點開取得。
    2. CurrentUICulture 是Resource文化特性資源，如果要切換語言可以透由這東西去修改。
{% endnote %}

```cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Resources;
using dotnet_resXManager.Properties;

namespace dotnet_resXManager
{
    public class LanguageHelper
    {
        private static ResourceManager _res { get; set; }

        public static string GetText(string name)
        {
            string lanString = "en-US";//"zh-TW";

            //取得或設定 CultureInfo 物件，此物件代表 Resource Manager 用於執行階段查詢特定文化特性資源的目前使用者介面文化特性。
            //資源管理員用來在執行階段查詢特定文化特性資源的文化特性。
            System.Threading.Thread.CurrentThread.CurrentUICulture =
                new System.Globalization.CultureInfo(lanString);
            _res =
                new ResourceManager("dotnet_resXManager.Properties.ResourceLanguage", typeof(ResourceLanguage).Assembly);

            return _res.GetString(name) ?? name;
        }

    }
}
```

加入方式可以直接用 ```GetText```取得想要的文字，這邊前置作業就完成了。
```cs
@{
    ViewBag.Title = "Home Page";
}

<div class="jumbotron">
    <h1>ASP.NET</h1>
    <p class="lead">ASP.NET is a free web framework for building great Web sites and Web applications using HTML, CSS and JavaScript.</p>
    <p><a href="https://asp.net" class="btn btn-primary btn-lg">@LanguageHelper.GetText("LearnMore") &raquo;</a></p>
</div>

```

![](/img/dotnet/cs/resXManager/Snipaste_2022-07-23_20-32-29.png)
![](/img/dotnet/cs/resXManager/Snipaste_2022-07-23_20-33-36.png)


## 新增resXManager項目
我們可以直接用上方 [工具]> [resXManager] 點選。如果要新增語言可以參考介面下方 Language 選項填寫，resXManager 使用方式跟Excel 很類似，如果自身有準備好excel可以嘗試用匯入方式。

![](/img/dotnet/cs/resXManager/Snipaste_2022-07-23_20-34-30.png)
![](/img/dotnet/cs/resXManager/Snipaste_2022-07-23_20-35-38.png)
![](/img/dotnet/cs/resXManager/Snipaste_2022-07-23_20-35-52.png)


## 結果
### zh-TW
![](/img/dotnet/cs/resXManager/Snipaste_2022-07-23_20-42-34.png)
### en-US
![](/img/dotnet/cs/resXManager/Snipaste_2022-07-23_20-42-57.png)

