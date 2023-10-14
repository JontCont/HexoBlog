---
title: 【IIS】應用程式集區的進階設定的CPU限制
date: 2023-05-15 21:00:05
categories: 
  - 筆記 
  - 生活雜記
description:
keyword: 'C#'
cover: /image/20230515_21-58-41.png
---


## 前言

引用 " 
🐰 IIS 應用程式集區的 進階設定 的CPU限制(% 的 1/1000), 只能用 50% 的 CPU，要怎麼設?

您可以透過以下步驟設定 IIS 應用程式集區的 CPU 限制：

1. 打開 IIS 管理員。
2. 選擇您要設定的應用程式集區。
3. 在右側窗格中，點擊「進階設定」。
4. 找到「CPU 限制(% 的 1/1000)」的設定，並將值設為 50000。這表示該應用程式集區只能使用 50% 的 CPU。
5. 點擊「確定」以保存設定。

完成上述步驟後，IIS 應用程式集區將會在運行時限制 CPU 使用率，並避免使用過多的系統資源。請注意，這個設定僅能控制單一應用程式集區的 CPU 使用率，若需要限制整個伺服器的 CPU 使用率，您可能需要考慮其他方式，例如透過作業系統的工具進行設定。
"
### IIS 程式集 
程式集的主要作用是提供一個強大的網頁伺服器平台，用於建立、部署和管理各種網站和應用程式
![](/image/2023-05-15-21-00-05.png)

---

## 查看"正在執行的要求列表"
![](/image/2023-05-15-21-16-29.png)
下圖因為只有短暫開啟網頁，沒使用對外開放表面會看不出來是否有直接關係。若檔案本身有特別處理就會有明顯的效果。
![](/image/2023-05-15-21-17-08.png)

## w3wp.exe 工作程序
運行於 Microsoft Internet Information Services (IIS) 的工作程序 (Worker Process)。在 IIS 中，w3wp.exe 負責處理接收到的 HTTP 請求並執行相應的網站應用程式。

通常這東西會常遇到多的 w3wp.exe 問題，主要由程式集的多寡會呈現多個w3wp.exe問題。
引用　＂
The problem is that when it comes to w3wp.exe processes for the diagram above, there are three of them and just by looking in the task manager there is no easy way to tell them apart. Each instance of a w3wp.exe process has a PID (short for process identifier), but the question is which PID belongs to which application pool.
＂
![](/image/20230515_21-58-41.png)

### 解決方式
IIS 6.0 使用方式
- Start > Run > Cmd
- Go To Windows > System32
- Run cscript iisapp.vbs
- You will get the list of Running Worker ProcessID and the Application Pool Name.
![](/image/20230515_22-02-27.png)

IIS 7.0 使用方式
- Start > Run > Cmd
- Go To Windows > System32 > Inetsrv
- Run appcmd list wp
![](/image/20230515_22-02-40.png)

## 參考 
- [限制 IIS Process 的 CPU 使用量](https://blog.uwinfo.com.tw/auth/article/bike/485)
- [如何檢視 IIS7 各工作者處理序正在執行的要求列表](https://blog.miniasp.com/post/2010/02/12/IIS7-View-Currently-Executing-Requests-in-a-Worker-Process)
- [怎麼找出進程中的w3wp.exe對應哪個IIS網站 Which w3wp.exe PID corresponds to which application pool ?](https://kenneth2011.pixnet.net/blog/post/110253254)
- [How to get a list of all the ASP.NET running worker process and its associated application pools?](https://stackoverflow.com/questions/5490773/how-to-get-a-list-of-all-the-asp-net-running-worker-process-and-its-associated-a)