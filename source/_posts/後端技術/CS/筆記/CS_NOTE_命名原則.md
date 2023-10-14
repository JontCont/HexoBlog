---
title: C# 命名原則 PascalCase、camelCase、Hungarian notation
date: 2023-02-26 19:44:08
categories: 
  - 後端技術
  - C# 
  - 筆記
tags: 
  - C#
  - 命名原則
description:
keyword: 'C#'
cover: /image/20230226_19-44-08.png
---

# 命名原則 
## 一、小駝峰式命名法 (lower camel case)
又稱「camel Case 」。把字首字母改為小寫其他改為大寫，例如 : ```dataTable```、```fileName```、```userDetail```。

![](/image/20230226_19-44-08.png)

## 二、大駝峰式命名法 (upper camel case)
又稱「Pascal Case 」。把每一個前面第一個字首字母改為大寫，例如 : ```DataTable```、```FileName```、```UserDetail```。

![](/image/20230226_19-44-17.png)


## 三、匈牙利命名法（Hungarian notation）
匈牙利命名法的基本思想是在變數名稱前面添加一個或多個簡稱，這個簡稱表示該變數的數據類型或其他屬性。例如，字串變數可以使用 "str" 的前綴，整數變數可以使用 "i" 的前綴等等。這些前綴使代碼更易於閱讀，因為它們提供了有關變數類型和用途的重要信息。

匈牙利命名法前綴：
- str：字串類型
- i：整數類型
- b：布林類型
- f：浮點數類型
- o：物件類型

```cs
string strName;
int iAge;
bool bIsEnabled;
```
軟體開發中已經不再廣泛使用匈牙利命名法，因為它可能會導致變數名稱變得冗長且容易混淆。取而代之的是，一些開發者選擇使用更加清晰和簡潔的命名慣例，例如 camelCase 或 PascalCase。最重要的是，開發者應該在代碼中使用一致的命名慣例，以提高代碼的可讀性和可維護性。

## 四、使用時機
它們的使用時機主要取決於個人偏好和代碼風格指南，但也可以根據識別符所表示的內容進行適當的選擇。以下是幾個使用 camelCase 和 PascalCase 的建議時機：

- Camel Case：通常用於識別符的命名，如變量、方法、參數等。在這些情況下，識別符的首字母小寫，後面的單詞首字母大寫，並且不使用下劃線或其他分隔符。
- Pascal Case：通常用於命名類、結構體、接口和委派等。在這些情況下，識別符的每個單詞的首字母都大寫，並且不使用下劃線或其他分隔符。在一些代碼風格中，也可以用於命名方法和屬性等識別符。

以下是一些使用 camelCase 和 PascalCase 的示例：
```cs
// 使用 camelCase 命名變量和方法
int myVariable;
void myMethod() { ... }

// 使用 PascalCase 命名類和接口
public class MyClass { ... }
public interface IMyInterface { ... }

// 混合使用 camelCase 和 PascalCase
void doSomething(int myParameter) { ... }
public class MyCustomClass { ... }
```
總體而言，選擇使用 camelCase 或 PascalCase 取決於識別符的類型和用途。開發者應該遵循一致的命名慣例，以提高代碼的可讀性和可維護性。

## 五、參考文件
- [变量的命名方法【Hungarian】【camelCase】【PascalCase】](https://www.cnblogs.com/CodingPerfectWorld/archive/2010/06/10/1755628.html)
- [邁向專業軟體工程師必修的英文課系列 第 2 篇](https://ithelp.ithome.com.tw/articles/10233726)