---
layout: post
title: "Angular 瀏覽器相容性檢查模組詳解"
date: 2025-09-09 10:00:00
categories: [A前端技術, Angular]
---

## 前言

近期專案需要對瀏覽器進行相容性檢查，確保使用者在不支援的瀏覽器上能獲得適當的提示或導向升級，依據不同的 browser 決定相應的處理方式。

## 一、探測作法

每有 Browser 會有不同的 User-Agent 內容，User-Agent 是可以被修改抓不到真正的瀏覽器，因此 HTML5 新增了 Client Hints 來提供更精確的瀏覽器資訊。
主要透過以下方式進行瀏覽器相容性檢查：

1. **Client Hints**：利用 `navigator.userAgentData` 取得更精確的瀏覽器資訊。
2. **User-Agent**：若 Client Hints 不支援，則回退使用 User-Agent 字串進行判斷。

### 1-1 Client Hints vs User-Agent

| 特性       | Client Hints                  | User-Agent                 |
| ---------- | ----------------------------- | -------------------------- |
| 精確度     | 高，能區分 Brave、Chromium 等 | 低，無法區分特殊瀏覽器等   |
| 可修改性   | 低，較難偽造                  | 高，容易被修改             |
| 支援度     | 逐漸普及，現代瀏覽器多數支援  | 廣泛支援，所有瀏覽器皆支援 |
| 資訊豐富度 | 提供品牌、版本等詳細資訊      | 提供基本的瀏覽器名稱與版本 |
| 使用場景   | 需要高精度識別瀏覽器時        | 兼容性檢查、基本瀏覽器識別 |

### 1-2 使用方式

#### 1-2-1 Client Hints 範例

```javascript
navigator.userAgentData.brands.forEach((brand) => {
  console.log(`${brand.brand}: ${brand.version}`);
});
```

#### 1-2-3 User-Agent 範例

```javascript
const userAgent = navigator.userAgent;
console.log(userAgent);
```

---

## 二、 Angular Line Browser

Line Browser 在國內使用率極高，如果要讓 Line Browser 可以點開後，打出 Default Browser 必須要用到 Line 官方的 Search Params 作法。
之前透過 Grok AI Agent 抓取 Browser 是否支援 Client Hints 的功能，可以透過下方網址驗證效果 :

- [檢測 Ueser-Agent](https://v0.app/chat/line-url-scheme-dMbTN8aIjAe?b=v0-preview-b_P63rnpY2LNv&f=)
- [檢測支援 Client Hints](https://v0.app/chat/user-agent-and-hints-jzJPymsJQgm)

### 2-1 Client Hints 回應內容範本

```json
{
  "brands": [
    {
      "brand": "Chromium",
      "version": "140"
    },
    {
      "brand": "Not=A?Brand",
      "version": "24"
    },
    {
      "brand": "Google Chrome",
      "version": "140"
    }
  ],
  "mobile": false,
  "platform": "Windows",
  "architecture": "x86",
  "bitness": "64",
  "model": "",
  "platformVersion": "19.0.0",
  "uaFullVersion": "140.0.7339.80",
  "wow64": false
}
```

---

### 三、實作方式

定義平台、Browser 平台、版本等列舉與介面，並提供預設的支援版本設定。

```ts
export enum SupportedBrowser {
  CHROME = "chrome",
  FIREFOX = "firefox",
  SAFARI = "safari",
  EDGE = "edge",
  SAMSUNG = "samsung",
  LINE = "line",
  UNKNOWN = "unknown", // 所有不支援的瀏覽器統一為 unknown
}

export enum Platform {
  DESKTOP = "desktop",
  MOBILE = "mobile",
  UNKNOWN = "unknown",
}

export interface BrowserCompatibilityConfig {
  enabled: boolean;
  supportedVersions: {
    chrome: string;
    firefox: string;
    safari: string;
    edge: string;
    samsung: string;
  };
}

export interface BrowserInfo {
  name: BrowserType;
  version: string;
  platform: Platform;
  isSupported: boolean;
  minimumVersion: string | null;
  userAgent: string;
}
```

Client Hints 與 User-Agent 偵測邏輯，並進行版本比對與支援判斷。

```ts
  /**
   * 使用 Client Hints (sec-ch-ua) 檢測瀏覽器
   * 這是更精確和隱私友好的方法，可以正確識別 Brave 等瀏覽器
   */
  private detectBrowserFromClientHints(): {
    name: BrowserType;
    version: string;
  } | null {
    try {
      // 檢查瀏覽器是否支援 Client Hints
      const navigator = this.windowRef.nativeWindow.navigator as any;

      if (navigator.userAgentData && navigator.userAgentData.brands) {
        const brands = navigator.userAgentData.brands;

        // 遍歷 brands 陣列，優先檢測特定瀏覽器
        for (const brand of brands) {
            // .... 省略部分代碼....
        }

        // 如果找到 Chromium，檢查是否為 Chrome
        const chromiumBrand = brands.find((b: any) =>
          b.brand.toLowerCase().includes('chromium')
        );
        if (chromiumBrand) {
          // 可能是基於 Chromium 的瀏覽器，但不在支援清單中
          return {
            name: SupportedBrowser.UNKNOWN,
            version: chromiumBrand.version,
          };
        }
      }
      return null;
    } catch (error) {
      console.warn('Client Hints detection failed:', error);
      return null;
    }
  }

    /**
     * 使用 User-Agent 字串檢測瀏覽器
     * 作為 Client Hints 不支援時的回退方案
     */
  private detectBrowser(userAgent: string): {
    name: BrowserType;
    version: string;
  } {
    // 只檢測支援的瀏覽器 - 其他一律視為不支援
    const supportedBrowserDetectors = [
      {
        condition: () =>
          (userAgent.includes('Chrome') || userAgent.includes('Safari')) &&
          !userAgent.includes('Edg') && // 不是 Edge
          !userAgent.includes('OPR') && // 不是 Opera
          !userAgent.includes('SamsungBrowser') && // 不是 Samsung
          !userAgent.includes('Brave') && // 不是 Brave
          userAgent.includes('Line'),
        browser: SupportedBrowser.LINE,
        versionRegex: /Line\/(\d+\.\d+\.\d+)/,
      },

      // 其他瀏覽器檢測
    ];

    // 檢測支援的瀏覽器
    for (const detector of supportedBrowserDetectors) {
      if (detector.condition()) {
        const match = userAgent.match(detector.versionRegex);
        const version = detector.customVersionProcessor
          ? detector.customVersionProcessor(match)
          : match
          ? match[1]
          : '0.0.0';

        return { name: detector.browser, version };
      }
    }

    // 所有其他瀏覽器都視為不支援
    return { name: SupportedBrowser.UNKNOWN, version: '0.0.0' };
  }

```

最後要將 Line Browser 自動打開 Default Browser 的功能僅加入 openExternalbrowser=1 即可

```ts

    if (browserInfo.name === SupportedBrowser.LINE) {
      const url = this.windowRef.nativeWindow.location.href;
      const targetUrl = new URL(url, window.location.origin);
      targetUrl.searchParams.set('openExternalBrowser', '1');
      this.windowRef.nativeWindow.location.replace(targetUrl.toString());
      setTimeout(() => {
        this.showIncompatibleBrowserError(browserInfo);
      }, 3000);
      return;
    }

```

---

## 四、結語

透過本模組的設計與實作，我們能夠有效地檢測並處理不同瀏覽器的相容性問題，特別是在行動裝置上使用 LINE 瀏覽器時，能夠自動引導用戶至預設瀏覽器，提升使用者體驗。未來可持續擴充支援更多瀏覽器及版本，並結合其他功能如 A/B 測試、升級提示等，進一步優化整體系統的穩定性與可用性。

- [detection-browser](https://github.com/JontCont/detection-browser)