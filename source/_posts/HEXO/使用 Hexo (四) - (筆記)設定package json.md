---
title: 使用 Hexo (四) - (筆記)設定package json
categories:
  - 筆記
  - Hexo
tags: 
  - HEXO
cover: /img/Hexo/day_03_UseHexo/hexo.png
---
這篇主要使要紀錄設定 package json 。 

## 相關文件
- [hexo-server](https://www.npmjs.com/package/hexo-server)

## package.json
近期將```hexo server```設定方式微調，如果hexo-server 還有其他設定方式，可以透過下方使用方式加入。
```json
{
  "scripts": {
    "build": "hexo generate",
    "clean": "hexo clean",
    "deploy": "hexo deploy",
    "start": "hexo server -o -p 666",
    "publish": "hexo cl && hexo g -d "
  }
}
```

## hexo server
### 安裝方式
```cmd
$ npm install hexo-server --save
```

### 使用方式
| Option             | Description                                                  | Default                                                                                   |
|--------------------|--------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| -i, --ip           | Override the default server IP.                              | :: when IPv6 is available, else 0.0.0.0 (note: in most systems, :: also binds to 0.0.0.0) |
| -p, --port         | Override the default port.                                   | 4000                                                                                      |
| -s, --static       | Only serve static files.                                     | false                                                                                     |
| -l, --log [format] | Enable logger. Override log format.                          | false                                                                                     |
| -o, --open         | Immediately open the server url in your default web browser. | false                                                                                     |

