import { useState } from 'react'
import { Home } from './components/Home'
import { Login } from './components/Login'

const App = () => {
  const [username, setUsername] = useState<string>('')

  return username
    ? <Home username={username} />
    : <Login onSubmit={setUsername} />
}

export default App