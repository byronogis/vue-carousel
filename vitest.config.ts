import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import ViteConfig from './vite.config'

export default mergeConfig(ViteConfig, defineConfig({
  test: {
    environment: 'happy-dom',
  },
}))
