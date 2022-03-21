---
title: 使用 Github Token 
categories: Github
tags: 
  - Github
keyword: 'Github, Token'
cover: /img/GitHub/bg/bg_01.jpg
---

# Personal access tokens
可以不用使用SSH即可使用的一種，建立完成後會產生出Token，可用來製作API、自動部屬等、協助創作等。
- [官方網文件](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

## 創建 Personal access tokens
點選設定後，左側最底下 ``` Developer settings```選擇 ``` Personal access tokens```即可。設定上需要注意看裡面內容進行設定。
![](/img/GitHub/basic/tokens_01.png)
![](/img/GitHub/basic/tokens_02.png)
![](/img/GitHub/basic/tokens_03.png)

設定內容有包含到組織相關的存取，可以透過這種方式取的組織權限。
![](/img/GitHub/basic/tokens_04.png)

然後就可以使用Token取得 GitHub repository。*這邊必須要注意 Create 出來的Token 只會出現一次，如果不小心沒存檔無法再取得一次。*
![](/img/GitHub/basic/tokens_05.png)