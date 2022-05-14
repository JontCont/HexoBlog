---
title: C# Unit Test (一) - 使用方式
categories: 
  - dotnet
  - C#
tags: 
  - UnitTest
  - 單元測試
  - C#
description:
keyword: 'UnitTest  , C#'
cover: /img/UnitTest/unit.png
---

## 前言
目前開發至今已經快要邁向第二年，公司沒有人使用過單元測試，因此我決定要記錄Unit Test使用方式。紀錄主要原因是目前為止我尚未使用過Unit Test ，請各位見諒<(＿　＿)>。

---

# 單元測試 (Unit Test)
單元測試可以稱模組測試，它主要針對程式模組正確性的驗證。它的優點開發過程可以用在早期開發抓到錯誤問題。

## 使用 VS C#
這邊使用[主控台應用程式]展示UnitTest開啟方式。
![](/img/UnitTest/Test01.jpg)
創建好之後輸入額外的Class並簡單撰寫Function。
```cs
    public class Arithmetic
    {
        public decimal Additon(int GetValue , int SetValue)
        {
            decimal Result = GetValue + SetValue;
            return Result;
        }
        public decimal Minus(int GetValue, int SetValue)
        {
            decimal Result = GetValue - SetValue;
            return Result;
        }
    }
```
## 創建單元測試
單元測試創建方式有兩種，一種是按下右鍵後，可以看見建立單元測試選項。這邊我就不展示這邊單元測試。
![](/img/UnitTest/Test02.jpg)

請在我們的 [ 解決方案 ] 創建 [ MsTest 專案]，但要注意創建完沒有包含這區域裡面的專案中，所以要在[ 相容性 ]按下右鍵，在按下[ 新增專案參考 ]即可，通常會出現第一個選項。

![](/img/UnitTest/Test03.jpg)
![](/img/UnitTest/Test04.jpg)
![](/img/UnitTest/Test05.jpg)

要非常要注意，相容性新增參考要注意不要加入到要進行測試的專案當中。


## 撰寫測試Function
這邊我們隨便在一個位置隨便輸入回傳值，進行查看測試樣子。
```cs
public void 測試四則運算_加號()
{
    Arithmetic ari = new Arithmetic();
    decimal result =  ari.Additon(3, 4);
    Assert.AreEqual(8, result);//
}
```
執行位置會在[測試]選項，選擇[執行所有測試]，會看到有錯誤訊息得知它會傳的內容。
![](/img/UnitTest/Test06.jpg)
![](/img/UnitTest/Test07.jpg)


如果改為正常後，就會如下圖。會明確知道這測試function是正常的，可以有效避免開發時意外錯誤問題。
![](/img/UnitTest/Test08.jpg)



