---
title: (筆記) 命令提示字元 - netsh 顯示 wifi 資訊
categories: 
  - 筆記 / 生活雜記
tags: 
  - cmd
description:
keyword: 'cmd, 命令提示字元 '
cover: https://68.media.tumblr.com/tumblr_m1wjechWv01qekfnu.png
---

# 紀錄目的
cmd 指令有很多可以使用，通常太久沒使用會忘記如何使用，預防再次忘記會利用空檔紀錄如何使用。

wifi 部分通常很多人想要往回查wifi密碼或是忘記密碼可以使用netsh 查詢，相對這種查詢方式也要開始思考是否有沒有資安問題。


# 使用方式
步驟如下 :
1. 打開 cmd 或是 powershell 
2. 輸入 netsh 可以進入 netsh 輸入對話中。
3. 進入對話內使用 ```wlan show profiles```;如果沒有進入情況下使用 ```netsh wlan show profiles```
4. 上面結果可以查看已存檔的wifi名稱，選擇需要的wifi 複製。
5. 輸入方式 : ```wlan show profiles [wifi name]``` ，可以得知訊息內容。如果想要查詢密碼請輸入 ```wlan show profiles [wifi name] key=clear``` 就會出現wifi密碼。


