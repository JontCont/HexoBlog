---
title: Playwright 自動化腳本無寫程式碼使用方式 (六) - locator / waitForSelector
date: 2024-11-03 23:51:23
categories: 
  - DevOps
  - Playwright
tags: 
  - Playwright
description:
keyword: 'Playwright'
cover: /image/20240720_23-44-39.png
---

## 前言
用到現在來補充一個比較多新手會卡觀的一個問題，就是如何使用 locator 配合 selector 來定位元素，這個在實際操作上是非常重要的，因為有時候我們會遇到一些元素是沒有 id 或是 class 的，這時候我們就需要透過 locator 配合 selector 來定位元素。


## locator 配合 selector 使用

### 起因
相信各位在各家公司上，往往都是一條龍從前端到後端都是自己一個人在做，這時候就會遇到一個問題，就是前端的元素是沒有良好的設計 id / class 容易造成html不好維護。配合 Playwright 有時候使用 getByRole 又會出乎意料的錯誤，建議使用 locator 解決問題。


### locator 定位器
locator 定位器是 Playwright 提供的一個定位元素的方法，透過這個方法我們可以透過一些特定的方式來定位元素，這樣就可以達到我們想要的目的。如下方範例 :

```ts
await page.locator('div.myClass')
await page.locator('xpath=//button') // 透過 xpath 定位元素
```

#### 1. 透過開發者工具取得 selector
selector 在完全對於前端沒有經驗來說， 瀏覽器裡開發者工具中的選擇器，這個選擇器是可以幫助我們快速定位到我們想要的元素。 

![](/image/20241103_22-17-59.png)
![](/image/20241103_22-20-05.png)

基本上 selector 就夠用 xpath 這個是比較進階的選擇器，這個是透過元素的路徑來定位元素，這個是比較不推薦使用，因為這個會比較不好維護。接下來使用方式就是利用這個來取得我們想要的元素。

補充 : 
完全不知道 css selector 的話可以參考這篇文章，這篇文章是我寫的一個 css selector 的教學，這個是非常基礎的東西，建議可以先了解一下。
- 文件參考 : [CSS 選擇器](https://information9527.gitbook.io/html/2.css/jian-gou-zhong)


### waitForSelector 等待元素出現/消失
playwright 提供了一個等待元素出現的方法，這個方法是非常重要的，因為有時候我們會遇到元素還沒出現就去操作，這樣會造成錯誤，這時候我們就可以透過 waitForSelector 來等待元素出現。如下方範例 :

```ts
await page.waitForSelector('text=執行成功', {state: 'visible'}) // 等待元素出現
await page.waitForSelector('text=執行成功', {state: 'hidden'}) // 等待元素出現
```

waitForSelector 的 state 基本上只有這幾個選項，預設為 `'visible'`。
- `'attached'` - 等待元素存在於 DOM 中。
- `'detached'` - 等待元素不在 DOM 中。
- `'visible'` - 等待元素有非空的邊界框且沒有 `visibility:hidden`。注意，沒有任何內容或 `display:none` 的元素有一個空的邊界框，並且不被認為是可見的。
- `'hidden'` - 等待元素從 DOM 中分離，或有一個空的邊界框或 `visibility:hidden`。這與 `'visible'` 選項相反。

#### 範例
這邊我們透過 locator 配合 selector 來定位元素，並且透過 waitForSelector 來等待元素出現，這樣就可以達到我們想要的目的。

```ts
import { test, expect } from '@playwright/test';

test('locator / waitForSelector', async ({ page }) => {
  await page.goto('https://www.google.com');
  await page.locator('input[name="q"]').fill('playwright');
  await page.locator('input[name="q"]').press('Enter');
  await page.waitForSelector('text=playwright', {state: 'visible'});
  const title = await page.title();
  expect(title).toBe('playwright - Google 搜尋');
});
```