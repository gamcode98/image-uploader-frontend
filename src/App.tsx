import { Route, Routes } from 'react-router-dom'
import { Login } from './routes/Login'

function App (): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
    </Routes>
  )
}

export default App
