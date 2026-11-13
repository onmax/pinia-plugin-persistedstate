import type { Pinia, PiniaPluginContext, StateTree } from 'pinia'
import { defineNuxtPlugin, useNuxtApp, useRuntimeConfig } from '#app'
import { createPersistence, parsePersistKey } from './core'
import { storages } from './storages'

function piniaPlugin(context: PiniaPluginContext) {
  const config = useRuntimeConfig()
  const options = config.public.piniaPluginPersistedstate

  const unsubscribe = createPersistence(
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
          deserialize: data => JSON.parse(data) as StateTree,
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

  // `app:rendered` runs on the server only. A watcher left running there keeps the
  // whole app reachable from any long-lived object in the store's state.
  if (unsubscribe)
    useNuxtApp().hook('app:rendered', unsubscribe)
}

export default defineNuxtPlugin({
  name: 'pinia-plugin-persistedstate',
  setup({ $pinia }) {
    ($pinia as Pinia).use(piniaPlugin)
  },
})
