import type { PiniaPluginContext, StateTree, Store, StoreGeneric } from 'pinia'
import type { Persistence, PersistenceOptions } from '../types'
import { deepOmit, deepPick } from './utils'

function hydrateStore(
  store: Store,
  {
    storage,
    serializer,
    key,
    debug,
    pick,
    omit,
    beforeHydrate,
    afterHydrate,
    onHydrateError,
  }: Persistence,
  context: PiniaPluginContext,
  runHooks = true,
) {
  try {
    if (runHooks)
      beforeHydrate?.(context)

    const fromStorage = storage.getItem(key)
    if (fromStorage) {
      const deserialized = serializer.deserialize(fromStorage)
      const picked = pick
        ? deepPick(deserialized, pick)

        : deserialized
      const omitted = omit
        ? deepOmit(picked, omit)
        : picked
      store.$patch(omitted)
    }

    if (runHooks)
      afterHydrate?.(context)
  }
  catch (error) {
    if (debug)
      console.error('[pinia-plugin-persistedstate]', error)
    if (onHydrateError)
      onHydrateError(error as Error, store)
  }
}

function persistState(
  state: StateTree,
  {
    storage,
    serializer,
    key,
    debug,
    pick,
    omit,
    onPersistError,
  }: Persistence,
  context: PiniaPluginContext,
) {
  try {
    const picked = pick
      ? deepPick(state, pick)
      : state
    const omitted = omit
      ? deepOmit(picked, omit)
      : picked
    const toStorage = serializer.serialize(omitted)
    storage.setItem(key, toStorage)
  }
  catch (error) {
    if (debug)
      console.error('[pinia-plugin-persistedstate]', error)
    if (onPersistError)
      onPersistError(error as Error, context.store)
  }
}

export function parsePersistKey(
  key: PersistenceOptions['key'],
  storeId: string,
) {
  return typeof key === 'function'
    ? key(storeId)
    : typeof key === 'string'
      ? key
      : storeId
}

export function createPersistence(
  context: PiniaPluginContext,
  optionsParser: (p: PersistenceOptions) => Persistence,
  auto: boolean,
) {
  const { pinia, store, options: { persist = auto } } = context

  if (!persist)
    return

  // HMR handling, ignore stores created as 'hot' stores
  // v8 ignore if -- @preserve
  if (!(store.$id in pinia.state.value)) {
    // @ts-expect-error `_s` is a stripped @internal
    const originalStore = (pinia._s as Map<string, StoreGeneric>).get(store.$id.replace('__hot:', ''))
    if (originalStore)
      void Promise.resolve().then(() => originalStore.$persist())
    return
  }

  const persistenceOptions = Array.isArray(persist)
    ? persist
    : persist === true
      ? [{}]
      : [persist]

  const persistences = persistenceOptions.map(optionsParser)

  store.$hydrate = ({ runHooks = true } = {}) => {
    persistences.forEach((p) => {
      hydrateStore(store, p, context, runHooks)
    })
  }

  store.$persist = () => {
    persistences.forEach((p) => {
      persistState(store.$state, p, context)
    })
  }

  persistences.forEach((p) => {
    hydrateStore(store, p, context)

    store.$subscribe(
      (_mutation, state) => persistState(state, p, context),
      { detached: true },
    )
  })
}
