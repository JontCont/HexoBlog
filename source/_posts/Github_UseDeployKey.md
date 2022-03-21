---
title: 使用 Github Deploy keys 
categories: Github
tags: 
  - Github
keyword: 'Github, Deploy keys, ssh'
cover: /img/GitHub/bg/bg_01.jpg
---
# Deploy keys
透過設定 Deploy keys 可以避免掉每次 push 都要輸入帳密的流程

## 創建 SSH
打開 [命令字元] 輸入以下內容即可。如果沒特別指定路徑預設```(C:\Users\使用者名稱/.ssh/id_rsa)```，沒有特定指定密碼可以直接按下Enter。
```cmd
ssh-keygen
```
![](/img/GitHub/basic/deploy_01.png)

下方為```ssh-keygen```參數，請參閱。
![](/img/GitHub/basic/deploy_02.png)

## 創建 Deploy keys
打開需要使用Deloy Keys 的 repository，按下Security > Deploy keys。若需要使用Write access權限可以直接勾選 。
![](/img/GitHub/basic/deploy_03.png)
![](/img/GitHub/basic/deploy_04.png)

### 輸入 Keys
Key輸入框請用*id_rsa.pub*記事本打開，直接貼上去。
![](/img/GitHub/basic/deploy_05.png)
![](/img/GitHub/basic/deploy_06.png)

完成後，就會出現這個。
![](/img/GitHub/basic/deploy_07.png)


## 跳出帳號密碼
如果經過上面設定 push 過程中，須要輸入帳號密碼可以嘗試更改本地 remote 的來源
```
git remote set-url origin git@github.com:[yourgithubID]/[yourRepo].git
```