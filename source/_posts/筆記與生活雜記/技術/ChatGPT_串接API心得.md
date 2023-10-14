---
title: chatGPT API 串接API 心得
date: 2023-02-19 22:54:19
categories: 
  - 筆記 
  - 生活雜記
description:
keyword: 'C#'
cover: /image/20230219_22-54-19.png
---


## 前言 
近期有使用 Line Bot 完成一個小小專案，但是又想告一些花樣就把ChatGPT 加入Line 中，唯一區點就是要注意Token 使用量。

## Token 使用量
GPT 有很多版本 (~光GPT 也不知道他已經多少版本~)，串接過程其實有聽過 Token 次數，依據每個版本不同 Token 數就會不同。例如 : GPT-3 每一個 Token 為 4 個char 或是 0.75 個字。目前 GPT-3 只有提供最大  4,096 tokens，如果超過就會無法正常使用。

## 首次使用
chatGPT 提供免費 18 美元的費用，這三天玩下去還沒花到 1美元，若直接把他當簡易的搜尋工具他是相當翻遍許多。
![](/image/20230308_17-55-21.png)


## GPT API 申請
Open API : [https://platform.openai.com/](https://platform.openai.com/)

申請方式只需要按下 "Create new secret key" 即可。
![](/image/20230308_17-47-49.png)
![](/image/20230308_17-51-28.png)

## Library 
這邊是已經有提供 Library 可以馬上實現，Line 部分我使用 [Betalgo.OpenAI.GPT3](https://github.com/betalgo/openai)製作，製作方式很簡單這邊就不介紹操作。

入口 : [https://platform.openai.com/docs/libraries/community-libraries](https://platform.openai.com/docs/libraries/community-libraries)



## 參考 
1. [VERSOPN](https://www.version1.com/an-analysis-of-chatgpt-and-openai-gpt3-how-to-use-it-for-your-business/)