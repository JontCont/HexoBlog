---
title: 【工具】沉浸式翻譯-網頁翻譯擴充 - 使用 xAI
date: 2024-11-24 23:00:05
categories: 
  - 筆記 
description:
cover: /image/20241125_10-50-07.png
---

## 前言
於幾周前 will 保哥推薦一個 xAI 來翻譯網頁，而且一個月有 25美元免費額度。Felo 提供的 Glarity 無法使用xAI來翻譯，因此特別紀錄操作方式。


## xAI 簡介
xAI 是由 twitter (X Corp) 提供AI服務給使用者使用，模組目前只有支援 grok-beta、grok-vision-beta。(目前翻譯模型效果比其他模型好很多)
![](/image/20241124_22-47-22.png)


### 安裝擴充以及 AI Key 
1. 安裝擴充
    - 進入 Chrome Web Store 搜尋 `沉浸式翻譯-網頁翻譯擴充` 並安裝
    - 安裝完成後會出現一個小圖示在右上角

- 擴充連結 : [https://chromewebstore.google.com/detail/%E6%B2%89%E6%B5%B8%E5%BC%8F%E7%BF%BB%E8%AD%AF-%E7%B6%B2%E9%A0%81%E7%BF%BB%E8%AD%AF%E6%93%B4%E5%85%85-pdf%E7%BF%BB%E8%AD%AF-%E5%85%8D%E8%B2%BB/bpoadfkcbjbfhfodiogcnhhhpibjhbnh](https://chromewebstore.google.com/detail/%E6%B2%89%E6%B5%B8%E5%BC%8F%E7%BF%BB%E8%AD%AF-%E7%B6%B2%E9%A0%81%E7%BF%BB%E8%AD%AF%E6%93%B4%E5%85%85-pdf%E7%BF%BB%E8%AD%AF-%E5%85%8D%E8%B2%BB/bpoadfkcbjbfhfodiogcnhhhpibjhbnh)

2. 取得 AI API Key
    - 進入 [https://console.x.ai/](https://console.x.ai/) 
    - 登入後點選 `API` 並取得 `API Key`

![](/image/20241124_23-03-26.png)

3. 設定 API Key
    - 點選右上角小圖示，並點選 `設定`
    - 點擊翻譯服務 > 【添加兼容 OpenAI 介面的自訂 AI 翻譯服務？】
    - 輸入 `API Key` 、 API 地址 `https://api.x.ai/v1/chat/completions`、模型 `grok-beta` 並點選 `儲存`

![](/image/20241124_23-14-29.png)
![](/image/20241124_23-12-36.png)
![](/image/20241124_23-13-02.png)


### 使用方式

#### 一、翻譯樣式
這裡翻譯模式比 Glarity 來的多功能，翻譯的樣式可以透過UI確認是否是自己想要的樣式。
![](/image/20241124_23-22-21.png)


#### 二、翻譯翻轉
這功能是如果你有原本翻譯以及原文，可以透過這個功能來翻轉翻譯會直接保留翻譯結果。

![](/image/20241124_23-23-10.png)

#### 三、AI Prompt選擇
這工具最特別是他有提供 AI Prompt 選擇，可以透過這個功能來選擇不同的 AI Prompt 來翻譯提高翻譯的水平。

![](/image/20241124_23-29-21.png)
![](/image/20241124_23-30-20.png)