import type { StorageLike } from '../src/index'
import { createPinia, defineStore, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { createApp, nextTick, ref } from 'vue'
import { createPersistedState } from '../src/index'

function initializeLocalStorage(
  KEY: string,
  state: Record<string, unknown>,
): void {
  localStorage.clear()
  localStorage.setItem(KEY, JSON.stringify(state))
}

function readLocalStoage(KEY: string): Record<string, unknown> {
  return JSON.parse(localStorage.getItem(KEY) ?? '{}')
}

const KEY = 'mock-store'

beforeEach(() => {
  let state: Record<string, string> = {}
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: vi.fn(KEY => state[KEY]),
      setItem: vi.fn((KEY, value) => {
        state[KEY] = value
      }),
      removeItem: vi.fn(KEY => delete state[KEY]),
      clear: vi.fn(() => {
        state = {}
      }),
    },
  })
})

describe('default', () => {
  beforeEach(() => {
    const app = createApp({})
    const pinia = createPinia()
    pinia.use(createPersistedState())
    app.use(pinia)
    setActivePinia(pinia)
  })

  describe('disabled', () => {
    const useStore = defineStore(KEY, {
      state: () => ({ lorem: '' }),
    })

    it('does not persist store', async () => {
      const store = useStore()

      store.lorem = 'ipsum'
      await nextTick()

      expect(readLocalStoage(KEY)).toEqual({})
      expect(localStorage.setItem).not.toHaveBeenCalled()
    })

    it('does not rehydrate store', async () => {
      initializeLocalStorage(KEY, { lorem: 'ipsum' })

      await nextTick()
      const store = useStore()

      expect(store.lorem).toEqual('')
      expect(localStorage.getItem).not.toHaveBeenCalled()
    })
  })

  describe('default settings', () => {
    const useStore = defineStore(KEY, {
      state: () => ({ lorem: '' }),
      persist: true,
    })

    it('persists store in localStorage', async () => {
      const store = useStore()

      store.lorem = 'ipsum'
      await nextTick()

      expect(readLocalStoage(KEY)).toEqual({ lorem: 'ipsum' })
      expect(localStorage.setItem).toHaveBeenCalledWith(
        KEY,
        JSON.stringify({ lorem: 'ipsum' }),
      )
    })

    it('rehydrates store from localStorage', async () => {
      initializeLocalStorage(KEY, { lorem: 'ipsum' })

      await nextTick()
      const store = useStore()

      expect(store.lorem).toEqual('ipsum')
      expect(localStorage.getItem).toHaveBeenCalledWith(KEY)
    })
  })

  describe('setup function syntax', () => {
    const useStore = defineStore(KEY, () => ({ lorem: ref('') }), {
      persist: true,
    })

    it('persists store in localStorage', async () => {
      const store = useStore()

      store.lorem = 'ipsum'
      await nextTick()

      expect(readLocalStoage(KEY)).toEqual({ lorem: 'ipsum' })
      expect(localStorage.setItem).toHaveBeenCalledWith(
        KEY,
        JSON.stringify({ lorem: 'ipsum' }),
      )
    })

    it('restore manually', async () => {
      const store = useStore()

      localStorage.setItem(KEY, JSON.stringify({ lorem: 'ipsum' }))
      await nextTick()

      expect(store.lorem).toEqual('')

      store.$hydrate()
      await nextTick()

      expect(store.lorem).toEqual('ipsum')
    })

    it('rehydrates store from localStorage', async () => {
      initializeLocalStorage(KEY, { lorem: 'ipsum' })

      await nextTick()
      const store = useStore()

      expect(store.lorem).toEqual('ipsum')
      expect(localStorage.getItem).toHaveBeenCalledWith(KEY)
    })
  })

  describe('w/ key', () => {
    const useStore = defineStore(KEY, {
      state: () => ({ lorem: '' }),
      persist: { key: 'mock' },
    })

    it('persists store in localStorage under given KEY', async () => {
      const store = useStore()

      store.lorem = 'ipsum'
      await nextTick()

      expect(readLocalStoage('mock')).toEqual({ lorem: 'ipsum' })
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'mock',
        JSON.stringify({ lorem: 'ipsum' }),
      )
    })

    it('rehydrates store from localStorage under given KEY', async () => {
      initializeLocalStorage('mock', { lorem: 'ipsum' })

      await nextTick()
      const store = useStore()

      expect(store.lorem).toEqual('ipsum')
      expect(localStorage.getItem).toHaveBeenCalledWith('mock')
    })
  })

  describe('w/ key function', () => {
    const useStore = defineStore(KEY, {
      state: () => ({ lorem: '' }),
      persist: { key: (str) => { return `prefixed-${str}` } },
    })

    it('persists store in localStorage under given KEY', async () => {
      const store = useStore()

      store.lorem = 'ipsum'
      await nextTick()

      expect(readLocalStoage(`prefixed-${KEY}`)).toEqual({ lorem: 'ipsum' })
      expect(localStorage.setItem).toHaveBeenCalledWith(
        `prefixed-${KEY}`,
        JSON.stringify({ lorem: 'ipsum' }),
      )
    })

    it('rehydrates store from localStorage under given KEY', async () => {
      initializeLocalStorage(`prefixed-${KEY}`, { lorem: 'ipsum' })

      await nextTick()
      const store = useStore()

      expect(store.lorem).toEqual('ipsum')
      expect(localStorage.getItem).toHaveBeenCalledWith(`prefixed-${KEY}`)
    })
  })

  describe('w/ pick', () => {
    const useStore = defineStore(KEY, {
      state: () => ({
        lorem: '',
        dolor: {
          sit: '',
          consectetur: {
            adipiscing: '',
          },
        },
      }),
      persist: {
        pick: ['lorem', 'dolor.consectetur.adipiscing'],
      },
    })

    it('persists store paths in localStorage', async () => {
      const store = useStore()

      store.lorem = 'ipsum'
      store.dolor.sit = 'amet'
      store.dolor.consectetur.adipiscing = 'elit'
      await nextTick()

      expect(readLocalStoage(KEY)).toEqual({
        lorem: 'ipsum',
        dolor: { consectetur: { adipiscing: 'elit' } },
      })
      expect(localStorage.setItem).toHaveBeenCalledWith(
        KEY,
        JSON.stringify({
          lorem: 'ipsum',
          dolor: { consectetur: { adipiscing: 'elit' } },
        }),
      )
    })

    it('rehydrates store paths from localStorage', async () => {
      initializeLocalStorage(KEY, {
        lorem: 'ipsum',
        dolor: { consectetur: { adipiscing: 'elit' } },
      })

      await nextTick()
      const store = useStore()

      expect(store.lorem).toEqual('ipsum')
      expect(store.dolor.consectetur.adipiscing).toEqual('elit')
      expect(localStorage.getItem).toHaveBeenCalledWith(KEY)
    })
  })

  describe('w/ omit', () => {
    const useStore = defineStore(KEY, {
      state: () => ({
        lorem: '',
        dolor: {
          sit: '',
          consectetur: {
            adipiscing: '',
          },
        },
      }),
      persist: {
        omit: ['lorem', 'dolor.consectetur'],
      },
    })

    it('persists store paths in localStorage', async () => {
      const store = useStore()

      store.lorem = 'ipsum'
      store.dolor.sit = 'amet'
      store.dolor.consectetur.adipiscing = 'elit'
      await nextTick()

      expect(readLocalStoage(KEY)).toEqual({
        dolor: { sit: 'amet' },
      })
      expect(localStorage.setItem).toHaveBeenCalledWith(
        KEY,
        JSON.stringify({
          dolor: { sit: 'amet' },
        }),
      )
    })

    it('rehydrates store paths from localStorage', async () => {
      initializeLocalStorage(KEY, {
        dolor: { sit: 'amet' },
      })

      await nextTick()
      const store = useStore()

      expect(store.dolor.sit).toEqual('amet')
      expect(localStorage.getItem).toHaveBeenCalledWith(KEY)
    })
  })

  describe('w/ storage', () => {
    let stored: Record<string, string>
    const storage = {
      getItem: vi.fn(key => stored[key] ?? null),
      setItem: vi.fn((key, value) => {
        stored[key] = value
      }),
    } satisfies StorageLike

    const useStore = defineStore(KEY, {
      state: () => ({ lorem: '' }),
      persist: { storage },
    })

    it('persists to given storage', async () => {
      stored = {}
      const store = useStore()

      store.lorem = 'ipsum'
      await nextTick()

      expect(stored[KEY]).toEqual('{"lorem":"ipsum"}')
      expect(storage.setItem).toHaveBeenCalled()
    })

    it('rehydrates from given storage', () => {
      stored = { [KEY]: '{"lorem":"ipsum"}' }

      const store = useStore()

      expect(store.lorem).toEqual('ipsum')
      expect(storage.getItem).toHaveBeenCalled()
    })

    it('catches storage.get errors', () => {
      storage.getItem.mockImplementationOnce(() => {
        throw new Error('get_error')
      })

      expect(() => useStore()).not.toThrow()
    })

    it('catches storage.set errors', () => {
      storage.setItem.mockImplementationOnce(() => {
        throw new Error('set_error')
      })

      expect(() => {
        useStore().lorem = 'fail'
      }).not.toThrow()
    })
  })

  describe('w/ hooks', () => {
    const beforeHydrate = vi.fn((ctx) => {
      ctx.store.before = 'before'
    })
    const afterHydrate = vi.fn((ctx) => {
      ctx.store.after = 'after'
    })
    const useStore = defineStore(KEY, {
      state: () => ({
        lorem: '',
        before: '',
        after: '',
      }),
      persist: { beforeHydrate, afterHydrate },
    })

    it('runs hooks before and after hydration', async () => {
      initializeLocalStorage(KEY, { lorem: 'ipsum' })

      await nextTick()
      const store = useStore()

      expect(store.lorem).toEqual('ipsum')
      expect(beforeHydrate).toHaveBeenCalled()
      expect(store.before).toEqual('before')
      expect(afterHydrate).toHaveBeenCalled()
      expect(store.after).toEqual('after')
    })
  })

  describe('w/ serializer', () => {
    it('deserializes', async () => {
      initializeLocalStorage(KEY, { lorem: 'ipsum' })
      const deserialize = vi.fn(JSON.parse)
      const useStore = defineStore(KEY, {
        state: () => ({ lorem: '' }),
        persist: {
          serializer: {
            serialize: JSON.stringify,
            deserialize,
          },
        },
      })

      await nextTick()
      useStore()

      expect(deserialize).toHaveBeenCalledWith(localStorage.getItem(KEY))
      expect(deserialize).toHaveReturnedWith({ lorem: 'ipsum' })
    })

    it('serializes', async () => {
      const serialize = vi.fn(JSON.stringify)
      const useStore = defineStore(KEY, {
        state: () => ({ lorem: 'ipsum' }),
        persist: {
          serializer: {
            serialize,
            deserialize: JSON.parse,
          },
        },
      })
      const store = useStore()

      store.lorem = 'dolor'
      await nextTick()

      expect(serialize).toHaveBeenCalledWith({ lorem: 'dolor' })
      expect(serialize).toHaveReturnedWith(localStorage.getItem(KEY))
    })
  })

  describe('w/ debug', () => {
    it.skip('error logs creation errors (storage permissions)', () => {
      const error = new Error('access_denied')
      Object.defineProperty(window, 'localStorage', {
        get: () => { throw error },
      })
      const spy = vi
        .spyOn(globalThis.console, 'error')
        .mockImplementationOnce(() => {})
      const useStore = defineStore(KEY, {
        state: () => ({ lorem: '' }),
        persist: {
          debug: true,
        },
      })

      useStore()

      expect(spy).toHaveBeenCalledWith('[pinia-plugin-persistedstate]', error)
    })

    it('error logs hydration errors', () => {
      const error = new Error('failed_hydration')
      const spy = vi
        .spyOn(globalThis.console, 'error')
        .mockImplementationOnce(() => {})
      const useStore = defineStore(KEY, {
        state: () => ({ lorem: '' }),
        persist: {
          storage: {
            getItem: () => {
              throw error
            },
            setItem: localStorage.setItem,
          },
          debug: true,
        },
      })

      useStore()

      expect(spy).toHaveBeenCalledWith('[pinia-plugin-persistedstate]', error)
    })

    it('error logs persistence errors', async () => {
      const error = new Error('failed_persistence')
      const spy = vi
        .spyOn(globalThis.console, 'error')
        .mockImplementationOnce(() => {})
      const useStore = defineStore(KEY, {
        state: () => ({ lorem: '' }),
        persist: {
          storage: {
            getItem: localStorage.getItem,
            setItem: () => {
              throw error
            },
          },
          debug: true,
        },
      })

      const store = useStore()
      store.lorem = 'ipsum'
      await nextTick()

      expect(spy).toHaveBeenCalledWith('[pinia-plugin-persistedstate]', error)
    })
  })

  describe('multiple persistences', () => {
    let stored1: Record<string, string>
    const storage1 = {
      getItem: vi.fn(key => stored1[key] ?? null),
      setItem: vi.fn((key, value) => {
        stored1[key] = value
      }),
    } satisfies StorageLike
    let stored2: Record<string, string>
    const storage2 = {
      getItem: vi.fn(key => stored2[key] ?? null),
      setItem: vi.fn((key, value) => {
        stored2[key] = value
      }),
    } satisfies StorageLike

    const useStore = defineStore(KEY, {
      state: () => ({
        s1: '',
        s2: '',
      }),
      persist: [
        { storage: storage1, pick: ['s1'] },
        { storage: storage2, pick: ['s2'] },
      ],
    })

    it('persists to different storages', async () => {
      stored1 = {}
      stored2 = {}
      const store = useStore()

      store.s1 = 'lorem'
      store.s2 = 'ipsum'
      await nextTick()

      expect(stored1[KEY]).toEqual('{"s1":"lorem"}')
      expect(stored2[KEY]).toEqual('{"s2":"ipsum"}')
      expect(storage1.setItem).toHaveBeenCalledWith(
        'mock-store',
        '{"s1":"lorem"}',
      )
      expect(storage2.setItem).toHaveBeenCalledWith(
        'mock-store',
        '{"s2":"ipsum"}',
      )
    })
  })

  describe('$hydrate', () => {
    const beforeHydrate = vi.fn()
    const afterHydrate = vi.fn()
    const useStore = defineStore(KEY, {
      state: () => ({ lorem: '' }),
      persist: { beforeHydrate, afterHydrate },
    })

    it('rehydrates with storage data call', async () => {
      const store = useStore()
      initializeLocalStorage(KEY, { lorem: 'ipsum' })
      await nextTick()

      store.$hydrate()

      expect(store.lorem).toEqual('ipsum')
      expect(beforeHydrate).toHaveBeenCalled()
      expect(afterHydrate).toHaveBeenCalled()
      expect(localStorage.getItem).toHaveNthReturnedWith(1, undefined)
      expect(localStorage.getItem).toHaveNthReturnedWith(2, '{"lorem":"ipsum"}')
    })

    it('ignores hooks on runHooks=false', () => {
      const store = useStore()
      beforeHydrate.mockClear()
      afterHydrate.mockClear()

      store.$hydrate({ runHooks: false })

      expect(beforeHydrate).not.toHaveBeenCalled()
      expect(afterHydrate).not.toHaveBeenCalled()
    })
  })

  describe('$persist', () => {
    const useStore = defineStore(KEY, {
      state: () => ({ lorem: 'ipsum' }),
      persist: true,
    })

    it('persists store on call', () => {
      const store = useStore()
      localStorage.clear()

      store.$persist()

      expect(readLocalStoage(KEY)).toEqual({ lorem: 'ipsum' })
    })
  })
})

describe('w/ global options', () => {
  it('uses global options', async () => {
    initializeLocalStorage(KEY, { lorem: 'ipsum' })
    const afterHydrate = vi.fn()
    const beforeHydrate = vi.fn()
    const storage = {
      getItem: vi.fn(localStorage.getItem),
      setItem: vi.fn(localStorage.setItem),
    } satisfies StorageLike
    const serializer = {
      serialize: vi.fn(JSON.stringify),
      deserialize: vi.fn(JSON.parse),
    }
    const app = createApp({})
    const pinia = createPinia()

    pinia.use(
      createPersistedState({
        afterHydrate,
        beforeHydrate,
        storage,
        serializer,
      }),
    )
    app.use(pinia)
    setActivePinia(pinia)
    const useStore = defineStore(KEY, {
      state: () => ({ lorem: '' }),
      persist: true,
    })
    const store = useStore()
    store.lorem = 'dolor'
    await nextTick()

    expect(beforeHydrate).toHaveBeenCalledOnce()
    expect(afterHydrate).toHaveBeenCalledOnce()
    expect(storage.getItem).toHaveBeenCalledOnce()
    expect(storage.setItem).toHaveBeenCalledOnce()
    expect(serializer.serialize).toHaveBeenCalledOnce()
    expect(serializer.deserialize).toHaveBeenCalledOnce()
  })

  it('gets overriden by store options', async () => {
    initializeLocalStorage(KEY, { lorem: 'ipsum' })
    const afterHydrate = vi.fn()
    const beforeHydrate = vi.fn()
    const storage = {
      getItem: vi.fn(localStorage.getItem),
      setItem: vi.fn(localStorage.setItem),
    } satisfies StorageLike
    const serializer = {
      serialize: vi.fn(JSON.stringify),
      deserialize: vi.fn(JSON.parse),
    }
    const app = createApp({})
    const pinia = createPinia()
    pinia.use(
      createPersistedState({
        afterHydrate: vi.fn(),
        beforeHydrate: vi.fn(),
        storage: localStorage,
        serializer: {
          serialize: JSON.stringify,
          deserialize: JSON.parse,
        },
      }),
    )
    app.use(pinia)
    setActivePinia(pinia)

    const useStore = defineStore(KEY, {
      state: () => ({ lorem: '' }),
      persist: {
        afterHydrate,
        beforeHydrate,
        storage,
        serializer,
      },
    })
    const store = useStore()
    store.lorem = 'dolor'
    await nextTick()

    expect(beforeHydrate).toHaveBeenCalledOnce()
    expect(afterHydrate).toHaveBeenCalledOnce()
    expect(storage.getItem).toHaveBeenCalledOnce()
    expect(storage.setItem).toHaveBeenCalledOnce()
    expect(serializer.serialize).toHaveBeenCalledOnce()
    expect(serializer.deserialize).toHaveBeenCalledOnce()
  })

  it('uses key factory', async () => {
    const app = createApp({})
    const pinia = createPinia()
    pinia.use(
      createPersistedState({
        key: id => `__persisted_${id}`,
      }),
    )
    app.use(pinia)
    setActivePinia(pinia)

    const useStore = defineStore(KEY, {
      state: () => ({ lorem: '' }),
      persist: true,
    })
    const store = useStore()
    store.lorem = 'dolor'
    await nextTick()

    expect(readLocalStoage(KEY)).toEqual({})
    expect(readLocalStoage(`__persisted_${KEY}`))
      .toEqual({ lorem: 'dolor' })
  })
})

describe('auto mode', () => {
  beforeEach(() => {
    const app = createApp({})
    const pinia = createPinia()
    pinia.use(createPersistedState({ auto: true }))
    app.use(pinia)
    setActivePinia(pinia)
  })

  it('persists automatically', async () => {
    //* arrange
    const useStore = defineStore(KEY, {
      state: () => ({ lorem: '' }),
    })
    const store = useStore()

    //* act
    store.lorem = 'ipsum'
    await nextTick()

    //* assert
    expect(readLocalStoage(KEY)).toEqual({ lorem: 'ipsum' })
    expect(localStorage.setItem).toHaveBeenCalledWith(
      KEY,
      JSON.stringify({ lorem: 'ipsum' }),
    )
  })

  it('rehydrates automatically', async () => {
    const useStore = defineStore(KEY, {
      state: () => ({ lorem: '' }),
    })
    initializeLocalStorage(KEY, { lorem: 'ipsum' })

    await nextTick()
    const store = useStore()

    expect(store.lorem).toEqual('ipsum')
    expect(localStorage.getItem).toHaveBeenCalledWith(KEY)
  })

  it('opts-out of persistence', async () => {
    const useStore = defineStore(KEY, {
      state: () => ({ lorem: '' }),
      persist: false,
    })
    const store = useStore()

    store.lorem = 'ipsum'
    await nextTick()

    expect(readLocalStoage(KEY)).toEqual({})
    expect(localStorage.setItem).not.toHaveBeenCalled()
  })

  it('opts-out of rehydration', async () => {
    const useStore = defineStore(KEY, {
      state: () => ({ lorem: '' }),
      persist: false,
    })
    initializeLocalStorage(KEY, { lorem: 'ipsum' })

    await nextTick()
    const store = useStore()

    expect(store.lorem).toEqual('')
    expect(localStorage.getItem).not.toHaveBeenCalled()
  })
})
