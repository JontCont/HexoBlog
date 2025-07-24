1. 請將 app.js 中的 HTML 網頁改放到放在 `public` 資料夾中管理

2. 設計一個精美的 Hello World 網頁

3. 讓 Node.js 即時偵測我的所有變更，自動重新啟動網站

4. 使用 `chokidar` 實作 Live Reload 機制，網頁內容更新時可以主動通知瀏覽器自動刷新

    ```js
    const watcher = chokidar.watch('public', { ignored: /(^|[\/\\])\../, persistent: true });
    ```

5. 加入一個 SPA 常見的功能，讓所有 HTTP Request 找不到檔案的 endpoint 都自動開啟 index.html

6. 加入一些常見腳本到 package.json

Let's do this step by step.
