---
title: C# Asp.Net Global (2) - 使用 Global.asax 清除 cache 以及 controller 管控
date: 2021-09-01 23:15:10
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
配合上一張function 清單，可以得知很多 Global 能用的事件方法，這篇排除cache 問題以及好用的方法。

# Global.asax
## 提供事件
筆者留事件function給各位讀者們參閱，請配合這個表格。

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



## 清除 cache
要清除每一個 Action 最快方式從 Application_AcquireRequestState 加入設定檔案，發生 cache 最可怕是登入後上一頁可以看到原有的模樣，排除cache可以參考下方寫法:
```cs

protected void Application_AcquireRequestState(object sender, EventArgs e)
{
    //取消Cache
    httpContext.Response.Cache.SetCacheability(HttpCacheability.NoCache);
    httpContext.Response.Cache.AppendCacheExtension("no-store, must-revalidate");
}
``` 

## controller 管控
從上方案例可以得知，每一個action 都會有成功清除cache ，如果再延伸應用就會像是 controller管控。

控管方式相對簡單，每一隻帳號都會有特定功能權限，選擇能前往的pages 當如果有人強行載入pages 就會需要把他導回~正途(誤)~。
導回方式
- 錯誤訊息
- 固定首頁
- 提示視窗

下方提供參考寫法，請各位自行參閱:
```cs

protected void Application_AcquireRequestState(object sender, EventArgs e){
    var httpContext = ((MvcApplication)sender).Context;

    //取得Route資訊
    var currentRouteData = RouteTable.Routes.GetRouteData(new HttpContextWrapper(httpContext));//目的: httpContext 轉換到 HttpContextBase 

    //檢查身分
    string currentController = Get_ControllerOrActionName(currentRouteData, "Controller"); //存放 controller 內容
    string currentAction = Get_ControllerOrActionName(currentRouteData, "Action"); ; //存放 action 內容
    
    /*----- 處理判斷向下 ------*/
    /*----- 處理判斷向上 ------*/

    if (currentController == "Home" && currentAction=="Index" )
    {
        var routeData = new RouteData();
        routeData.Values["exception"] = null;
        routeData.Values["controller"] = "Error";
        routeData.Values["action"] = "LoginNotFound";

        httpContext.ClearError();
        httpContext.Response.Clear();

        //取得errorController
        IController errormanagerController = new ErrorController();
        HttpContextWrapper wrapper = new HttpContextWrapper(httpContext);
        var rc = new RequestContext(wrapper, routeData);
        errormanagerController.Execute(rc);
        return;
    }
}


private string Get_ControllerOrActionName(RouteData routeData, string getName)
{
    string resultName = "";
    //暫存
    if (routeData != null)
    {

        switch (getName)
        {
            case "Action":

                resultName = (routeData.Values["action"] != null && !String.IsNullOrEmpty(routeData.Values["action"].ToString()))
                        ? routeData.Values["action"].ToString()
                        : "";
                break;

            case "Controller":

                resultName = (routeData.Values["controller"] != null && !String.IsNullOrEmpty(routeData.Values["controller"].ToString()))
                        ? routeData.Values["controller"].ToString()
                        : "";
                break;

        }
    }
    return resultName;
}//Get_ControllerOrActionName
```
## controller 管控注意事項
這並非萬能的功能，這function會連ajax 抓取都會抓上來，如果太頻繁呼叫也會對這段不太友善，解決方式有兩種 
1. 使用 attribute
2. 排除指定controller ajax

題外話: 很多時候ajax 自訂出 controller 需要自己歸納、編輯，但是這個功能會發現很多自定義的controller 無法掌控直接造成功能執行效果，


## 參考文件
- [[ASP.NET]Global.asax事件筆記_實際應用例子_停用 TLS 1.0_檔案上傳大小頁面跳轉_錯誤紀錄處理](https://coolmandiary.blogspot.com/2020/11/aspnetglobalasax.html)
- [Major Events in GLOBAL.ASAX file](https://www.c-sharpcorner.com/uploadfile/aa04e6/major-events-in-global-asax-file/)
- [ASP.NET Global.asax應用程式檔案簡介](https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/266541/)