import { Route, Routes } from 'react-router-dom'
import { Login } from './routes/Login'
import { UploadImage } from './routes/UploadImage'

function App (): JSX.Element {
  return (
    <Routes>
      <Route index path='/' element={<UploadImage />} />
      <Route path='/asd' element={<Login />} />
    </Routes>
  )
}

export default App
