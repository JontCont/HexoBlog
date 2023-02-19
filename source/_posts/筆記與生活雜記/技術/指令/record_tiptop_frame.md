---
title: (筆記) 如何確認 TipTop Web Api 對接方式
categories: 
  - 筆記 
  - 生活雜記
tags: 
  - Web Api
description:
keyword: 'Web Api'
cover: /imgage/tiptop.png
---

# 紀錄目的
近期遇到 Web Api 處理方式是使用 TipTop Web Api，處理方式、撰寫方式也不明確，在此紀錄如何跟別人對接Web Api 方式。

# 使用方式
TipTop 是一個非常舊版的 Web Api，執行上對新人非常不友善。下方是概念圖。
![](/img/flower/tiptop.png)

遇到不使用帳號的 API 往往都是使用內網方式串接，目前查詢呼叫方式使用 SoapUI 到目前是顯示XML比較好用的Software。

## 注意事項
1. Response 通常會在自己本機撰寫好程式碼，會告知對方使用這個Function。
2. 可以透過得知文件進行確認
3. TipTop 有分兩種版本，1. 需使用帳號登入 2. 只需傳入值
4. Response 如果失效，通常會有顯示 Status ，[-1] 為無效、失敗; [0]則是成功。

## 下載支援 
1. [SoapUI](https://www.soapui.org/downloads/soapui/)

