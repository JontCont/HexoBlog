---
title: "【筆記】Powershell - OhMyPosh 製作專屬風格"
date: 2025-09-14 12:00:00
categories: [Powershell, OhMyPosh, 工具教學]
tags: [Shell, 終端機美化, 主題, Windows, OhMyPosh]
---

## 前言

前幾個月很多 AI 都提供 Terimal 使用的使用這可以在更底層讓AI發會跟好的效果；這之前還是會先把 Powershell 用的好看一點，就像主機板也需要主機外殼一樣才會讓使用者看得舒服。

以前寫的 VS Code 亂碼問題，可以透過這篇解決。

## 什麼是 OhMyPosh？

OhMyPosh 是一個用於美化終端機提示字元（Prompt）的工具，支援多種 Shell（如 Powershell、Bash、Zsh），並且可以自訂主題，讓你的命令列更美觀、資訊更豐富。

### 需準備以下動作

1.  Power Shell 7 以上的 Terminal (需要用到 PSReadLine)
2.  【選用】[Everything](https://www.voidtools.com/zh-cn/)

---

## 安裝 OhMyPosh

快入設定可透過這篇文章 : [快速前往](https://blog.miniasp.com/post/2021/11/24/PowerShell-prompt-with-Oh-My-Posh-and-Windows-Terminal)

1. 開啟 Powershell，執行以下指令安裝 OhMyPosh：

   ```powershell
   winget install JanDeDobbeleer.OhMyPosh -s winget
   ```

2. 安裝字型（建議使用 Nerd Font）：
   - 下載 : [Nerd Font](https://www.nerdfonts.com/font-downloads)

    建議使用 JetBrainsMono 系列的幾個檔案安裝 
    - JetBrainsMonoNLNerdFontMono-Bold
    - JetBrainsMonoNLNerdFontMono-BoldItalic
    - JetBrainsMonoNLNerdFontMono-Light
    - JetBrainsMonoNLNerdFontMono-Regular

---

## 設定 Powershell OhMyPosh Theme 方式

1. 編輯 Powershell 個人設定檔：
   ```powershell
    [System.IO.Directory]::CreateDirectory([System.IO.Path]::GetDirectoryName($PROFILE))

    if (-not (Test-Path -Path $PROFILE -PathType Leaf)) {
    New-Item $PROFILE -Force
    }   
    ```

2. 在設定檔中加入以下內容：

    這個內容會直接載入效果，但不會直接永久套用。如果要永久套用需要加入 `$PROFILE`

   ```powershell
   oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\<主題名稱>.omp.json" | Invoke-Expression
   ```
   
   - `<主題名稱>` 可選擇預設主題或自訂主題。 參考 [theme 網站](https://ohmyposh.dev/docs/themes)

3. 永久套用到 powershell

```powershell
'oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\customspace.omp.json"  | Invoke-Expression' | Out-File -LiteralPath $PROFILE -Append -Encoding utf8
```

---

## 製作專屬主題

### 配置

1. 找到之前指令 oh my posh 安裝位置
   ![](/image/20250914_12-11-06.png)

2. 前往入口並創建 `customspace.omp.json`，可以參考期望的樣式套用過去。

3. 設定 `$PROFILE` 指向你的自訂主題。
   
   ```powershell
    # 設定當前效果
    oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\customspace.omp.json"  | Invoke-Expression
    
    # 套用
    'oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\customspace.omp.json"  | Invoke-Expression' | Out-File -LiteralPath $PROFILE -Append -Encoding utf8
    ```

4. ICON 亂碼問題 

   - Termail (Power Shell 7 設定方式)
   ![](/image/20250914_12-15-34.png)
   ![](/image/20250914_12-15-42.png)

   - VSCode 設定方式
   ![](/image/20250914_12-16-36.png)


## 設定方面問題

### 換行

換行方式需要下在 left 下面一層，才會有效果

```json
    {
      "alignment": "left",
      "segments": [
        {
            //...
        }
      ]
    },
    {
      "alignment": "left",
      "newline": true,
      "segments": [
        {
          "foreground": "#757575",
          "style": "plain",
          "template": "\u2514 ",
          "type": "text"
        },
        {
          "foreground": "#ffffff",
          "style": "plain",
          "template": ">",
          "type": "text"
        }
      ],
      "type": "prompt"
    }
```

### 與輸入並行

```json
    {
      "segments": [
        {
          "foreground": "#007acc",
          "style": "plain",
          "template": "{{ .Name }}",
          "type": "shell"
        },
        {
          "foreground": "#ff8080",
          "style": "plain",
          "template": " <#757575,>as</> root",
          "type": "root"
        },
        {
          "foreground": "#689f38",
          "properties": {
            "time_format": "15:04:05"
          },
          "style": "plain",
          "template": " {{ .CurrentDate | date .Format }}",
          "type": "time"
        }
      ],
      "type": "rprompt"
    },
```


---

## 參考資源
- [如何打造一個華麗又實用的 PowerShell 命令輸入環境](https://blog.miniasp.com/post/2021/11/24/PowerShell-prompt-with-Oh-My-Posh-and-Windows-Terminal)
- [OhMyPosh 官方文件](https://ohmyposh.dev/)
- [Nerd Fonts 官方網站](https://www.nerdfonts.com/)


