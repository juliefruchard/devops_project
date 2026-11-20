import { JSDOM } from 'jsdom'
import '@testing-library/jest-dom/vitest'

const browserStorage = new JSDOM('', { url: 'http://localhost/' }).window
  .localStorage

Object.defineProperty(window, 'localStorage', {
  configurable: true,
  value: browserStorage,
})
