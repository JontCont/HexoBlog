---
title: 【筆記】微軟開發者 -  Office 365 E5 無限續期方式
date: 2022-02-10 08:44:55
categories: 
  - 筆記 
  - 生活雜記
tags: 
  - office
description:
keyword: 'office, 微軟 '
cover: https://i0.wp.com/kkplay3c.net/wp-content/uploads/2020/02/microsoft-office-700x375.jpg
---
**備註: 目前微軟現階段是排隊狀況，需要等白名單(沙盒)可能要一段時間。**


# 前言
微軟已經提供很久讓開發者可以持續使用E5，相信很多人也有用過這個東西，後面發現Github AutApi 消失又再一次重複操作，這次會將重要操作列出。本篇文章提供下載點以及操作說明讓所有人可以快速創出自己的環境。


## 文件參考
1. [文件參考](https://www.jkg.tw/p3341/)
2. [Office 365 E5](https://www.microsoft.com/zh-tw/microsoft-365/enterprise/office-365-e5?activetab=pivot%3aoverviewtab)
3. [註冊Microsoft 365 E5 開發計劃](https://developer.microsoft.com/zh-cn/microsoft-365/dev-program)
4. [rclone工具](/upload/zip/rclone-v1.53.1-windows-amd64.zip)


# AutApi 設定
如果第一次使用或是想要看詳細內容可以到第一點選項點選。
本篇使用 [AutoApiSecret](https://github.com/huijiyun/AutoApiSecret)，相信很多人都有使用過這個Api，近期有發現以前的AutoApi被Github封鎖，之後發現這東西還存在，可以暫時先觀察狀況是否持續續期。

## [Azure](https://azure.microsoft.com/zh-tw/)
如果已經有註冊帳號可以直接按下 [Azure 入口](https://portal.azure.com/#home)

### 1. 請點選 [Azure Active Directory] > [應用程式註冊]
![](/img/Note/office/office_e5/02.png)
![](/img/Note/office/office_e5/03.png)

### 2. 設定註冊內容
- 名稱 : 設定自己想要的名稱
- 支援類型 : 任何組織目錄中的帳戶
- 重新導向 URI : web - http://localhost:53682/
![](/img/Note/office/office_e5/04.png)

### 3. 紀錄ID
務必要將 [應用程式 (用戶端) 識別碼] 存放記事本上面，等下會用到。
![](/img/Note/office/office_e5/05.png)

### 4. 點選[憑證與秘密] > [用戶端密碼] > [新增用戶端密碼]
新增完畢後即可複製[值]，這是你第二個ID 一樣請你複製到記事本上面。
![](/img/Note/office/office_e5/06.png)
![](/img/Note/office/office_e5/07.png)
![](/img/Note/office/office_e5/08.png)


### 5. 點選 [API權限] > [新增權限] > 完畢後按下[代表xxx授予管理員同意]按鈕
需要注意 : 這次我設定與舊版不同，只要新增以下選項即可。
```
Directory.ReadWrite.All
Files.ReadWrite.All
Mail.ReadWrite
MailboxSettings.ReadWrite
User.Read
User.ReadWrite.All
```
![](/img/Note/office/office_e5/09.png)
![](/img/Note/office/office_e5/10.png)


到這邊就完成了~! 之後可以準備使用 github 


## [AutoApiSecret](https://github.com/huijiyun/AutoApiSecret)
請各位自行按下 **Fork** 再進行下一步。
![](/img/Note/office/office_e5/01.png)

### 1. 創建 Personal access tokens
如果不知道如何創建可以參考 [使用 Github Token](https://jontcont.github.io/2022/03/21/Github_UseToken/)
![](/img/Note/office/office_e5/11.png)

設定方式也很簡單，只要按照圖片設定即可。完成後記得要複製自己的token。


### 2. 使用 [rclone工具](/upload/zip/rclone-v1.53.1-windows-amd64.zip)
使用方式是解完壓縮，用 [系統管理員身分執行] 打開 [命令字元] 到你接壓縮的路徑。指令如下 :
```cmd
./rclone.exe authorize "onedrive" "id1" "id2"
```
備註 
- id1 : 應用程式 (用戶端) 識別碼
- id2 : 憑證與秘密

完成後按下Enter ，會列出很多字串。字串立面是json 字串會比較長一點，請找到下方一樣的格式。
```
"refresh_token":"xxxxxxxxxxxxxxxxxxxxxxxx"
```
找到之後只要複製裡面的內容，上面範例則是用 ```xxxxxxxxxxxxxxxxxxxxxxxx```。


### 3. 修改 AutoApiSecret > 1.txt檔案
這邊是存放 [ refresh_token ] 把剛才複製貼上 1.txt上面。

![](/img/Note/office/office_e5/12.png)
![](/img/Note/office/office_e5/13.png)

### 4. 點選 Action 並按下 [Star]
按完 [Star] 記得要重新整理或是重新點選即可。Pin記得點選,主要原因是不知道何時AutoApiSeret會不會消失，建議還是開著鱉。
![](/img/Note/office/office_e5/14.png)
![](/img/Note/office/office_e5/15.png)


這邊需要留意，office E5 快到期時後才會通知，所以有空時候可以看一下Mail確保有沒有快失效。