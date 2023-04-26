---
title: Git diff2html 使用指令產生報告
categories: 
  - DevOps
  - Git
tags: 
  - Git
cover: /image/20230426_22-59-09.png
---

## diff2html
Git 是現今程式開發中不可或缺的工具之一，它讓我們可以輕鬆地追蹤程式碼的變更並且進行版本控制。不過遇到需要產出與前一版本的差異給其他人看，因此我使用這個套件。這邊我們使用cli 方便用指令與commit 之間去做比較。

官方網址 : [https://diff2html.xyz/](https://diff2html.xyz/)
![](/image/20230426_22-59-09.png)


## 前置作業
必須先有 Node.js 才能進行下列順序。
1. 安裝diff2html : ```npm install -g diff2html-cli```
2. 確認 diff2html 可以使用 : ```diff2html -v``

如果不能正常使用，主要原因exe 沒有憑證，會被系統擋住不可以使用，解決方式如下 :
```powershell
Set-ExecutionPolicy RemoteSigned
```
`
官方網址 : [https://learn.microsoft.com/zh-tw/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.3](https://learn.microsoft.com/zh-tw/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.3)


## 使用方式
Github : [https://github.com/rtfpessoa/diff2html-cli](https://github.com/rtfpessoa/diff2html-cli)

```bash
diff2html [ flags and/or options ] -- [git diff passthrough flags and options]
```
上面指令意思是 -- 後面是跟git diff 指令相同，只需要 commid 或是檔名資類即可使用，但是測試後來發現 PowerShell 指令遇到 -- 會造成執行失效，所以我改用 git bash 暫時解決現行狀況。

設定裡面參數可以先看github 教學文件，會有更詳細內容。官方提供格式讓你擇一去呈現畫面。
diff2html : [https://diff2html.xyz/demo.html](https://diff2html.xyz/demo.html)

## 使用 .sh 懶人包
以下指令需要使用.sh 副檔名，裡面內容主要是用來呈現時間、commit id 比較的id 來使用。
```bash
!/bin/bash

# Prompt for the newest commit ID
read -p "Enter the newest commit ID: " new_commit

# # Prompt for the oldest commit ID
read -p "Enter the oldest commit ID: " old_commit

# Get the current timestamp
timestamp=$(date +%Y%m%d_%H%M%S)

# Generate the output file name
output_file="${timestamp}_diff_report.html"

# Generate the report title
report_title="Diff_Report: ${old_commit:0:7}..${new_commit:0:7}"

# Run the diff2html command and generate the report
diff2html -s side -t "$report_title" -F "$output_file" -- "$old_commit" "$new_commit"

```