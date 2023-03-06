---
title: API - Web Service 與 Web API
categories: 
  - 後端技術
  - API
tags: 
  - 後端技術
  - API
  - Web Service
  - Web API
description:
keyword: 'Net FrameWork, C# , Core'
cover: /image/20230305_10-16-07.png
# sticky: 1
---

# Web Service
Web Service 是一種基於 Web 技術的軟體系統，可以讓不同的應用程式之間進行互操作。Web Service 使用標準化的 XML 消息進行通訊，並支援跨平台的互操作性。它可以通過 HTTP、SMTP 或其他通訊協定來提供網路服務。Web Service 通常使用 SOAP 協議來處理請求和回應。最初是為了解決企業應用系統的互操作性問題而出現的，通常使用 XML 或 JSON 編碼進行消息的傳輸。Web Service 通常包含一組 WSDL（Web Services Description Language）文件，這個文件定義了 Web Service 所支持的方法、引數、傳輸協議等細節。

Web Service 是一個通用的、標準化的、可互操作的應用程式介面，可以讓不同的應用程式互相溝通。它主要使用 SOAP 協議進行消息傳輸，並且通常包含一組 WSDL 文件。Web Service 的優點是可靠性高、安全性好、支持跨平台等，缺點是效率較低。

Web Service 可以被用於不同的場合，例如：
1. 集成不同平台的系統：Web Service 可以讓不同平台的系統進行互操作，透過 Web Service，企業可以更輕鬆地集成他們的內部系統和外部系統。

2. 組件化的設計：Web Service 可以幫助開發者設計組件化的系統，透過 Web Service，開發者可以將系統分解成多個小的模組，每個模組可以透過 Web Service 進行通訊和交互。

3. 分布式的應用程式：Web Service 可以讓分布式的應用程式進行互操作，透過 Web Service，開發者可以輕鬆地實現分布式的應用程式。

## 優勢
- 廣泛適用於各種平台、語言，如 Java、PHP、C#等。
- 可以使用 SOAP 協定進行通訊，保證資料安全性。
- 有豐富的開發工具和支援。
## 劣勢
- 效能較差，因為要使用 SOAP 協定進行通訊，需編解碼、加解密等多個步驟，增加了傳輸時間和資源消耗。
- 程式碼較為複雜，開發維護成本高。


# Web API
Web API是一個基於HTTP協議的Web服務，可以用於向應用程序或客戶端提供數據。

Web API可以返回多種格式的數據，如XML、JSON等，這使得Web API可以與不同的應用程序和客戶端進行交互。與Web服務不同，Web API主要基於HTTP協議進行操作，使用輕量級的JSON格式進行數據交換，因此其效率較高，且更易於維護和開發。

Web API的優點包括：
1. 輕量級：Web API使用輕量級的JSON數據格式，並且基於HTTP協議，因此效率較高。
2. 易於維護和開發：Web API可以與不同的應用程序和客戶端進行交互，且具有良好的可擴展性和易於維護性。
3. 支持多種數據格式：Web API可以返回多種格式的數據，如XML、JSON等，且支持自定義數據格式。
4. 安全性高：Web API支持OAuth等安全協議，保護數據的安全性。

## 優勢
- 可以使用多種通訊協定，如 RESTful、HTTP等，效能較好，因為不需要進行編解碼、加解密等多個步驟。
- 開發維護成本相對較低，因為程式碼簡單，易於開發和維護。
- 與前端的整合更緊密，開發過程中更易於測試和調試。

## 劣勢
- 無法保證資料安全性，需要透過其他方式來進行安全保護。
- 對於非 HTTP 協定的支援較差。

{% blockquote %}
**資訊: 傳輸的資料可能會被竊聽或篡改** 
以下是一些常見的保護方式：
1. HTTPS：使用 SSL/TLS 進行加密通訊，確保數據在傳輸過程中不被竊聽或篡改。
2. 身分驗證：對 API 請求進行身分驗證，確保只有經過驗證的用戶才能訪問敏感資料。
3. 授權：對不同的用戶或角色授權不同的權限，確保只有擁有權限的用戶才能訪問對應的資料。
4. 防火牆：限制來自不信任網路的請求，防止未經授權的訪問和攻擊。
透過這些方式，可以提高 Web API 的安全性，保護資料不被未授權的用戶訪問。
{% endblockquote %}

---
## Web Service及 Web API 不同處
1. 傳輸方式
   - Web Service 使用 SOAP 協議
   - Web API 使用 HTTP 協議 ，設計架構通常由 REST 為主。
2. 開發方式
   - Web Service 需要使用 WSDL（Web Services Description Language）文件定義服務的範圍、端點等等。
   - Web API 可以使用 ASP.NET、Node.js、Ruby on Rails 等框架來開發，並且更加簡單易用。
3. 安全性
   - Web Service 支援多種安全性標準，例如 WS-Security 和 SAML。
   - Web API 則加強調基於 HTTPS 的安全性。

## 參考資料
1. [Web Service及 Web API 有何不同?](https://cychen59.blogspot.com/2019/06/web-service-web-api.html)