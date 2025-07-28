---
title: 【Windows】Terminal 加入 Copilot 功能
date: 2024-11-23 12:00:05
categories: 
  - 筆記 
description:
cover: /image/20241123_10-24-46.png
---

## 前言

近期回頭看 Gihub Copilot 功能有 windows Terminal 並非是在 Vscode 中使用，這邊紀錄一下 Terminal 有哪些功能。

## Terminal Canary

windows Terminal 已經釋出三種版本 (一般、Preview、 Canary) ，UI 也比以前的Terminal 大幅提升。 Terminal Canary 版本於 2023年時候有釋出，這版本是可以使用 Copilot / Azure AI / OpenAI 這三個功能。


### 一、安裝 [Terminal Canary](https://github.com/microsoft/terminal/discussions/16121)
- 相關連結 : [Terminal Canary](https://github.com/microsoft/terminal/discussions/16121)

下載連結在 Github 上，可以直接下載安裝。
![](/image/20241123_10-42-02.png)

#### 1-2 加入 Copilot 功能
請參考下方 GIF 步驟，可以看到如何加入 Copilot 功能。
![](/image/20241122-17-17-54.gif)

### 1-3 新增快捷鍵
為了增加活用度，我這邊取用跟 Vscode 一樣的快捷鍵 (ctrl + i)，可以參考下方步驟。
![](/image/20241123_10-48-53.png)


### 二、使用方式

#### 2-1 介面功能
chat ui 有兩個功能，筆者覺得他們 icon 做得不太好辨認，以下說明。
- clear history : 清除歷史紀錄 (使用時機當 ai 發生幻覺或是紀錄太多)
- export chat : 匯出對話紀錄 

![](/image/20241123_10-52-33.png)

**export chat 內容參考** 
```txt
User:
要怎樣使用這功能
Assistant:
您好！謝謝您的詢問。從您的訊息來看，您正在運行 PowerShehPwsh.exe shell。
如果您想要使用特定的功能，請告訴我您詳細需要的功能是什麼，我將很樂意協助您找出正確的指令。請提供更多關於您需求的資訊，我會盡力解答您的問題。
```

#### 2-2 自動帶入指令
terminal 最大特色就是當 copilot 有建議時，可以直接帶入指令，這樣可以省去輸入的動作，包含程式碼部分。但缺點就在於換行的部分，這部分 copilot 會有點問題。

![](/image/20241123_11-03-19.png)
![](/image/20241123_11-03-06.png)


#### 2-3 無法使用的 paste 
到目前為止常常使用 ctrl + v 來貼上，但是這個功能在 copilot 會有問題，這部分需要注意。只能在 chat ui 上面用滑鼠右鍵來貼上。



## 參考
- [Windows 終端機散發類型](https://learn.microsoft.com/zh-tw/windows/terminal/distributions)
- [GitHub Copilot in Windows Terminal](https://devblogs.microsoft.com/commandline/github-copilot-in-windows-terminal/)