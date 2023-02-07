---
title: C# 表單驗證 - FormsAuthentication 驗證自動登入
categories: 
  - 後端技術
  - C#
tags: 
  - C#
  - Form
description:
keyword: 'Form  , C#'
cover: /image/20230207_22-54-41.png
# sticky: 1
---
## 前言
最近需要開始撰寫 ASP.Net MVC，目前遇到Form驗證實例會有自動驗證登入，藉由這次機會來展現身手。


# FormsAuthenticationTicket 
功能主要紀錄使用者資訊，他會有一組Cookies暫存，內部值會經過加密編碼、解密。
如果第一次使用這個功能，千萬記住不要嘗試把密碼填入當中。

使用方式從 Client 點入登入網頁，這時Controllers可以進行驗證判斷，若有取得ticket成功會轉到首頁或是會員頁面;若驗證失敗則重新登入。

## Authorize 身分驗證
確保不讓外界隨意登入，需要再 Controllers上方輸入 Authorize，如果沒有登入成功會有訊息提示。

```cs
 namespace ExampleForm.Controllers
{
    [Authorize()]
    public class MainController : Controller
    {
        return View();
    }
}
```

## WebConfig 設定
這邊需要加入錯誤導向頁面設定。
```config
<system.web>
    <authentication mode="Forms">
        <forms name="Demo_Site" loginUrl="Login/Index" cookieless="UseCookies" timeout="2880"/>
    </authentication>
</system.web>
```

## FormsAuthenticationTicket
假設Login進去的時候，我會用下方方式存取一遍。UserData 則為存取相關資訊，例如 : email、電話等，通常存放不太重要的資料。
```cs
    private void Set_FormAuthenticationUser()
    {
        //登入成功 轉頁
        FormsAuthenticationTicket  ticket = new FormsAuthenticationTicket(
        version: 1,
        name: pUsrCode.ToString(), //可以放使用者Id
        issueDate: DateTime.UtcNow,//現在UTC時間
        expiration: DateTime.UtcNow.AddMinutes(30),//Cookie有效時間=現在時間往後+30分鐘
        isPersistent: true,// 是否要記住我 true or false
        userData: "", //存放資訊
        cookiePath: FormsAuthentication.FormsCookiePath);

        var encryptedTicket = FormsAuthentication.Encrypt(ticket); //把驗證的表單加密
        var cookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);
        Response.Cookies.Add(cookie);
        Response.Cookies.Add(new HttpCookie("usr_code", pUsrCode));

        //會直接影響 userData 值
        //FormsAuthentication.RedirectFromLoginPage(pUsrCode, false);
    }
```

## 驗證 (Reload Page)
減少登入次數，大多都會有記憶天數(7天、14天)，下方直接展示使用方式。
[Demo_Site] 是指Config設定，form標示的名稱。

這function使用概念，驗證是否有這角色，如果各位 FormsAuthenticationTicket 的 Name 用 UID 處理可以不用轉Json方式取得資料。

```cs
    private bool IsFormAuthrizeUser()
    {
        bool isFormAuthrizeUser = false;
        //搜尋是否有 Demo_Site
        if (Request.Cookies.AllKeys.Where(x => x == "Demo_Site").Any())
        {
            //解碼(方便確認資料、資訊)
            var decr = FormsAuthentication.Decrypt(Request.Cookies["Demo_Site"].Value);
            //轉成 json 依據需求
            string json = decr.UserData;
            if (!string.IsNullOrEmpty(json))
            {
                //轉成DataTable
                DataTable resultData = JsonConvert.DeserializeObject<DataTable>($"[{json}]");
                Set_UserBasic();
                isFormAuthrizeUser = true;
            }
        }
        return isFormAuthrizeUser;
    }

```

## 登出 (Log Out)
登出相對簡單，只需要使用``` FormsAuthentication.SignOut()``` 。提醒 : 記得要回到Login頁面喔~!

```cs
    public ActionResult Index(){
        FormsAuthentication.SignOut();
        return Redirect("/Login");
    }
```

# 參考文件
1. [ASP.NET MVC FormsAuthenticationTicket 驗證](http://yu0410aries.blogspot.com/2018/03/formsauthenticationticket.html)
1. [UserData property of FormsAuthenticationTicket is empty despite being set](https://stackoverflow.com/questions/16594905/userdata-property-of-formsauthenticationticket-is-empty-despite-being-set)
