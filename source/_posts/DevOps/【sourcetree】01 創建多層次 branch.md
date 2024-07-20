---
title: SourceTree (一) - 創建多層次 branch
date: 2023-01-01 23:33:32
categories: 
  - DevOps
  - sourcetree
tags: 
  - sourcetree
cover: /image/20230101_23-33-32.png
---

近期因工作需要換 Git 工具，從 Github Desktop 轉換到 SourceTree 工具，目前最吸引的部分是圖形(Graph)部分非常好分析 branch marge 狀況以及 branch 使用狀況。這篇簡單操作 "創建多層次 branch"。

## SourceTree
 是以 Git 為基礎設計的 GUI 圖形化工具。與 Github Desktop 比較上 Github Desktop 缺少圖形化介面缺乏管理、維護。

### 官方網址
SourceTree : [https://www.sourcetreeapp.com/](https://www.sourcetreeapp.com/)

## 安裝方式
### step.1 註冊
bitbucket 與 github 是同類型的工具，採用 Mercurial 和Git 作為版控部分。這邊就請自行註冊。
![](/image/20230101_23-51-58.png)

### step.2 安裝工具
![](/image/20230101_23-57-20.png)
{% blockquote %}
### 進階選項-備註
*來自 [Sourcetree - git 的 GUI 管理軟體](https://ithelp.ithome.com.tw/articles/10206852)*

- 第一項如果勾選的話會在 checkout ( 切換 commit ) 的時候，自動將斷行符號由 LF ( linux ) 轉成 CRLF ( windows )，如果是在 linux 的系統上安裝則相反，選擇這個的好處是在進行協同開發的時候如果使用的系統不相同，就比較不會因為斷行符號的不同而發生錯誤。
- 第二項則是預先設置一個通用的 ignore，這兩項可以依照自己的需求選擇。
{% endblockquote %}

### step.3 設定帳號
![](/image/20230102_00-01-45.png)

### step 4 : 設置 SSH Key
![](/image/20230102_00-02-50.png)

## 創建分支(Branch)
首先我們先確認分支是否是只有一個，接下來我們再進行創建分支。
![](/image/20230102_00-05-36.png)

### 第一層分支
第一層 Banch 可以直接創建 ```folder```等下來識別接下來畫面。
![](/image/20230102_00-08-23.png)

### 第二層分支
接下來我們會用 ```folder/001```來表示下一層，這邊會發現怎麼創建都是錯誤，原因是因為已經創建的folder是無發創建子層分支。
![](/image/20230102_00-11-08.png)
![](/image/20230102_00-11-17.png)

作法如下，這樣下來就完成二層分支
```
folder_copy/#A002
```
![](/image/20230102_00-14-51.png)



## 多層分支
雖然這介面可以使用多層方式創建分支，目前為止很少遇到需要三層以上的案例，使用方式如同上方一樣。
![](/image/20230102_00-16-47.png)

從上方案例可以知道幾點事項
- 不是 folder 關係是無法創建下一層
- 一個folder 可以允許 folder 、branch
- 
若要存放檔案可以參考這招或是複雜概念才建議開道三層以上。
