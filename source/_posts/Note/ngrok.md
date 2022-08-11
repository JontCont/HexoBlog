---
title: ngrok - http 轉換 https 神器 
categories: 
  - other
tags: 
  - ngrok
description:
cover: https://miro.medium.com/max/554/1*sQhD5gYF74FvBF8aoWf8cw.png
---

相信不少有製作專案時候，面臨不少有管https的問題 ，例如 Line Bot (message api)、影像識別等。必需要https 才能使用，ngrok會將成為專案救星。

如果是使用 windows 以外系統，建議配合其他資料參考。

# [ngrok](https://ngrok.com/)
mgrok 是一個可以將內網伺服器與對外伺服器溝通的服務。即使使用 dotnet run 、debug 產出來也是可以使用。

## 安裝
註冊部分請各位自行去註冊。

進入ngrok網站後，會需要進行安裝的動作，點擊[ngrok.exe](https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-windows-amd64.zip)即可。

存放位置沒有特別限制，這邊我存放路徑為 ```C:\Windows\System32``` 給各位參考。
![](/img/ngrok/IIS/Snipaste_2022-08-11_21-01-27.png)

接下來要加入 authtoken 這邊需要複製網站上提供的指令並貼在command 裡面。
```cmd
ngrok config add-authtoken xxxxxxx
```
![](/img/Note/ngrok/Snipaste_2022-08-11_21-24-50.png)

完成後，可以輸入```ngrok help ```先看看指令。官方網所提供如果要開啟 port 80 必須要輸入```ngrok http 80```。


## 執行
ngrok其實有三種種做法。
1. 單一開啟
2. 多個開啟
3. 全部開啟

依據專案開放測試，可能遇到串接問題需要兩個https 同時存在就會需要開啟多個port來解決現況。

## 多個開啟 (.yml)
加入憑證時候，其實可以看到已經有加入yml檔案，也就是設定檔案。設定部分需要透過```C:\Users\user\AppData\Local\ngrok```當中```ngrok.yml``設定。

預設通常會看到憑證、版本，接下來再輸入我們要哪些Port以及名稱。下方範例加入兩個port 以及 名稱，這樣設定部分就已經完成了。
```yml
version: "2"
authtoken: xxxxxxxxx
tunnels:
  LineBot:
    addr: 8000
    proto: http
    host_header: Localhost

  LineAPI:
    addr: 8100
    proto: http
    host_header: Localhost
```

設定完畢後，輸入指定名稱開起來即可，使用上也相當簡單許多。
```cmd
ngrok start LineBot LineAPI
```

## 全部開啟
使用方式如同多個開啟一樣，必須要先設定yml 這個指令才會生效。
```cmd
ngrok start --all
```


## 單一開啟
單一開啟有兩種做法，yml設定檔中的名稱以及指定port名稱。

```cmd
ngrok start LineBot 

```

```cmd
ngrok http 7777
```


