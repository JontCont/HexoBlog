---
title: C# itextsharp 套件
categories: 
  - dotnet
  - C#
  - package
tags: 
  - C#
  - VSC
description:
keyword: 'C#,Net5,VSC'
cover: /img/dotnet/bg/cs_bg_002.png
---

## 前言 
PDF 不論甚麼場合都需要使用，包含公司都會需要有PDF轉出轉入的工具，這邊使用PDF轉檔進行作業。


# iTextSharp
製作方式需要新增 ```Document ```內部內容都會以Document 才新增、寫入。

```cs
    //設定PageSize
    //Margin: left, right, top, bottom
    Document doc = new Document(PageSize.A4, 20, 20, 50, 50); 
```
