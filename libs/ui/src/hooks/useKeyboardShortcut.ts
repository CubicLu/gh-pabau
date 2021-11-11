import { useEffect, useCallback, useReducer } from 'react'

const blacklistedTargets = new Set(['INPUT', 'TEXTAREA'])

function disabledEventPropagation(e) {
  if (e) {
    if (e.stopPropagation) {
      e.stopPropagation()
    } else if (window.event) {
      window.event.cancelBubble = true
    }
  }
}

const keysReducer = (state, action) => {
  switch (action.type) {
    case 'set-key-down':
      return { ...state, [action.key]: true }
    case 'set-key-up':
      return { ...state, [action.key]: false }
    case 'reset-keys':
      return { ...action.data }
    default:
      return state
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useKeyboardShortcut = (shortcutKeys: any[], callback, options) => {
  if (!Array.isArray(shortcutKeys))
    throw new Error(
      'The first parameter to `useKeyboardShortcut` must be an ordered array of `KeyboardEvent.key` strings.'
    )

  if (shortcutKeys.length === 0)
    throw new Error(
      'The first parameter to `useKeyboardShortcut` must contain atleast one `KeyboardEvent.key` string.'
    )

  if (!callback || typeof callback !== 'function')
    throw new Error(
      'The second parameter to `useKeyboardShortcut` must be a function that will be envoked when the keys are pressed.'
    )

  const { overrideSystem } = options || {}
  // eslint-disable-next-line unicorn/prefer-object-from-entries
  const initalKeyMapping = shortcutKeys.reduce((currentKeys, key) => {
    currentKeys[key.toLowerCase()] = false
    return currentKeys
  }, {})

  const [keys, setKeys] = useReducer(keysReducer, initalKeyMapping)

  const keydownListener = useCallback(
    (assignedKey) => (keydownEvent) => {
      const loweredKey = assignedKey.toLowerCase()

      if (keydownEvent.repeat) return
      if (blacklistedTargets.has(keydownEvent.target.tagName)) return
      if (loweredKey !== keydownEvent.key.toLowerCase()) return
      if (keys[loweredKey] === undefined) return

      if (overrideSystem) {
        keydownEvent.preventDefault()
        disabledEventPropagation(keydownEvent)
      }

      setKeys({ type: 'set-key-down', key: loweredKey })
      return false
    },
    [keys, overrideSystem]
  )

  const keyupListener = useCallback(
    (assignedKey) => (keyupEvent) => {
      const raisedKey = assignedKey.toLowerCase()

      if (blacklistedTargets.has(keyupEvent.target.tagName)) return
      if (keyupEvent.key.toLowerCase() !== raisedKey) return
      if (keys[raisedKey] === undefined) return

      if (overrideSystem) {
        keyupEvent.preventDefault()
        disabledEventPropagation(keyupEvent)
      }

      setKeys({ type: 'set-key-up', key: raisedKey })
      return false
    },
    [keys, overrideSystem]
  )

  useEffect(() => {
    if (Object.values(keys).filter((value) => !value).length === 0) {
      callback(keys)
      setKeys({ type: 'reset-keys', data: initalKeyMapping })
    } else {
      setKeys({ type: null })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, keys])

  useEffect(() => {
    for (const k of shortcutKeys)
      window.addEventListener('keydown', keydownListener(k))

    return () =>
      // eslint-disable-next-line unicorn/no-array-for-each
      shortcutKeys.forEach((k) =>
        window.removeEventListener('keydown', keydownListener(k))
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    for (const k of shortcutKeys)
      window.addEventListener('keyup', keyupListener(k))

    return () =>
      // eslint-disable-next-line unicorn/no-array-for-each
      shortcutKeys.forEach((k) =>
        window.removeEventListener('keyup', keyupListener(k))
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
