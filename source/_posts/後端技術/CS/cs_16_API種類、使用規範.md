---
title: C# API (一)- API種類、特性規範
categories: 
  - 後端技術
  - C#
tags: 
  - C#
  - API
description:
keyword: 'C#, API'
cover: https://superhog-apim.developer.azure-api.net/content/926f6aaba773.png
---

相信很多人開發 API 有使用 RESTful API或是其他定義，很多設計模式可以提升撰寫的速度、閱讀。這章節會著重於介紹請各位參閱以下內容，

## API (application programming interface）
API 稱作為 "應用程式介面"，定義上是多個軟體中介互相回應(Response)、請求(Request)。如果要更詳細介紹請到下方連結點選

### 詳細介紹 :
- API 到底是什麼？ 用白話文帶你認識 by Frankie : [請點我](https://medium.com/codingbar/api-%E5%88%B0%E5%BA%95%E6%98%AF%E4%BB%80%E9%BA%BC-%E7%94%A8%E7%99%BD%E8%A9%B1%E6%96%87%E5%B8%B6%E4%BD%A0%E8%AA%8D%E8%AD%98-95f65a9cfc33)


## API 請求種類
API 從歷史到至今其實有很多使用方式，XML、JSON都是在傳輸過程中經常出現。
### REST (Representational State Transfer)
表現層狀態轉移, 英文 Representational State Transfer ，是近年來比較多人使用的一種，最常聽到 ```RESTful API```是同個網路架構風格。REST通常基於HTTP、URI、XML以及HTML這些現有的廣泛流行的協定和標準，他的資源是由URI來指定。

REST架構的限制條件
- 客戶-服務器（Client-Server）
- 無狀態（Stateless）
- 緩存（Cache）
- 統一接口（Uniform Interface）
  1. 請求中包含資源的 ID（Resource identification in requests）: 以資源為基礎 。每個資源都可以通過URI存取到。
  2. 資源通過標識來操作（Resource manipulation through representations）: 通過重表達的客戶端可以管理原資源
  3. 訊息的自我描述性（Self-descriptive messages）: 返回資訊足夠描述自己
  4. 用超媒體驅動應用狀態（Hypermedia as the engine of application state (HATEOAS)）:超媒體是應用狀態的引擎
- 分層系統（Layered System）
- 按需代碼（Code-On-Demand，可選）

方法
  - POST : 新增
  - GET : 讀取
  - PUT/PATCH : 更新
  - DELECT :刪除

其他方法
  - HEAD : 讀取。只回傳 HTTP header，不會回傳請求資源
  - CONNECT : HTTP/1.1協議中預留給能夠將連接改為管道方式的代理服務器
  - OPTIONS : 此方法可使服務器傳回該資源所支持的所有 HTTP 請求方法
  - TRACE : 回顯服務器收到的請求，主要用於測試或診斷


### RPC (Remote Procedure Call)
遠端程序呼叫, 英文 Remote Procedure Call。是一種伺服器-客戶端（Client/Server）模式，經典實現是一個通過傳送請求-接受回應進行資訊互動的系統。Web服務提供一個分布式函數或方法接口供用戶呼叫，客戶端通常是把方法名和引數傳遞給伺服器，然後伺服器返回JSON或XML。

RPC 規則中比較少，通常方法是用 ```Get```、```POST```處理、端點要包含被執行操作的名字。


### GraphQL
GraphQL 是一種API查詢語言，支援也包含資料讀取、寫入（操作）和資料變更，允許客戶端定義需要得到的資料結構 。

與REST和RPC不同，GraphQL API只需要一個端點；它也不需要使用不同的HTTP動詞，它只使用POST，你需要在JSON body裡面指定是要執行查詢還是修改。

引用[程式人生]。GraphQL有下面幾個優勢:
- 節省了多重的請求往返:GraphQL可以一次把所需的關聯資料全部查詢出來。不會存在例如N+1這樣的問題

- 避免了API版本問題:你可以隨時新增欄位和型別，不會影響現有的查詢。可以標記棄用。通過Log可以追蹤出哪些欄位被誰使用，如果欄位沒人再去使用，就可以移除它了。

- Payload比較小:REST和RPC的響應都包含客戶端傳送一些不需要的資料。而使用GraphQL的話，客戶端得到的響應就是它所請求的那些東西，不多不少。

- 強型別:GraphQL是強型別的，開發時有型別檢查能保證查詢的正確性和合理性。

- 內省(Introspection):像REST，就需要安裝Swagger等工具來幫助瀏覽API。而GraphQL本身就具備可發現性。它還帶有一個瀏覽器內的IDE用來瀏覽GraphQL API。下圖就是Github的GraphQL API：

缺點就是它為伺服器添加了許多複雜性，伺服器需要額外的工作來處理這些複雜的查詢。根據查詢內容的不同，效能也是一個變數.
 
## API 狀態規範
API 狀態碼是回應非常重要的一環。種類主要狀態以下 :
- 2xx = Success
- 3xx = Redirect
- 4xx = User error
- 5xx = Server error

參考文件 : [HTTP Status Codes](https://restfulapi.net/http-status-codes/)

## 文件參考
1. [RESTful API與MVC名詞介紹](https://ithelp.ithome.com.tw/articles/10191925)
2. [web API種類 常見形式 Web API 的簡單分類總結](https://www.796t.com/content/1542560017.html)
3. [wiki Web服務](https://zh.wikipedia.org/zh-tw/Web%E6%9C%8D%E5%8A%A1)
4. [API 是什麼? RESTful API 又是什麼?](https://medium.com/itsems-frontend/api-%E6%98%AF%E4%BB%80%E9%BA%BC-restful-api-%E5%8F%88%E6%98%AF%E4%BB%80%E9%BA%BC-a001a85ab638)
5. [RESTful Web API 設計](https://docs.microsoft.com/zh-tw/azure/architecture/best-practices/api-design)
6. [Web Oriented Architecture](https://www.ithome.com.tw/tech/41508)