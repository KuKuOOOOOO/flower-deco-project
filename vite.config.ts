import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ 換成你的 GitHub repo 名稱
const repoName = 'flower-deco-project'

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
})