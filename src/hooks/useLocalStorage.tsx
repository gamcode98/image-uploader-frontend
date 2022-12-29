import { useState } from 'react'

export function useLocalStorage (key: string, initialValue: [] | {} | string): any {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return (item !== null) ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const handleValue = (value: any): void => setStoredValue(value)

  const setValue = (value: any): void => {
    try {
      setStoredValue(value)
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue, handleValue]
}
