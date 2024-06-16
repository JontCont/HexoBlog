---
title: 【LinqPAD】Expression、Statement、Program 使用方式
date: 2024-06-16 16:22:46
categories: 
  - 後端技術
  - LINQPad
tags: 
  - LINQPad
description:
cover: /image/20240526_16-31-14.png
---

## Expression vs Statement vs Program
LINQPad 有三種使用方式，分別是 Expression、Statement、Program，這三種方式的差異在於執行的方式不同，以下是三種方式的說明。

### Expression
這功能特性是只能執行一行程式碼，並且只能回傳一個值，無法執行多行程式碼，也無法使用變數。他是唯一一個是不用Dump() 也能看到結果的方式。下方範例用LINQPad 內建工具展示。

```CS
Util.Cmd("dir")
```

可以直接將結果顯示在LINQPad 畫面上，也可以順便理解 LINQPad 新開的 Queries 是放在哪個路徑。
![](/image/20240616_22-10-57.png)


### Statement(s)
Expression 如果給他一個 ```;``` 就是 Statement(s) 的方式。這功能可以完全活用 C# 的語法，可以使用變數、多行程式碼。簡單來說，這是一個無上層的程式碼執行方式 (example : net6.0 以上版本這類功能)。

這邊一樣使用剛才做法，如下圖 :
- 這個是完全無法 dump 出來上圖一樣的結果，需要再 dump 一次才能看到結果。
![](/image/20240616_22-15-22.png)


### Program
這是只要寫 .net 都會用的模式，因為這使用方式跟 statement(s) 一樣狀況就不再贅述。

---

## 快速開發須知

### 一、無法共用class或是namespace
LINQPad 是一個快速速成的工具，如果要有共用效果必須要透過左下角的My Extensions 來做共用。

### 二、快捷鍵切換模式
實作上可以透過快捷鍵來切換模式，如下 :
- Ctrl + 1 : Expression
- Ctrl + 2 : Statement(s)
- Ctrl + 3 : Program

個人習慣是使用 Statement(s) 來做開發，因為這樣可以使用變數，也可以使用多行程式碼。


### 三﹑EF Core 使用方式
下一篇會介紹一下 LINQPad 使用方式，若有連線好的資料庫可以使用以下動作。
- 先到 Connection 連線資料庫
- 若單純查看資料使用 expression 會節省下 dump 的動作
- ```this``` 是預設的 DbContext，可以直接使用 LINQ 查詢資料庫。

![](/image/20240616_22-24-28.png)
以上是簡單的 LINQPad 使用方式，希望對大家有幫助。


