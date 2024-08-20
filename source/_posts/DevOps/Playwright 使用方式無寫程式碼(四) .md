---
title: Playwright 自動化腳本無寫程式碼使用方式 (四) - test function
date: 2024-08-21 10:51:23
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

最近開始使用 Playwright 進行自動化測試，順便把一些學習筆記記錄下來，這篇會介紹如何使用 test function。

### 一、 運用 test describe

在 Playwright 中，test.describe 是一個用來分組測試的功能。它的主要作用是將相關的測試用例集合在一起，使得測試結構更清晰，並且可以更方便地管理和運行這些測試。以下是 test.describe 的一些具體功能和應用：

#### 1-1 test.describe 作用

1. 分組測試範例/情境 : 允許你將相關的測試用例分組在一起，這樣可以使測試代碼更具結構性和可讀性。例如，你可以將所有針對某個特定功能的測試用例放在同一個 describe 區塊中。
2. 設置共享的前置條件和後置條件 : 在 test.describe 區塊中，你可以設置共享的 beforeAll、beforeEach、afterAll 和 afterEach hook，用於在測試運行前後執行一些初始化或清理操作。這樣可以避免在每個測試用例中重複相同的代碼
3. 提高測試報告的可讀性 : test.describe 可以幫助我們將測試用例分組，使得測試報告更加清晰，方便我們查看測試結果。

#### 1-2 test.describe 使用方式

```javascript
const { test, expect } = require('@playwright/test');

test.describe('User Authentication', () => {
  test.beforeAll(async () => {
    // 在所有測試之前運行的初始化代碼
  });

  test.beforeEach(async ({ page }) => {
    // 在每個測試之前運行的代碼，例如登錄
    await page.goto('https://example.com/login');
  });

  test('should login successfully', async ({ page }) => {
    await page.fill('#username', 'user');
    await page.fill('#password', 'password');
    await page.click('#login');
    expect(await page.innerText('.welcome')).toBe('Welcome, user!');
  });

  test('should fail with incorrect password', async ({ page }) => {
    await page.fill('#username', 'user');
    await page.fill('#password', 'wrongpassword');
    await page.click('#login');
    expect(await page.innerText('.error')).toBe('Invalid credentials');
  });

  test.afterEach(async ({ page }) => {
    // 在每個測試之後運行的代碼，例如登出
    await page.click('#logout');
  });

  test.afterAll(async () => {
    // 在所有測試之後運行的清理代碼
  });
});
```

### 二、 條件性測試

在 Playwright 中，條件性測試（Conditional Testing）是一種根據特定條件來決定是否執行某些測試步驟的方法。這種方法在處理動態和不可預測的應用程序狀態時特別有用。以下是條件性測試的詳細說明及其應用：

```javascript
test.describe('Conditional Tests', () => {
  test('should run this test', async ({ page }) => {
    // 測試代碼
  });

  test.skip('should skip this test', async ({ page }) => {
    // 測試代碼
  });

  test.only('should only run this test', async ({ page }) => {
    // 測試代碼
  });
});
```

#### 2-1 test.skip

test.skip 是一個用來跳過某個測試用例的方法。

```javascript
// 跳過特定瀏覽器的測試
test('should work on all browsers except WebKit', async ({ browserName, page }) => {
  test.skip(browserName === 'webkit', 'This test is not applicable for WebKit');
  
  await page.goto('https://example.com');
  const title = await page.title();
  expect(title).toBe('Example Domain');
});

// 跳過特定條件下的測試
test('should skip this test if condition is met', async ({ page }) => {
  const condition = true; // 根據實際情況設置條件
  test.skip(condition, 'Skipping this test due to condition being true');
  
  await page.goto('https://example.com');
  const title = await page.title();
  expect(title).toBe('Example Domain');
});
```

#### 2-2 test.only

test.only 是一個用來只運行某個測試用例的方法。

```javascript
test.describe('Feature Tests', () => {
  // 只運行這個測試組中的測試
  test.only('should run only this test', async ({ page }) => {
    await page.goto('https://example.com/feature');
    const featureText = await page.innerText('.feature');
    expect(featureText).toBe('Feature works!');
  });

  test('this test will be ignored', async ({ page }) => {
    await page.goto('https://example.com/feature');
    const featureText = await page.innerText('.feature');
    expect(featureText).toBe('Feature works!');
  });
});
```

### 三、 自定義標籤

在 Playwright 中，自定義標籤（Custom Tags）是一種用來標記測試用例的方法。這種方法可以幫助我們更好地組織和管理測試用例，並且可以根據標籤來選擇性地運行測試。以下是自定義標籤的詳細說明及其應用：

```javascript
test('basic test', { tag: ['@smoke'] }, async ({ page }) => {
  await page.goto('https://example.com');
  const title = await page.title();
  expect(title).toBe('Example Domain');
});
```

#### 3-1 運行特定標籤的測試

```cmd
npx playwright test -g '@smoke'
```
