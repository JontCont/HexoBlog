---
title: VS-離線版解決方案
categories: 
  - 筆記 
  - 生活雜記
tags: 
  - vsc
  - Chocolatey
  - mkcert
cover: /image/20230901_23-15-10.png
---
## 備註 
這問題以前紀錄過，因為壓縮檔其實是自己登入過的電腦取出來的，文章內壓縮檔就是 ```C:\Users\Users\AppData\Local\Microsoft\VSCommon``` 資料夾，將版本以及OnlineLicensing都要複製過去，就可以使用了。

![](/image/20230901_23-15-10.png)

## 解決說明
VS 2019 comunity是免費的，但是需要登錄微軟帳戶，不登錄只能使用30天，30天之後就無法使用了，如下圖：
![](/image/20230901_23-00-30.png)


### 操作清單
使用前，可以使用下方壓縮檔，完成此作業。
1. 下載註冊碼
2. 複製註冊碼檔案到~\AppData\Local\Microsoft\VSCommon
3. 打開登入註冊編輯程式尋找以下路徑HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\VisualStudio
4. 找到VisualStudio_(隨機碼) 
5. 更改隨機碼

### 使用步驟
#### 1. 確認檔案
找到註冊檔，路徑：
```C:\Users\{系統登錄使用者}\AppData\Local\Microsoft\VSCommon```

#### 2. 複製檔案到該路徑
將兩個資料夾複製到需要註冊的電腦上，路徑： ```C:\Users\{系統登錄使用者}\AppData\Local\Microsoft\VSCommon```
![](/image/20230901_23-04-35.png)


#### 3.查看VS2019 Community 的註冊表項
路徑: ```HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\VisualStudio```

#### 4. 找VisualStudio_(隨機碼) 
在該註冊表的下方有一個或多個類似於 VisualStudio_de1f9721 的註冊表項

#### 5. 複製隨機碼
找到社區版的註冊表項，複製隨機碼，我這裡是“de1f9721”，如下圖：

#### 6. 打開資料夾  
打開資料夾 ```C:\Users\{系統登錄使用者}\AppData\Local\Microsoft\VSCommon\OnlineLicensing\VisualStudio\16.0\Community```


#### 7. 更改隨機碼
將裡面僅有的一個資料夾名稱（我的是“938c060f”）改為上面的隨機碼，如下圖：
![](/image/20230901_23-06-55.png)


### 完成後
完成後就可以繼續使用此VS功能。
![](/image/20230901_23-07-15.png)