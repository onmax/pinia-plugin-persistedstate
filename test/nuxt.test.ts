import type { NuxtApp } from '#app'
import { createPinia, defineStore, setActivePinia } from 'pinia'
import { expect, it, vi } from 'vitest'
import { createApp, nextTick } from 'vue'
import nuxtPlugin from '../src/runtime/plugin'

const nuxtApp = vi.hoisted(() => {
  const hooks: Record<string, Array<() => void>> = {}
  return {
    hook: (name: string, fn: () => void) => {
      (hooks[name] ??= []).push(fn)
    },
    callHook: (name: string) => hooks[name]?.forEach(fn => fn()),
  }
})

vi.mock('#app', () => ({
  defineNuxtPlugin: (plugin: unknown) => plugin,
  useNuxtApp: () => nuxtApp,
  useRuntimeConfig: () => ({ public: { piniaPluginPersistedstate: {} } }),
}))

it('stops persisting once the server render is done', async () => {
  const pinia = createPinia()
  createApp({}).use(pinia)
  setActivePinia(pinia)
  nuxtPlugin.setup?.({ $pinia: pinia } as unknown as NuxtApp)

  const storage = { getItem: vi.fn(), setItem: vi.fn() }
  const store = defineStore('nuxt', {
    state: () => ({ lorem: '' }),
    persist: { storage },
  })()

  store.lorem = 'ipsum'
  await nextTick()
  expect(storage.setItem).toHaveBeenCalledTimes(1)

  nuxtApp.callHook('app:rendered')
  store.lorem = 'dolor'
  await nextTick()
  expect(storage.setItem).toHaveBeenCalledTimes(1)
})
