import path from 'path'
import { defineConfig } from 'vitest/config'


export default defineConfig({

  test: {
    include: ['src/tests/unitTests/**/*.test.ts'],
    threads: false,
  },

  resolve: {

    alias: {

        '~': path.resolve(__dirname, './src')

    }

  }

})