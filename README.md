# HexoBlog

這是一個基於 Hexo 的靜態部落格專案，使用 pnpm 作為套件管理工具，並整合 nx 以提升開發體驗與專案管理。

## 專案特色
- 支援多主題（預設為 Butterfly）
- 整合多種 Hexo 外掛，支援音樂、相簿、社群分享等功能
- 使用 pnpm 提升安裝速度與一致性
- 可用 nx 管理多專案或複雜開發流程
- 適合個人技術筆記、生活雜記、團隊協作

## 開發流程
1. Fork 或 clone 此專案
2. 安裝依賴：
	```sh
	pnpm install
	```
3. 本地啟動預覽：
	```sh
	pnpm start
	```
4. 撰寫或修改內容於 `source/_posts/` 及相關資料夾
5. 產生靜態檔案：
	```sh
	pnpm build
	```
6. 部署到 GitHub Pages 或其他靜態主機：
	```sh
	pnpm deploy
	```

## 部署說明
- 預設使用 `hexo-deployer-git`，可自訂部署目標（如 GitHub Pages、Gitee、Vercel 等）
- 請於 `_config.yml` 設定 deploy 相關資訊
- 若需 CI/CD，建議搭配 GitHub Actions 或其他自動化工具

## 常見問題
- **安裝失敗或相依性錯誤**：請先執行 `pnpm store prune` 與 `pnpm cache clean --all`，再重新安裝
- **主題樣式異常**：請確認 `themes/` 目錄下主題版本與設定檔是否正確
- **部署無法顯示新內容**：請確認有執行 `pnpm build` 並正確 push 到遠端
- **nx 指令無效**：請確認已執行 `pnpm nx:init` 並安裝 nx 相關依賴

## 參考資源
- [Hexo 官方文件](https://hexo.io/zh-tw/docs/)
- [Butterfly 主題文件](https://butterfly.js.org/)
- [pnpm 官方文件](https://pnpm.io/zh/)
- [Nx 官方文件](https://nx.dev/)


## 主要技術
- [Hexo](https://hexo.io/)：靜態部落格框架
- [pnpm](https://pnpm.io/)：高效能套件管理工具
- [nx](https://nx.dev/)：單一或多專案管理工具

## 常用指令
| 指令            | 說明                       |
|-----------------|----------------------------|
| pnpm build      | 產生靜態網頁               |
| pnpm clean      | 清除 Hexo 暫存檔案         |
| pnpm deploy     | 部署網站                   |
| pnpm start      | 啟動本地開發伺服器         |
| pnpm nx:init    | 初始化 nx 設定             |

## 專案結構簡介
- `source/`：部落格內容與靜態資源
- `themes/`：主題相關檔案
- `package.json`：專案設定與指令
- `nx.json`：nx 設定檔
- `pnpm-lock.yaml`：pnpm 鎖定檔

## 初始化與安裝
1. 安裝依賴：
	```sh
	pnpm install
	```
2. 初始化 nx（如需）：
	```sh
	pnpm nx:init
	```

## 其他
如需更多 Hexo 或 nx 相關設定，請參考官方文件。
