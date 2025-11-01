import type { PiniaPluginContext } from 'pinia'
import type { PersistenceOptions, Serializer, StorageLike } from './types'
import { destr } from 'destr'
import { createPersistence, parsePersistKey } from './runtime/core'

export type { PersistenceOptions, Serializer, StorageLike }

/**
 * Options passed to `createPersistedState` to apply globally.
 */
export type PluginOptions = Pick<
  PersistenceOptions,
  'storage' | 'debug' | 'serializer' | 'afterHydrate' | 'beforeHydrate'
> & {
  /**
   * Global key generator, allow pre/postfixing store keys.
   */
  key?: (storeKey: string) => string

  /**
   * Automatically persist all stores with global defaults, opt-out individually.
   */
  auto?: boolean
}

/**
 * Create a Pinia persistence plugin.
 * @see https://codeberg.org/praz/pinia-plugin-persistedstate
 */
export function createPersistedState(options: PluginOptions = {}) {
  return function (context: PiniaPluginContext) {
    createPersistence(
      context,
      (p) => {
        const persistKey = parsePersistKey(p.key, context.store.$id)

        return {
          key: (options.key ? options.key : (x: string) => x)(persistKey),
          debug: p.debug ?? options.debug ?? false,
          serializer: p.serializer ?? options.serializer ?? {
            serialize: data => JSON.stringify(data),
            deserialize: data => destr(data),
          },
          storage: p.storage ?? options.storage ?? window.localStorage,
          beforeHydrate: p.beforeHydrate ?? options.beforeHydrate,
          afterHydrate: p.afterHydrate ?? options.afterHydrate,
          pick: p.pick,
          omit: p.omit,
        }
      },
      options.auto ?? false,
    )
  }
}

/**
 * Pinia plugin to persist stores.
 * @see https://codeberg.org/praz/pinia-plugin-persistedstate
 */
export default createPersistedState()
