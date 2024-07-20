---
title: C# Electron (一) - 安裝 MVC Core 設定 
date: 2021-10-20 13:48:53
categories: 
  - 後端技術
  - C#
tags: 
  - MVC
  - Core
  - Electron
  - C#
cover: /img/dotnet/Electron/bg.png
---
## 前言
Electron 是近年來有比較多人使用的架框，最大原因是在 Winform 跨平台上無法使用，因此誕生 Electron架框。

這是目前為止是Winform替代方案，後續再做相關範例。

---

# Electron 介紹
Electron（原名為Atom Shell）是GitHub開發的一個開源框架。它通過使用Node.js（作為後端）和Chromium的彩現引擎（作為前端）完成跨平台的桌面GUI應用程式的開發。Electron現已被多個開源Web應用程式用於前端與後端的開發，著名專案包括GitHub的Atom和微軟的Visual Studio Code。

一個基礎的Electron包含三個檔案：package.json（元資料）、main.js（代碼）和index.html（圖形化使用者介面）。框架由Electron可執行檔（Windows中為electron.exe、macOS中為electron.app、Linux中為electron）提供。開發者可以自行添加標誌、自訂圖示、重新命名或編輯Electron可執行檔。

-取用於[維基百科](https://zh.wikipedia.org/wiki/Electron)

---

# 安裝Electron
## 一、創建專案
Electron 原本沒有想過說用 MVC架框使用，因為需要遷入DLL檔案逼不得已需要用到c#撰寫。
如何安裝環境，請打開各位的 VS2019 或是 VS2022 都可以進行，切記按下[ ASP.NET  Core Web ]。

![](/img/dotnet/Electron/01.jpg)

驗證類型自行考量後續發展進行勾選。
![](/img/dotnet/Electron/02.jpg)

## 二、新增套件 ( NuGet )
對此專案按下右鍵並選擇管理 NuGet 套件選項。記得搜尋Electron。
找到ElectronNet.Api 並下載他。
![](/img/dotnet/Electron/03.jpg)
![](/img/dotnet/Electron/04.jpg)


## 三、設定環境
設定環境有兩個地方。依據下方範例新增上去。
1. Program.cs
```cs
  //Program.cs
  public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
    .ConfigureWebHostDefaults(webBuilder =>
    {
        //需新增
        webBuilder.UseElectron(args); 
        webBuilder.UseStartup<Startup>();
    });
```
2. Startup.cs
```cs
//Startup.cs
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
  ...
  ...
  //需新增
  Task.Run(async () => await Electron.WindowManager.CreateWindowAsync());
}
```
![](/img/dotnet/Electron/05.jpg)
![](/img/dotnet/Electron/06.jpg)

## 四、初始化 Electronize 
請到 powershell 視窗輸入 ``` dotnet tool install ElectronNET.CLI -g ``` ，就會進行安裝 electronize 指令。 
![](/img/dotnet/Electron/07.jpg)
這是 electronize 指令內容，請各位參閱。
![](/img/dotnet/Electron/08.jpg)

如果直接輸入``` electronize init ```突然報錯誤怎麼辦。
![](/img/dotnet/Electron/09.jpg)

最大原因是路徑問題，```dir``` 查看專案目前在哪個路徑。因為它不再真正的source路徑，所以引發路徑錯誤問題。~只要將cd 進入下一層即可~。
![](/img/dotnet/Electron/10.jpg)
![](/img/dotnet/Electron/11.jpg)

## 五、執行
安裝完畢之後， 輸入最後指令 ``` electronize start``` 就完成 mvc + electronize環境。
![](/img/dotnet/Electron/12.jpg)


---

# 結論 
這次補齊 Electron 環境設定，後續請讀者可以依據這裡面簡單範例產出環境。從winForm轉到 Electron 多少會不太適應，但能達到[ 網頁+form ]可以對客戶需求簡單調整。這篇文章告一段落後續開始準備撰寫 ReactJS。
