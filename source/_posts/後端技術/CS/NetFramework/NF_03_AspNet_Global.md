---
title: C# Asp.Net Global (1) -(筆記) Global.asax 事件方法清單
categories: 
  - 後端技術
  - C#
  - Global
tags: 
  - C#
  - VSC
description:
keyword: 'C#,Asp.Net,VSC,Global'
cover: /img/dotnet/bg/cs_bg_004.jpg
---

# 前言 
在沒有.net core 環境，asp.net 其實有個 Global.asax 檔案。這檔案具有繼承 ```HttpApplication```類，如果遇到controller 要統計、或是清除catch 從這邊排除是其中的選擇。

# Global.asax
Global.asax 位於應用程式根目錄下。ASP.NET 頁面框架能夠自動識別出對Global.asax 檔案所做的任何更改。在 Global.asax 被更改後ASP.NET 頁面框架會重新啟動應用程式，包括關閉所有的瀏覽器會話，去除所有狀態資訊，並重新啟動應用程式域。

## 提供事件
| 事件方法                                  | 事件說明                                                                    |
|---------------------------------------|-------------------------------------------------------------------------|
| Application_Init                      | 在應用程式被例項化或第一次被呼叫時，該事件被觸發。對於所有的HttpApplication 物件例項，它都會被呼叫。              |
| Application_Disposed                  | 在應用程式被銷燬之前觸發。這是清除以前所用資源的理想位置。                                           |
| Application_Error                     | 當應用程式中遇到一個未處理的異常時，該事件被觸發。                                               |
| Application_Start                     | 在HttpApplication 類的第一個例項被建立時，該事件被觸發。它允許你建立可以由所有HttpApplication 例項訪問的物件。 |
| Application_End                       | 在HttpApplication 類的最後一個例項被銷燬時，該事件被觸發。在一個應用程式的生命週期內它只被觸發一次。              |
| Application_BeginRequest              | 在接收到一個應用程式請求時觸發。對於一個請求來說，它是第一個被觸發的事件，請求一般是使用者輸入的一個頁面請求（URL）。            |
| Application_EndRequest                | 針對應用程式請求的最後一個事件。                                                        |
| Application_PreRequestHandlerExecute  | 在 ASP.NET 頁面框架開始執行諸如頁面或 Web 服務之類的事件處理程式之前，該事件被觸發。                       |
| Application_PostRequestHandlerExecute | 在 ASP.NET 頁面框架結束執行一個事件處理程式時，該事件被觸發。                                     |
| Applcation_PreSendRequestHeaders      | 在 ASP.NET 頁面框架傳送 HTTP 頭給請求客戶（瀏覽器）時，該事件被觸發。                              |
| Application_PreSendContent            | 在 ASP.NET 頁面框架傳送內容給請求客戶（瀏覽器）時，該事件被觸發。                                   |
| Application_AcquireRequestState       | 在 ASP.NET 頁面框架得到與當前請求相關的當前狀態（Session 狀態）時，該事件被觸發。                       |
| Application_ReleaseRequestState       | 在 ASP.NET 頁面框架執行完所有的事件處理程式時，該事件被觸發。這將導致所有的狀態模組儲存它們當前的狀態資料。              |
| Application_ResolveRequestCache       | 在 ASP.NET 頁面框架完成一個授權請求時，該事件被觸發。它允許快取模組從快取中為請求提供服務，從而繞過事件處理程式的執行。        |
| Application_UpdateRequestCache        | 在 ASP.NET 頁面框架完成事件處理程式的執行時，該事件被觸發，從而使快取模組儲存響應資料，以供響應後續的請求時使用。           |
| Application_AuthenticateRequest       | 在安全模組建立起當前使用者的有效的身份時，該事件被觸發。在這個時候，使用者的憑據將會被驗證。                          |
| Application_AuthorizeRequest          | 當安全模組確認一個使用者可以訪問資源之後，該事件被觸發。                                            |
| Session_Start                         | 在一個新使用者訪問應用程式 Web 站點時，該事件被觸發。                                           |
| Session_End                           | 在一個使+A1:B20用者的會話超時、結束或他們離開應用程式 Web 站點時，該事件被觸發。                          |


## 參考文件
- [[ASP.NET]Global.asax事件筆記_實際應用例子_停用 TLS 1.0_檔案上傳大小頁面跳轉_錯誤紀錄處理](https://coolmandiary.blogspot.com/2020/11/aspnetglobalasax.html)
- [Major Events in GLOBAL.ASAX file](https://www.c-sharpcorner.com/uploadfile/aa04e6/major-events-in-global-asax-file/)
- [ASP.NET Global.asax應用程式檔案簡介](https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/266541/)