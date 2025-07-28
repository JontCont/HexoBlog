---
title: Playwright 自動化腳本無寫程式碼使用方式 (五) - 身分驗證
date: 2024-10-24 23:51:23
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

playwright 在前幾章都有介紹簡單的操作方式，這次藥用個身分驗證的例子來說明如何使用 playwright 來自動化測試。

## playwright 身分驗證

為甚麼會需要 playwright 身分驗證，主要是每次案例上 playwright 都會開啟全新沒有任何的 cookie、session之類，每次都要重新登入相當繁瑣。這邊我們就來說明如何使用 playwright 來自動化登入的動作。

- 這篇建議各位讀者使用 playwright 時候可以到 [playwright.tw](https://playwright.tw/) 這個網站來查看範例，這個網站由 【Will 保哥】翻成中文網站有助於各位學習。

### 一、創建驗證動作

前篇有提到 test.describe 這個方法可以用來描述測試的動作，可以用來分類測試動作。這次我們就讓這個登入動作寫在 step 裡面，之後啟動就可以直接使用。這邊會使用 playwright 官方網範例來調整，這邊會使用 github 登入來做範例。

```javascript
setup("authenticate", async ({ page, browser }) => {
  await page.goto("https://github.com/login");
  await page
    .getByLabel("Username or email address")
    .fill("username");
  await page.getByLabel("Password").fill("password");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL("https://github.com/");
  await page.context().storageState({ path: authFile });
});
```

這邊我們封不動作在 setup 裡面，命名上官方使用 ```auth.setup.ts``` 來區分是驗證的動作，這樣之後要使用的時候就可以直接呼叫這個 setup 來使用。

### 二、設定環境 plawright.config.ts

說明以下範例。他是把全部的setup 都放在一起來執行，之後會透握 user.json 來驗證身分，如果沒有這個檔案就會重新登入。
需要注意對應的瀏覽器若需要登入情況下，需要加入 ```dependencies: ["auth.setup"]``` 來告訴他需要先登入。 ```storageState: ".auth/user.json"``` 這個是用來存放登入資訊的檔案，每次執行它會抓一次 ```storageState```給瀏覽器。

```ts
projects: [
  { name: "setup", testMatch: /.*\.setup\.ts/ },
  {
    name: "chromium",
    use: {
      ...devices["Desktop Chrome"],
      storageState: ".auth/user.json",
    },
    dependencies: ["setup"],
  }
]
```

### 三、執行測試

接下來我們就簡單錄製測試動作。我使用 github 徽章來做測試能不能幫我們自動登入後，完成以下動作。

```javascript
test('驗證 github 內容', async ({ page }) => {
  await page.goto('http://github.com'); 
  await page.getByLabel('Open user navigation menu').click();
  await page.getByLabel('Your profile').click();
  await page.getByRole('link', { name: 'Achievement: Pull Shark x2' }).click();
  await expect(page.getByLabel('Pull Shark details')).toContainText('Pull Shark x2');
});

```

這邊就是我們執行後的結果，可以看到他有幫我們登入後，完成了我們的測試動作。
![](/image/20241024_22-55-52.png)

<video width="320" height="240" controls>
  <source src="/video/20241024_225431.mp4" type="video/mp4">
</video>

---

### 補充

#### 一、如何自動登入

如果要改成自動登入必須要加入以下設定，就可以完美避開剛才範例會有強制要登入的問題。

```ts
import { test as setup, expect, test, Page } from "@playwright/test";
import path from "path";
import fs from "fs";

const authFile = path.join(__dirname, "../.auth/user.json");

setup("authenticate", async ({ page, browser }) => {
  if (!fs.existsSync(authFile)) {
    await SignPage(page);
  } else {
    const context = await browser.newContext({ storageState: authFile });
    const page = await context.newPage();
    const title = await page.title();
    if (title === "Sign in to GitHub · GitHub") {
      await SignPage(page);
    }
    await context.close();
  }
});

async function SignPage(page: Page) {
  await page.goto("https://github.com/login");
  await page
    .getByLabel("Username or email address")
    .fill("username");
  await page.getByLabel("Password").fill("password");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL("https://github.com/");
  await page.context().storageState({ path: authFile });
}
```

### 二、UI 模式 vs Moderate 模式

基本上這範例是稱作為 [UI 模式] 因此會需要有UI操作登入使用者，才能夠登入。以下為官方網站的說明。

> UI mode 將不會預設執行 setup 專案以提高測試速度。我們建議在現有身份驗證過期時，偶爾手動執行 auth.setup.ts 來進行身份驗證。

如何實現 modelrate 模式，可以參考官方以下範例。

```ts
import { test as baseTest, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export * from '@playwright/test';
export const test = baseTest.extend<{}, { workerStorageState: string }>({
  // Use the same storage state for all tests in this worker.
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  // Authenticate once per worker with a worker-scoped fixture.
  workerStorageState: [async ({ browser }, use) => {
    // Use parallelIndex as a unique identifier for each worker.
    const id = test.info().parallelIndex;
    const fileName = path.resolve(test.info().project.outputDir, `.auth/${id}.json`);

    if (fs.existsSync(fileName)) {
      // Reuse existing authentication state if any.
      await use(fileName);
      return;
    }

    // Important: make sure we authenticate in a clean environment by unsetting storage state.
    const page = await browser.newPage({ storageState: undefined });

    // Acquire a unique account, for example create a new one.
    // Alternatively, you can have a list of precreated accounts for testing.
    // Make sure that accounts are unique, so that multiple team members
    // can run tests at the same time without interference.
    const account = await acquireAccount(id);

    // Perform authentication steps. Replace these actions with your own.
    await page.goto('https://github.com/login');
    await page.getByLabel('Username or email address').fill(account.username);
    await page.getByLabel('Password').fill(account.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    await page.waitForURL('https://github.com/');
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

    // End of authentication steps.

    await page.context().storageState({ path: fileName });
    await page.close();
    await use(fileName);
  }, { scope: 'worker' }],
});
```

必須要把 '@playwright/test' 複寫storageState 來達到目的。最主要是每次建立測試腳本時候要把 import 內容改成 ```import { test as baseTest, expect } from '../[複寫playwright檔案]';``` 這樣就可以達到目的。

---

## 結論

這篇主要是昨日技術分享時候稍微提到這個範例，但就沒有實際展示效果。這次就把這範例給剛開始使用 playwright 的讀者參考，這樣就可以避免每次都要重新登入的問題。至於能有多帳號登入情境就直接參考官方文件，內容已經能足夠應付大部分的情況。
