---
title: StartFMS.Extensions.Data 使用方式
categories: 
  - 雲端平台
  - Nuget
tags: 
  - Nuget
description:
keyword: 'Nuget, C# ,.Net'
cover: /image/20230402_16-57-24.png
---
## 安裝方式
.NET Cli
```cli
dotnet add package StartFMS.Extensions.Data --version 1.0.5
```

Package Manager
```cli
NuGet\Install-Package StartFMS.Extensions.Data -Version 1.0.5
```

## 字串轉換
提供 int 、Double、float、datetime等轉換資料型態，範例如下

```cs
int Number = "100800".ToInt();
DateTime dt = "2023/3/10".ToDateTime();
```

## 千分位、小數點字串
```cs
//千分位轉換
string thousandths = "10000".ToThousandths();

// 小數點
string places = "10000".ToDecimalPlaces(6);
```

## 自動累加數字
```cs
string num = "0000".ToAutoNumber();
string num1 = "0001".ToNumber(5); //output : 00001
```

## Model 預設值
```cs
//預設 class 內屬性預設值
var mods = new Class1(){}.InitValue();

//傳入 mods 值
var mods2 = new Class1(){}.SetValue(mods);
```

## 更新紀錄
1.0.5  
- 修繕型態無法轉換問題

1.0.4  
- 加入 ToCapitalizeFirstLetter() ->字首大寫
- 變更 ToDefaultValue -> InitValue、ToValue -> SetValue 名稱
