---
title: C# Net5 MVC - 使用 VSC
categories: 
  - 後端技術
  - C#
tags: 
  - C#
  - VSC
description:
keyword: 'C#,Net5,VSC'
cover: /img/dotnet/bg/cs_bg_001.png
---

## 前言 
近期太多事情沒有時間創建、撰寫文件，分享近期為甚麼開始使用 *VSC ( Visual Studio Code )* 原因。
對於剛進去軟體公司的新人都會安裝環境，通常會用到VS 開發工具進行撰寫，衍生舊版本與新版本使用差異以及便捷度。如果使用環境使用CLI創建可能帶來一些便捷，這當然不是主要原因。

VSC 不是開發軟體需要畫區分，他的優勢上帶來不少。例如: 輕量、執行、快捷鍵、豐富外掛等，減少安裝時間。

---

# 使用VSC 
不論是 VS2019、VS2022之類都很清楚有所謂版本，只要開發版本有落差就會需要學習時間。**本章節會使用.net5.0**。

## 創建專案
打開 VSC 輸入命令字元視窗 (快捷鍵 : ``` ctrl+ ` ``` )。
因為要使用 net5.0 所以使用下方指令， -f : force 、 -o : output name。

```console
  dotnet new mvc -f net5.0 -o dotnetMVC_itextsharp
```

版本有很多種，可以參考下方網址可以知道使用方式。
https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new#console

### 指令參考 
```
dotnet new <TEMPLATE> [--dry-run] [--force] [-lang|--language {"C#"|"F#"|VB}]
    [-n|--name <OUTPUT_NAME>] [--no-update-check] [-o|--output <OUTPUT_DIRECTORY>] [Template options]

dotnet new -h|--help
```

## 套件
### 新增 
網站 : [Nuget](https://www.nuget.org/)
Nuget 是目前最常使用的package，使用方式也相對簡單。
![](/img/dotnet/cs/cs_vsc_002.png)

選擇其中你要的package ，按下你目前要使用的Command進行使用即可。
```
dotnet add dotnetMVC_itextsharp package iTextSharp --version 5.5.13.3
```
![](/img/dotnet/cs/cs_vsc_001.png)

### 移除
移除套件可以參考下方指令 。

1. Package Manager
```
dotnet remove package iTextSharp
```
2. .NET CLI
```
uninstall-package iTextSharp
```


## 檢視方式
[參閱]使用檔案監看員開發 ASP.NET Core 應用程式
https://docs.microsoft.com/zh-tw/aspnet/core/tutorials/dotnet-watch?view=aspnetcore-6.0

NET Core 近期更新多一個指令 ``` dotnet watch``` 。這優點是可以在處理階段時可以修改，並呈現畫面效果。
之前開發時候都是使用Debugger 或是 Compiler影響很多行為上不便，各位有空可以嘗試。


## 發行
[參閱]dotnet publish
https://docs.microsoft.com/zh-tw/dotnet/core/tools/dotnet-publish

### 指令參考
```console
dotnet publish [<PROJECT>|<SOLUTION>] [-a|--arch <ARCHITECTURE>]
    [-c|--configuration <CONFIGURATION>]
    [-f|--framework <FRAMEWORK>] [--force] [--interactive]
    [--manifest <PATH_TO_MANIFEST_FILE>] [--no-build] [--no-dependencies]
    [--no-restore] [--nologo] [-o|--output <OUTPUT_DIRECTORY>]
    [--os <OS>] [-r|--runtime <RUNTIME_IDENTIFIER>]
    [--self-contained [true|false]] [--no-self-contained]
     [-s|--source <SOURCE>] [-v|--verbosity <LEVEL>]
    [--version-suffix <VERSION_SUFFIX>]

dotnet publish -h|--help
```

這邊用最簡單方式呈現如何發行，這邊要確認是否有沒有到專案底下。下方只用output即可非常簡單。
```
dotnet publish -o "c:/core_publish/"
```