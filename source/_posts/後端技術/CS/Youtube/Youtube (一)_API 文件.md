---
title: Youtube (一) - API 筆記 
date: 2022-01-01 00:00:00
categories: 
  - 後端技術
  - C#
  - Youtube
tags: 
  - C#
  - Youtube
  - API
description:
keyword: 'Form  , C#'
cover: https://www.youtube.com/s/desktop/82a4cf4f/img/favicon_144x144.png
# sticky: 1
---
(本篇為記錄使用)


## Youtube API 
由 [Google Cloud API](https://cloud.google.com/apis?hl=zh-tw) 提供API。Google Cloud API 有很多種類如( Vision API、Speech API、Translation API、Natural Language API、Video Intelligence API等)。

### API 種類 
- [Data API](https://developers.google.com/youtube/v3/getting-started)
- [Live Streaming API](https://developers.google.com/youtube/v3/live/getting-started)
- [Player API](https://developers.google.com/youtube/v3/live/getting-started)
- [Analytics/Reporting  API](https://developers.google.com/youtube/reporting)

### API 授權
- OAuth 2.0
- API keys


## OpenID Connect
是由OAuth 2.0用於身分驗證、授權。使用 OAuth 2.0 需要憑證(用戶端 ID 和用戶端密鑰)驗證使用者，授權後會有 【Access Token】、【ID Token】兩種Token 授權。

1. ID Token : 格式由 JWT 組成，可以透過 [JWT.IO](https://jwt.io/)解析。ID Token 會依據 API 授權種類決定會不會產生出 ID Token 。
2. Access Token : 作用是存取授權，必須要產生出這項Access Token 才能使用。

### Access Token 有效期
access_token 取決於授權時指定的scope的有效期，如果授權時指定多個scope，最終的access_token 的有效期取決於有效期最短的scope。

```
access_token 截止時間 =（授權時間點）+（授權後調用alipay.system.oauth.token 返回的expires_in）。
```

## 參考文件
- OpenID Connect : [https://developers.google.com/identity/openid-connect/openid-connect?hl=zh-cn](https://developers.google.com/identity/openid-connect/openid-connect?hl=zh-cn)
- OpenID Connect Core 1.0 incorporating errata set 1 : [https://openid.net/specs/openid-connect-core-1_0.html#ImplicitAuthRequest](https://openid.net/specs/openid-connect-core-1_0.html#ImplicitAuthRequest)
- '[料理佳餚]' 在 ASP.NET Core 整合 Google 做為網站的第三方登入: [https://dotblogs.com.tw/supershowwei/2022/11/10/integrate-google-login-in-asp-net-core](https://dotblogs.com.tw/supershowwei/2022/11/10/integrate-google-login-in-asp-net-core)

- Google API 是什麼？一次搞懂五種 Google API，聽說讀寫樣樣通！: [https://mile.cloud/zh/resources/blog/What-is-Google-API-one-time-to-know-five-types-of-Google-API_60](https://mile.cloud/zh/resources/blog/What-is-Google-API-one-time-to-know-five-types-of-Google-API_60)

- OAuth (6) access token & refresh token : [https://ithelp.ithome.com.tw/articles/10296956?sc=rss.qu](https://ithelp.ithome.com.tw/articles/10296956?sc=rss.qu)

