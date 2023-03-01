---
title: C# out、ref 
categories: 
  - 後端技術
  - C# 
  - 筆記
tags: 
  - C#
description:
keyword: 'C#'
cover: /image/20230219_22-54-19.png
---

## out 關鍵字
out 關鍵字表示該參數是一個輸出參數，方法將為其賦值。使用 out 關鍵字的參數在方法調用之前不需要賦值。在方法內部，out 參數必須賦值，否則編譯器會報錯。以下是使用 out 關鍵字的範例：

```cs
void Calculate(int input, out int output)
{
    output = input * 2;
}

int input = 5;
int result;
Calculate(input, out result);
```
上面範例中，Calculate 方法帶有一個 input 參數和一個 out output 參數。Calculate 方法內部賦值了 output 參數，因此可以在方法調用後使用 result 變數來獲取方法的計算結果。

## ref 關鍵字
ref 關鍵字則表示該參數是一個引用參數，方法可以修改其值並且這些修改也會影響到參數的原始值。使用 ref 關鍵字的參數必須在方法調用之前賦值。以下是使用 ref 關鍵字的範例：

```cs
void Increment(ref int value)
{
    value++;
}

int number = 5;
Increment(ref number);
```
在這個範例中，Increment 方法帶有一個 ref value 參數。Increment 方法內部修改了 value 參數的值，因此在方法調用後，number 變數的值也會被修改。

## 結論
out 和 ref 都用於方法參數的傳遞，但是它們有不同的用途和規範。out 關鍵字用於表示一個輸出參數，而 ref 關鍵字則用於表示一個引用參數。

重點整理 : 
- 傳遞至 ref 參數的引數，在傳遞之前必須先初始化。 out 參數的引數不需要在傳遞之前先明確初始化。 
- ref 參數必須做初始化 ， Out則不需要
- out 必須修改傳入的參數， ref 則不用

| |參數初始化|修改參數|執行前初始|結束前初始|
|:---:|:---:|:---:|:---:|:---:|
|out| |V| |V|
|ref|V| |V| |
