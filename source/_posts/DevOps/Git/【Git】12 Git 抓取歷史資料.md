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

### 2-2 pretty
pretty 是 git log 命令的一個選項，它允許你指定自定義的格式來顯示提交歷史。你可以在 Git 的官方文檔中找到關於 pretty 選項的詳細說明。

以下是一些 pretty 選項的常見用法：

- git log --pretty=oneline：每個提交顯示為一行，包括縮短的提交哈希和提交消息的第一行。
- git log --pretty=short：每個提交顯示為一個短摘要，包括完整的提交哈希、作者、日期和提交消息的第一行。
- git log --pretty=full：每個提交顯示為一個完整的摘要，包括完整的提交哈希、作者、提交者（如果與作者不同）、日期和完整的提交消息。
- git log --pretty=fuller：與 full 類似，但還包括提交者的日期。
- git log --pretty=format:"%h - %an, %ar : %s"：使用自定義的格式顯示每個提交。在這個例子中，%h 是縮短的提交哈希，%an 是作者的名字，%ar 是相對的提交日期，%s 是提交消息的第一行。具體來說，--pretty 選項允許你使用一個格式字符串來定義 git log 命令的輸出格式。這個格式字符串可以包含各種佔位符，每個佔位符都代表著提交的一個屬性。例如：

```bash
git log --pretty=format:"%h %ad | %s%d [%an]"
```


#### 2-2-3 format 格式字符串
--pretty=format: 是 git log 命令的一個選項，它允許你以自定義的格式來顯示提交歷史。你可以在 format: 之後指定一個格式字符串，該字符串可以包含一些特殊的格式符號來表示提交的各種信息。
以下是一些常用的格式符號：

- %H：提交的完整哈希值
- %h：提交的縮短哈希值
- %T：樹的完整哈希值
- %t：樹的縮短哈希值
- %P：父提交的完整哈希值
- %p：父提交的縮短哈希值
- %an：作者的名字
- %ae：作者的電子郵件地址
- %ad：作者的日期（可以與 --date 選項一起使用來改變格式）
- %ar：作者的相對日期
- %cn：提交者的名字
- %ce：提交者的電子郵件地址
- %cd：提交者的日期
- %cr：提交者的相對日期
- %s：提交信息的標題

例如，你可以使用以下命令來顯示每個提交的縮短哈希值、作者的名字和提交信息的標題：
```bash
git log --pretty=format:"%h - %an : %s"
```

這將產生如下的輸出：
```bash
a3f6e2d - John Doe : Add new feature
5076a3c - Jane Doe : Fix bug
...

