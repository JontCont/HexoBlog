---
title: 【筆記】Windows Command 剪貼簿效果
date: 2023-02-19 22:54:19
categories: 
  - 筆記 
  - 生活雜記
description:
keyword: 'CLI'
cover: 2024-05-13-13-59-18.png
---

## Clip 命令
windows 有提供很方便的剪貼簿語法，可以透過 `clip` 來將指令或檔案輸出結果複製到剪貼簿中，這樣就可以直接貼上到其他地方。
```shell
  command | CLIP
  CLIP < filename.txt
```

### 範例
下方為範例，將 `Hello World` 輸出到剪貼簿中，或是將 `temp.txt` 的內容輸出到剪貼簿中。
```shell
  echo "Hello World" | clip
  clip < temp.txt
```