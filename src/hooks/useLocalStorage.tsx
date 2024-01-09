import React from 'react'

export const useLocalStorage = <T,>(key: string, initialValue?: T) => {
  const [value, setValue] = React.useState(() => {
    let initial: T | undefined = undefined
    const storedValue = localStorage.getItem(key)
    try {
      initial = storedValue
        ? (JSON.parse(storedValue) as T | undefined)
        : initialValue
    } catch (error) {
      initial = undefined
    }
    return initial
  })

  const updateValue = React.useCallback(
    (newValue: T | ((val: T) => T)) => {
      const newVal = newValue instanceof Function ? newValue(value!) : newValue
      setValue(newVal)
      localStorage.setItem(key, JSON.stringify(newVal))
    },
    [key, value]
  )

  const removeValue = React.useCallback(() => {
    localStorage.removeItem(key)
    setValue(undefined)
  }, [key])

  return {
    value,
    setValue: updateValue,
    removeValue
  }
}
