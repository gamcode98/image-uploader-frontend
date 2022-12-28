import { createContext, useState } from 'react'

export const UserContext = createContext({
  currentUser: {},
  setCurrentUser: (user: any) => {}
})

export const UserProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [currentUser, setCurrentUser] = useState({})

  const value = { currentUser, setCurrentUser }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
