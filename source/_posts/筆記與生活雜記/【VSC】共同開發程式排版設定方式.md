---
title: 【VSC】如何共同開發階段程式排版設定方式
categories: 
  - 筆記 
description:
cover: /image/20250207_13-20-50.png
---

## 前言
提到 VSC 開發可肯定遇到一些排版問題，有些排版的規則與後面開法人員又不太相同，容易造成 commit 都是排版的修改項目。這邊我用 VSC 來處理共同開發讓所有人排版都一致。


## VS Code

### 指令與搜尋
如果第一次或是用不久且不夠熟悉的人，我們可以記住以下快捷鍵。

- 快速指令 (有 > 符號): ```Ctrl + Shift + P ```
- 快速搜尋 (只能搜尋當前專案的檔案名字) : ```Ctrl + P```

快速搜尋可以自己加入 > 符號也能達到效果。 

註記 : 最新版本的 VS Code 可以直接點搜尋列也能達到 ```Ctrl + P``` 效果。
![](/image/20250211_10-41-40.png)

### workspace / User 的 Settings.json 差異

專案開始的時候，一定很多人利用 ```.gitignore``` 移除掉 .vscode ，首先先把 ```.gitignore``` 裡面針對 .vscode 先移除才能往下走原因如下。

說明 : 

- User Setting.json : 個人設定檔，只有自己本機才能使用這些參數。
- Workspace Setting.json : 專案設定檔，這個設定檔是針對專案的設定，所有人都能使用這些參數。

User Settings.json 實際存在路徑會是 ```C:\Users\使用者名稱\AppData\Roaming\Code\User\settings.json``` ，而 Workspace Setting.json 實際存在路徑會是專案的根目錄下的 ```.vscode\settings.json```。

依據上面的敘述就可以理解為什麼要先移除 .vscode ，因為 .vscode 裡面有設定檔，如果不移除掉，就會有人的設定檔被 commit 到專案裡面，這樣就會造成其他人的設定檔被覆蓋掉。

### 為什麼沒有擴充套件

當你完成所有設定檔並且上 Commit 給開發同仁，一定會有人喊怎麼會沒有任何作用或是沒有你說的套件，這些要說到 vscode 有個 ```.vscode\extensions.json``` 這個檔案，這個檔案是用來記錄你的專案需要的擴充套件，這樣就不會有人說你的設定檔沒有作用。

使用方式如下 : 

![](/image/20250211_11-03-19.png)


### 擴充套件動作(團隊成員的操作)：

當其他開發者從版本控制系統中拉取最新的專案代碼並在 VSCode 中打開該專案時，VSCode 會自動檢測 extensions.json 中的推薦擴充套件。他們可以依次點擊 VSCode 左側的擴充功能圖示，然後在搜尋欄中輸入 @recommended，即可看到專案推薦的擴充套件列表，方便他們進行安裝。

透過這種方式，您可以確保團隊成員在相同的開發環境下工作，提高協作效率。

---


## 排版工具

### 推薦使用套件 
1. Prettier - Code formatter : [點選我](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
2. SQL Formatter VSCode : [點選我](https://marketplace.visualstudio.com/items?itemName=ReneSaarsoo.sql-formatter-vsc)

### 設定檔參考

- extensions.json : 可支援 C# 、Typescript、Html

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "ms-dotnettools.csharp",
    "ms-dotnettools.csdevkit",
    "doggy8088.quicktype-refresh",
    "renesaarsoo.sql-formatter-vsc"
  ]
}
```

- settings.json : 當存檔時候會觸發排版動作，讓所有版型得到相同樣式。

```json
{
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "files.eol": "\r\n",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[csharp]": {
    "editor.defaultFormatter": "ms-dotnettools.csharp"
  },
  "[sql]": {
    "editor.defaultFormatter": "ReneSaarsoo.sql-formatter-vsc"
  }
}
```

---

## 結論

進入有部分小規模的公司，常常都是用個字排版工具或是甚麼都不排版的可怕循環，這邊建議讓這部分強制執行讓所有人都保持一致。

PS : 最近都在使用 ChatGPT、SUNO 使用方式，之後有機會也把最近有玩到的心得慢慢推出。
