---
title: 【Azure】Confidential 費用
date: 2023-04-05 11:51:23
categories: 
  - 雲端平台
  - Azure
tags: 
  - Azure
description:
keyword: 'Cloud  ,Azure'
cover: /image/20230310_08-44-55.png
---


## Confidential Ledgers
近期為了要研究 Azure 設定檔如何使用不斷嘗試，Confidential Ledgers 是透過而外機密總帳是一種分佈式帳本技術（DLT）可以加入Web Application 當中，目前下圖頁面是創建一個 Confidential Ledgers 底下會有多個 Configuration 進行使用。


## 總結費用
下圖是我在3月份進行測試時的價錢，費用相當高如果不是試用版 一個月就是5000左右 😥😥。
![](/image/20230405_11-51-23.png)

第一次創建價格多少，從下圖可以看到 505.76 相當合理 (裡面有包含DB創建費用)，往下看可以看到平均一天要付287~271元算是一天三餐吃90元左右的便當，一般小資族無法承受的金額🤮。
![](/image/20230405_11-53-45.png)

## 持續扣錢 ?!
Configuration Groups 已經完全刪除，但是還是持續扣費用。主要原因為 Confidential Ledgers 會扣除使用費用，即使沒有使用一樣會扣除相關費用，累加上去非常可怕。
![](/image/20230405_11-59-17.png)


## 只開啟 DataBase 功能
目前使用 DB 功能，除非大量呼叫、壓力測試才有機會把流量、費用增大，原則上單一測試只需要 2~6元左右，相當便宜許多，Web Application 最大特赦是可以放置 10個免費專案項目，所以只需要付DB費用相當於電費加維護費用價格。
 ![](/image/20230405_12-23-18.png)