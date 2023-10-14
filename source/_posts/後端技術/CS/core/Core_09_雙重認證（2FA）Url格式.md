---
title: C# - 雙重認證（2FA）Url 格式
date: 2023-08-31 22:23:40
categories: 
  - 後端技術
  - C#
tags: 
  - Core
  - C#
  - 2FA
keyword: 'Core, 2FA , C#'
cover: /image/20230831_22-23-40.png
---
## 2FA 雙重驗證 URL格式
2FA URL 格式如下方。透由 Scheme、Type、Label、Parameters 組成。

```cmd
otpauth://TYPE/LABEL?PARAMETERS
```

### 一、Scheme
otpauth 期初由Google提出，用於將帳號與雙重驗證綁定，大多驗證格式都會用optauth，例如Google、Microsoft 等等。

### 二、Type
Type 代表驗證類型，目前有兩種驗證類型，分別為 HOTP 與 TOTP。

#### HOTP

HOTP 是基於 HMAC-based One-Time Password Algorithm，是一種基於 HMAC 的一次性密碼演算法，主要是透過一個密鑰與計數器產生一個一次性密碼，並且透過驗證計數器是否一致來驗證是否正確。
![](/image/20230901_22-56-41.png)

> 參考文件 -> [基於雜湊訊息驗證碼的一次性密碼演算法](https://zh.wikipedia.org/wiki/%E5%9F%BA%E4%BA%8E%E6%95%A3%E5%88%97%E6%B6%88%E6%81%AF%E9%AA%8C%E8%AF%81%E7%A0%81%E7%9A%84%E4%B8%80%E6%AC%A1%E6%80%A7%E5%AF%86%E7%A0%81%E7%AE%97%E6%B3%95)
#### TOTP

TOTP 是基於 Time-based One-Time Password Algorithm，是一種基於時間的一次性密碼演算法，主要是透過一個密鑰與時間產生一個一次性密碼，並且透過驗證時間是否一致來驗證是否正確。
![](/image/20230901_22-55-57.png)

> 參考文件 -> [基於時間的一次性密碼演算法](https://zh.wikipedia.org/wiki/%E5%9F%BA%E4%BA%8E%E6%97%B6%E9%97%B4%E7%9A%84%E4%B8%80%E6%AC%A1%E6%80%A7%E5%AF%86%E7%A0%81%E7%AE%97%E6%B3%95)

### 三、Label
Label 代表帳號，通常是使用者帳號，例如電子郵件、帳號等等。

### 四、Parameters
Parameters 代表參數，主要是透過參數來設定驗證相關資訊，例如密鑰、驗證次數、驗證時間等等。

#### 1. Secret
Secret 代表密鑰，主要是透過密鑰來產生一次性密碼。

#### 2. Counter
Counter 代表驗證次數，主要是透過驗證次數來產生一次性密碼。

#### 3. Period
Period 代表驗證時間，主要是透過驗證時間來產生一次性密碼。

#### 4. Algorithm
Algorithm 代表演算法，主要是透過演算法來產生一次性密碼，目前有兩種演算法，分別為 SHA1 與 SHA256。

#### 5. Digits
Digits 代表驗證碼位數，主要是透過驗證碼位數來產生一次性密碼，目前有兩種驗證碼位數，分別為 6 位數與 8 位數。

### 6. Issuer
Issuer 代表發行者，主要是透過發行者來產生一次性密碼。

## 實作

### NuGet 安裝

```cmd
Install-Package OtpNet
```

### 實作程式碼

```csharp
using System;
using System.Text;
using OtpNet;

namespace ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            // 產生密鑰
            var secretKey = KeyGeneration.GenerateRandomKey(20);
            // 產生驗證碼
            var totp = new Totp(secretKey);
            // 產生驗證碼
            var code = totp.ComputeTotp(DateTime.UtcNow);
            // 產生驗證碼 Url
            var url = KeyUrl.GetTotpUrl(secretKey, "account", "issuer", 6, OtpHashMode.Sha1);
            Console.WriteLine($"secretKey: {Encoding.UTF8.GetString(secretKey)}");

            Console.WriteLine($"code: {code}");

            Console.WriteLine($"url: {url}");

            Console.ReadLine();
        }
    }
}
```

## 參考文件

- [URI string format](https://docs.yubico.com/yesdk/users-manual/application-oath/uri-string-format.html)
