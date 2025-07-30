import React, {createContext, useState} from 'react'
import useServerSaid from '@hooks/useServerSaid'

const GlobalStore = createContext(null)
const { Provider } = GlobalStore

interface TProps {
  children: JSX.Element
}

function GlobalProvider({ children }: TProps) {
  const [selectedApp, setSelectedApp] = useState<TMenuItem>({
    id: '',
    title: '',
    url: '',
  })
  const { serverSaid, setServerSaid, clearServerSaid } = useServerSaid()
  
  return (
    <Provider value={{ 
      serverSaid, 
      setServerSaid,
      clearServerSaid,
      selectedApp,
      setSelectedApp,
    }}>
      {children}
    </Provider>
  )
}

export { GlobalStore, GlobalProvider }
