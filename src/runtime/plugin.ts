import type { Pinia, PiniaPluginContext } from 'pinia'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { destr } from 'destr'
import { createPersistence, parsePersistKey } from './core'
import { storages } from './storages'

function piniaPlugin(context: PiniaPluginContext) {
  const config = useRuntimeConfig()
  const options = config.public.piniaPluginPersistedstate

  createPersistence(
    context,
    (p) => {
      const persistKey = parsePersistKey(p.key, context.store.$id)

      return {
        key: options.key
          ? options.key.replace(/%id/g, persistKey)
          : persistKey,
        debug: p.debug ?? options.debug ?? false,
        serializer: p.serializer ?? {
          serialize: data => JSON.stringify(data),
          deserialize: data => destr(data),
        },
        storage: p.storage ?? (options.storage
          ? options.storage === 'cookies'
            ? storages.cookies(options.cookieOptions)
            : storages[options.storage]()
          : storages.cookies()),
        beforeHydrate: p.beforeHydrate,
        afterHydrate: p.afterHydrate,
        pick: p.pick,
        omit: p.omit,
      }
    },
    options.auto ?? false,
  )
}

export default defineNuxtPlugin({
  name: 'pinia-plugin-persistedstate',
  setup({ $pinia }) {
    ($pinia as Pinia).use(piniaPlugin)
  },
})
