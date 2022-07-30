---
title: VB Asp.Net - 使用 Ajax
categories: 
  - dotnet
  - VB
tags: 
  - VB
description:
keyword: 'Ajax, VB , Asp.Net '
cover: /img/Web/js/Ajax/ajax-logo.jpg
---


## 前言
前幾天遇到VB Asp .Net 沒有人寫過 ajax 紀錄，今天單純撰寫如何適用 VB 的 AJAX。
寫法如同與C# ajax 相似，就請各位看下去。


# AJAX
## 什麼是 AJAX ？
AJAX 是「Asynchronous JavaScript and XML」（非同步的 JavaScript 與 XML 技術）的縮寫，簡單說就是網頁不用重新整理，就能即時地透過瀏覽器去跟伺服器溝通，撈出資料。
- Asynchronous：非同步
- JavaScript：使用的程式語言
- XML：Client 與 Server 交換資料用的資料與方法，近年由於 JSON 等格式的流行，使用 Ajax 處理的資料並不限於 XML。

## 同步請求 v.s. 非同步請求
接著讓我們引入客戶端與伺服器端的概念，來看看「同步請求」和「非同步請求」的對比：
- 同步請求 (Synchronous request)： 客戶端 (client) 對伺服器端 (server) 送出 request ，並且在收到伺服器端的 response 之後才會繼續下一步的動作，等待的期間無法處理其他事情。這個作法並不理想，因為通常伺服器端的運算速度比本地電腦慢上好幾倍。

- 非同步請求 (Asynchronous request)：客戶端 (client) 對伺服器端 (server) 送出 request 之後，不需要等待結果，仍可以持續處理其他事情，甚至繼續送出其他 request。Responese 傳回之後，就被融合進當下頁面或應用中。

## 參考文件
1. jQuery: https://api.jquery.com/jquery.ajax/
2. ithome : https://ithelp.ithome.com.tw/articles/10226692
---

# 使用 VB Ajax
## Ajax 格式
我先設定vb ajax格式，前面設定ajax 都比較簡單，確定好後就開始我們的製作接收ajax吧!
```js
 $.ajax({
            url: "/Ajax/Example.aspx/ExampleAjax", //需要抓取的url 
            type: "POST",  //請求資料的方式(Ex:POST / GET / PUT...等)
            async: false, //非同步 。預設為true
            contentType: "application/json; charset=utf-8", // 要送到server的資料型態
            data:{},// 需要傳送給 Server 的內容
            success: function (res) {
                let json = $.parseJSON(res.d);
                console.log(json);
            }
        });
```

## 接收FUNCTION
我們來介紹我們的主軸 "WebMethod()"，VB設定AJAX需要注意不能漏掉 ```<System.Web.Services.WebMethod()>```，
放的位置就會是在FUNCTION上方，要告訴它FUNCTION要被使用AJAX傳輸的概念，如下方所示。
```vb
<System.Web.Services.WebMethod()>
Public Shared Function ExampleAjax() As String

End Function
```
這邊你會好奇說怎麼多了 "Shared"，使用ajax 必須要加上 Shared 關鍵詞，用義會像是 C# 的 static。
下方為官方解釋 。

{% note info flat %}
  ## 使用共用的時機
  共用類別或結構的成員可將其提供給每個實例，而 非共用，其中每個實例都會保留它自己的複本。 例如，如果變數的值適用于整個應用程式，共用就很有用。 如果您將該變數宣告為 Shared ，則所有的實例都會存取相同的儲存位置，而如果某個實例變更變數的值，則所有實例都會存取更新的值。

  ## 規則
  **宣告內容** : 您只能在模組層級使用 Shared。 這表示元素的宣告內容 Shared 必須是類別或結構，而且不能是原始程式檔、命名空間或程式。
  **結合的修飾詞** : 您無法 Shared 在相同的宣告中，搭配覆寫、可覆寫、 NotOverridable、 MustOverride或靜態來指定。
  **訪問** : 您可以使用類別或結構名稱來限定共用元素，而不是使用其類別或結構的特定實例的變數名稱來存取共用專案。 您甚至不需要建立類別或結構的實例，即可存取其共用成員。
{% endnote %}

這邊我就使用簡單的方式回傳給我們js，前置作業就這樣完成了。 
```vb
<System.Web.Services.WebMethod()>
Public Shared Function ExampleAjax() As String
    return "is dataType : Json"
End Function
```

## 結果
我們可以從 js ajax中 success 從res可以看到，有 d 的JSON在這裡範例我直接把d裡面的資料取出來就完成我的基本操作。
那你們會問如果要回傳值給Server如何使用? 那我們看下方範例。

範例我用Str包成 json回傳給 server接收值，再用剛才輸入來回傳回去。
```js
 $.ajax({
            url: "/Ajax/Example.aspx/ExampleAjax", //需要抓取的url 
            type: "POST",  //請求資料的方式(Ex:POST / GET / PUT...等)
            async: false, //非同步 。預設為true
            contentType: "application/json; charset=utf-8", // 要送到server的資料型態
            data:JSON.stringify({
                Str: Str,
            }),// 需要傳送給 Server 的內容
            success: function (res) {
                let json = $.parseJSON(res.d);
                console.log(json);
            }
        });
```
你們可以注意到 ajax注意的點，傳值名稱必須要一致，這裡就要注意有沒有Key錯變數名稱。
```vb
<System.Web.Services.WebMethod()>
Public Shared Function ExampleAjax(Str As String) As String
    return "is dataType : Json"
End Function
```

如果要用 Fetch 取得資料，答案是可以使用也歡迎大家也玩玩看ajax。 



