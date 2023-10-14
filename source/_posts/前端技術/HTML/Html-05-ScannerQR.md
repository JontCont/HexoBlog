---
title: 【HTML】製作 Scanner (一) - 把手機轉換電腦攝影機
date: 2022-12-28 11:00:59
categories: 
  - 前端技術
  - html
tags: 
  - front-end
  - 前端
cover: /image/20221228_22-45-03.png
---

近期 "電腦攝影機" 可是說需要與人視訊時候最重要的設備，對於我來說這東西可能是不常使用的消耗品，本次案例使用手機轉到電腦設備把它當作我們本次作品。
本次工具 "Dev47Apps" 作為 手機與電腦溝通App，也可以套用 OBS 相當方便。

## 前置作業
1. Dev47Apps
2. 準備QR Code

## 安裝方式 Dev47Apps
### Dev47Apps
下載網址 : https://www.dev47apps.com/
下載方式必須要 App與pc都需要安裝才能完成下一個步驟，安裝步驟請自行處理不另外操作。

### 連線方式
使用步驟如下
1. 打開Android "DroidCamApp"
2. 打開 PC "DroidCamApp.exe" 
3. Pc "DroidCamApp"裡面輸入 Android 顯示的 "Wifi ip" 或是 "drive ip" 即可完成 
![](/image/20221225_11-00-59.png)
![](/image/20221225_11-02-47.png)

### 完成
完成後，會變成如下面圖片一樣，如果想要變成直播工作也是不成問題，使用下來非常省成本。
![](/image/20221225_11-25-40.png)
![](/image/20221225_11-29-27.png)

 
## jquery-qrcode
既然完成後，緊接著製作 "QR Code" 玩玩看，若覺得麻煩可以跳過這篇 (本文目的模擬與各家收營刷讀條碼機)。
- jquery-qrcode 參考文件 : https://ithelp.ithome.com.tw/articles/10185571
- Github : [https://github.com/jeromeetienne/jquery-qrcode](https://github.com/jeromeetienne/jquery-qrcode)

### 安裝方式
```cmd
npm i jquery
npm i jquery.qrcode
```

## 使用方式
### 一 、 加入 div標籤
```html
<div class="qrcode"></div>
```
### 二、加入 Js 
```js
  $('.qrcode').qrcode({
      text	: "jqury qrcode"
  });	
```
備註 : 
1. 如果是單文字 可以使用 ```$('.qrcode').qrcode('123');```
2. 舊版瀏覽器需求可以使用 ``` render: table``` 參數
3. 大小設定可以使用 ```width```、```height```修飾
4. 以下參數
|    名稱     |      說明     |
| ----------- | ------------ |
| render			| html 標籤轉換，預設 "canvas"       |
| width       | 寬度         |
| height      | 高度         |
| background  | 背景顏色      |
| foreground  | Qrocode 顏色 |
| correctLevel| 尺寸 ，預設 "QRErrorCorrectLevel.H," |


### 三、Source Code
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="/node_modules/jquery/dist/jquery.min.js"></script>
    <script src="/node_modules/jquery.qrcode/src/jquery.qrcode.js"></script>
    <script src="/node_modules/jquery.qrcode/src/qrcode.js"></script>
    <title>QrCode - for jquery qrcode</title>
</head>
<body>
    <div class="qrcode"></div>
    <script>
        $('.qrcode').qrcode({
            text	: "jqury qrcode"
        });	
    </script>
</body>
</html>
```