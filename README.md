# Hibiki Kobayashi — White Portfolio v3

Next.js 15 / React 19 portfolio. Responsive white editorial design; animated scroll indicator, filter/search/sort activity ledger, details modal, dynamic portfolio API, GitHub public event feed.

## Run

```bash
npm install
npm run dev
```

## Features
- GET `/api/portfolio` responds dynamically with portfolio entries and retrieval time.
- GET `/api/github` fetches real recent **public** GitHub events (gracefully handles rate limits).
- Search, filter, sort, detail modal work on client.
- Every achievement and project includes an actual HTTPS reference.
- White-centered visual design and user-provided portrait.

## Updating achievements
Modify `lib/portfolio.json`. The app API serves that data and the client fetches it at runtime.

## Editorial notes
- JOC 40th has summer (2017) and spring (2018) water polo editions. Until the participant confirms which, a general Japan Aquatics link is deliberately used instead of claiming evidence of a specific award.
- Some employer/related organization links (notably 精密編集 and LLMatch) are provisional; please check appropriate exact sources before public launch.
- Project details should be limited to information the user authorizes publicly.
- Portfolio v3 is currently a local preview, not deployed to existing Vercel site.

## GitHub を正本（source of truth）として運用する

このリポジトリをGitHubで管理し、VercelへGit連携してデプロイします。
編集は `main` へ直接入れず、featureブランチ → Pull Request → review → merge を推奨します。

```bash
# 最初の一度だけ（GitHubに空リポジトリを作成後）
git init
git add .
git commit -m "Initial portfolio v3"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/bashi-engineering-portfolio.git
git push -u origin main

# 以降の変更
git switch -c feat/update-achievements
# lib/portfolio.json などを編集
git add .
git commit -m "Update achievements"
git push -u origin feat/update-achievements
# GitHub 上で Pull Request を作成し、確認後に main にマージ
```

Vercelの既存プロジェクト `bashi-engineering-portfolio` で、Settings → Git から
このリポジトリを接続してください。既存の本番URLはそのまま利用します。

※ `app/api/github` は公開GitHubイベントの取得用であり、GitHubのコード管理とは別機能です。
※ 公開前に `lib/portfolio.json` の外部URL、経歴情報を本人確認してください。
