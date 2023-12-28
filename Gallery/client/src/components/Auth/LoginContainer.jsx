import {useNavigate} from 'react-router-dom'
import apiRequest from '../../utils/request'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import { appStateAction } from '../../REDUX/applicationStateSlice'

// eslint-disable-next-line react/prop-types
function LoginContainer({setLoginState}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)
    const [serverError,setServerError] = useState(false)
    const [error,setError] = useState("")


    const handleLogin = async ()=>{
      try {
        setLoading(true)
        await apiRequest.post('/api/users/login',{username:username.trim(),password:password.trim()}).then((res)=>{
          setLoading(false)
          
         localStorage.setItem('token',res.data.token)
         localStorage.setItem('userID',res.data.user._id);
        
          navigate('/')

        }).catch((error)=>{
          setLoading(false)
          setError(error.response.data.message)
      
  
        })
        
      } catch (error) {
        setLoading(false)
      setServerError(true)
        
        
      }
    }

 
    if(serverError) return dispatch(appStateAction.setError(true))

  return (
    <div className="bg-white w-[100%] h-[100vh] min-h-[100vh] flex items-center">
    <div className="w-[100%] h-[100%]">
      <div className="m-[30px]">
        <span className="text-[30px] text-[#0D5C63] font-bold uppercase">[MYGallery]</span>
      </div>
      <div className="w-[100%] min-h-[80%]  flex justify-center items-center">
    <div className="w-[70%]  min-h-[700px]  py-4 mx-auto border border-gray-300 rounded-[20px] flex flex-col justify-center items-center gap-[20px] max-[1400px]:w-[80%] max-[1000px]:w-[70%] max-[800px]:w-[90%]">
      <div className="w-[80%]  flex flex-col gap-[10px]">
        <span className="text-[30px] font-bold text-[#0D5C63]">Login</span>
        <span className="text-gray-400 text-[14px]">
        {error ? error:" Enter your email and password to login"} 
        </span>
      </div>
      <div className="w-[80%] flex flex-col gap-[20px]">
        <div className="w-[90%] flex flex-col gap-[10px]">
          <span className="font-bold text-[#0D5C63]">Username</span>
          <input
            type="text"
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="Ex. abebe12"
            className="py-2 px-4 border text-[14px] border-gray-400 rounded-[5px] outline-[#0D5C63]"
          />
        </div>
        <div className="w-[90%] flex flex-col gap-[10px]">
          <span className="font-bold text-[#0D5C63]">Password</span>
          <input
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Enter your password"
            className="py-2 px-4 border text-[14px] border-gray-400 rounded-[5px] outline-[#0D5C63]"
          />
          <span onClick={()=>navigate('/forgot-password')} className="text-[12px] text-right text-[#0D5C63] cursor-pointer hover:underline">
            forgot password?
          </span>
        </div>
      </div>
      <div className="w-[80%] mx-auto flex flex-col gap-[20px]">
        <button
          onClick={handleLogin}
          className="w-[90%] bg-[#0D5C63] py-2 px-4 text-white font-bold rounded-[5px]"
        >
         {loading ? "Loading...":"Login"}
        </button>
        <div className="text-[14px] flex items-center gap-[10px]">
          <span className="text-gray-500">Don&apos;t have an account yet?</span>
          <span
            onClick={() => setLoginState(false)}
            className="text-[#0D5C63] font-bold cursor-pointer"
          >
            Sign up
          </span>
        </div>
  
        
      </div>
    </div>
  </div>
    </div>
 
  </div>
  )
}

export default LoginContainer