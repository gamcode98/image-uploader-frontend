import { Navigation } from './routes/Navigation'
import { Route, Routes } from 'react-router-dom'
import { Login } from './routes/Login'
import { MyDashboard } from './routes/MyDashboard'
import { UploadImage } from './routes/UploadImage'
import { MySpace } from './routes/MySpace'
import { ImageDetail } from './routes/ImageDetail'
import { SignUp } from './routes/SignUp'
import { Account } from './routes/Account'

function App (): JSX.Element {
  return (
    <Routes>
      <Route index path='/' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/' element={<Navigation />}>
        <Route path='/my-space' element={<MySpace />} />
        <Route path='/upload-image' element={<UploadImage />} />
        <Route path='/my-dashboard' element={<MyDashboard />} />
        <Route path='/account' element={<Account />} />
        <Route path='/image-detail/:id' element={<ImageDetail />} />
      </Route>
    </Routes>
  )
}

export default App
