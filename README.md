<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🥬 Ultimate Leek Simulator 2026

一個諷刺性的加密貨幣/股票交易模擬器遊戲，帶有復古終端機風格的 UI。

**線上遊玩**: [AI Studio Apps](https://ai.studio/apps/drive/1eKvJdVjdTN-NUjXHSP4InFAI-Wmr7Acd)

## 🚀 快速開始

### 先決條件

- [Node.js](https://nodejs.org/) 18+ (建議使用 LTS 版本)
- npm 或 yarn

### 安裝與執行

```bash
# 1. 安裝相依套件
npm install

# 2. 啟動開發伺服器
npm run dev
```

開發伺服器預設運行在 `http://localhost:3000`

### 建置生產版本

```bash
npm run build
npm run preview  # 預覽建置結果
```

## 🌐 部署到 GitHub Pages

本專案已設定好 GitHub Actions 自動部署工作流程。

### 設定步驟

1. **建立 GitHub Repository** 並推送程式碼

2. **啟用 GitHub Pages**
   - 前往 Repository → Settings → Pages
   - Source 選擇 "GitHub Actions"

3. **推送到 main 分支**
   - 推送後會自動觸發部署
   - 前往 Actions 頁面查看部署進度

部署完成後，網站會自動發布到 `https://<username>.github.io/<repository-name>/`

## 📁 專案結構

```
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions 部署設定
├── components/           # React 元件
├── utils/               # 工具函式
├── src/                 # 其他原始碼
├── App.tsx              # 主要應用程式元件
├── index.html           # HTML 入口
├── index.tsx            # React 入口
├── vite.config.ts       # Vite 設定
├── tsconfig.json        # TypeScript 設定
└── package.json         # 專案設定與相依套件
```

## 🛠️ 技術棧

- **框架**: React 19 + TypeScript
- **建置工具**: Vite 6
- **樣式**: Tailwind CSS (CDN)
- **圖示**: Lucide React
- **其他**: html-to-image (證書截圖功能)

## 📜 授權

MIT License
