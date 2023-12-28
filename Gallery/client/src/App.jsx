import {Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import ProtectedRoutes from './ProtectedRoutes'
import Error from './pages/Error'
import {useSelector} from 'react-redux'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'


function App() {
  const token = localStorage.getItem('token')
  const {error}= useSelector((state)=>state.appState);


  if(error) return <Error />


  return (
    <div className='bg-gray-100 overflow-x-hidden'>
      <Routes>
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password/:id/:token' element={<ResetPassword />}/>  
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoutes token={token} />}>
          <Route path="/*" element={<Home />} />
         
 
        </Route>
        <Route path="*" element={<Error />} />

      </Routes>
    </div>
  )
}

export default App
