import { createContext, useState } from 'react'

interface User {
  username: string
  email: string
}

export const UserContext = createContext({
  currentUser: { username: '', email: '' },
  setCurrentUser: (user: User) => {}
})

export const UserProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [currentUser, setCurrentUser] = useState({ username: '', email: '' })

  const value = { currentUser, setCurrentUser }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
