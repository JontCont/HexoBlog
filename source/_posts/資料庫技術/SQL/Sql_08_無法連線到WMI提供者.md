---
title: Sql Server - 無法連線到 WMI 提供者
date: 2021-08-08 22:45:32
categories:
  - 資料庫技術
  - MS SQL
tags: 
  - SQL
keyword: 'SQL'
cover: /img/SQL/bg/bg_01.png
---
## 前言
近期處理SQL需要開放TCP，結過遇到打開 ```sql configuration manager``` 是完全打不開的狀態，讓我非常的錯愕。

{% blockquote %}
錯誤訊息:無法連線到 WMI 提供者。您沒有權限，或無法連上伺服器。請注意，您只能使用SQL Server組態管理員來管理SQL Server 2005 (含)以後版本的伺服器。命名空間無效[0x8004100e]
{% endblockquote %}

遇到問題可能是有兩個版本造成打開組態管理員造成的錯誤，目前微軟解釋處理方式到目前還是豈不了作用，因此使用幾個步驟來排除這問題。


## 一、 找到 SQL Server 資料夾
目標位置 : ``` C:\Program Files (x86)\Microsoft SQL Server\ ```
解決方式會是如果你是使用最新的SSMS目前版本 ```15.0.18384.0```請選擇 ```150```資料夾並移動至```C:\Program Files (x86)\Microsoft SQL Server\150\Shared\sqlmgmproviderxpsp2up.mof```。


## 二、 Terminal 指令
```cmd
mofcomp "C:\Program Files (x86)\Microsoft SQL Server\150\Shared\sqlmgmproviderxpsp2up.mof"
```
這邊指令一定要開啟 *系統管理員身分* 才能有效開啟這功能。目前解決後就可以順利打開 ```sql configuration manager``` 😂😂😂。

## 三、 參考文件
1. 無法連線到 WMI 提供者。您沒有權限，或無法連上伺服器 : [https://dotblogs.com.tw/lanlith/2020/06/21/121250](https://dotblogs.com.tw/lanlith/2020/06/21/121250)
2. Microsoft 當您在 SQL Server 中開啟SQL Server 組態管理員時發生錯誤訊息 : [https://docs.microsoft.com/zh-TW/troubleshoot/sql/tools/error-message-when-you-open-configuration-manager](https://docs.microsoft.com/zh-TW/troubleshoot/sql/tools/error-message-when-you-open-configuration-manager)