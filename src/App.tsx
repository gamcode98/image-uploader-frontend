import { Route, Routes } from 'react-router-dom'
import { Login } from './routes/Login'
import { MyDashboard } from './routes/MyDashboard'

function App (): JSX.Element {
  return (
    <Routes>
      <Route index path='/' element={<MyDashboard />} />
      <Route path='/asd' element={<Login />} />
    </Routes>
  )
}

export default App
