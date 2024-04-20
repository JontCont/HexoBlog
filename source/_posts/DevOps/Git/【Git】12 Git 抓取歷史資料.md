---
title: 【Git】- 使用 git remote 將不同git環境同步程式碼
date: 2024-12-20 23:12:45
categories: 
  - DevOps
  - Git
tags: 
  - Git
cover: /image/20230302_10-12-45.png
---

## 前言
最近因為專案要用 release 資訊，我們這邊做法是利用 commit 來控管 release 版本，以下作法是利用 git log 抓取 commit 資訊。


---

## 一、git log 

### 1-1 抓取區間 - 日期
因為 commit 可能因為版本過多，我們可以透過以下方式處理。

```bash
git log --oneline --pretty=format:"%h %ad | %s%d [%an]" --date=short --since="2024-04-01" --before="2024-04-10"
```

### 1-2 抓取區間 - SHA
如果是要抓取特定版本，可以透過 SHA 來抓取。

```bash
git log --oneline --pretty=format:"%h %ad | %s%d [%an]" --date=short 1b2e3c4..5a6b7c8
```



## 二、補充
### 2-1 online 
--oneline 是 git log 命令的一個選項，它會將每個提交的輸出縮短為一行。這對於查看項目的提交歷史非常有用，因為它可以讓你在一個簡潔的視圖中看到所有的提交。
具體來說，--oneline 選項會顯示每個提交的縮短 SHA-1 校驗和和提交消息的第一行。例如：
![](/image/20240420_21-09-32.png)