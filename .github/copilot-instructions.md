# Copilot Instructions for HexoBlog

## Project Overview
- **HexoBlog** is a static blog project powered by [Hexo](https://hexo.io/), using `pnpm` for package management and `nx` for workspace/project orchestration.
- Content lives in `source/_posts/` (Markdown files for blog posts) and related subfolders for static assets.
- The default theme is [Butterfly](https://butterfly.js.org/), located in `themes/butterfly/`.

## Key Workflows
- **Install dependencies:**
  ```sh
  pnpm install
  ```
- **Initialize nx (if needed):**
  ```sh
  pnpm nx:init
  ```
- **Start local dev server:**
  ```sh
  pnpm start
  ```
- **Build static site:**
  ```sh
  pnpm build
  ```
- **Deploy to GitHub Pages or other static hosts:**
  ```sh
  pnpm deploy
  ```
- **Clean cache and temp files:**
  ```sh
  pnpm clean
  ```

## Directory Structure
- `source/_posts/` — Main blog content (Markdown)
- `themes/` — Theme files (Butterfly is default)
- `scaffolds/` — Templates for new posts/pages
- `package.json` — Project scripts and dependencies
- `nx.json` — nx workspace configuration
- `_config.yml` — Hexo main config

## Project Conventions
- Use `pnpm` for all dependency and script management (not npm/yarn).
- Blog posts must be placed in `source/_posts/` and follow Hexo's Markdown front-matter format.
- Theme customizations should be made in `themes/butterfly/` or via `_config.butterfly.yml`.
- For deployment, the default is `hexo-deployer-git` (configurable in `_config.yml`).
- If nx commands fail, ensure `pnpm nx:init` has been run and nx dependencies are installed.

## Troubleshooting
- If install fails, run `pnpm store prune` and `pnpm cache clean --all` before retrying.
- If theme/style issues occur, verify theme version and config files.
- If deploy does not show new content, ensure `pnpm build` and git push are completed.

## References
- [Hexo Docs](https://hexo.io/zh-tw/docs/)
- [Butterfly Theme Docs](https://butterfly.js.org/)
- [pnpm Docs](https://pnpm.io/zh/)
- [Nx Docs](https://nx.dev/)

## Example: Adding a New Blog Post
1. Copy `scaffolds/post.md` to `source/_posts/` and rename appropriately.
2. Edit front-matter and content as needed.
3. Run `pnpm start` to preview locally.
4. Commit and push changes, then run `pnpm deploy` to publish.

---
For project-specific blog post conventions, see `.github/instructions/create-blog.instructions.md`.
