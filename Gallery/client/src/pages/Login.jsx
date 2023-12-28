
import LoginContainer from '../components/Auth/LoginContainer';
import SignUpContainer from '../components/Auth/SignUpContainer';
import { useState } from 'react';

function Login() {

  const [loginState, setLoginState] = useState(true);
    return (
      <div className='w-[100%] h-[100vh] flex justify-between items-center'>
        <div className='w-[50%] max-[900px]:w-[100%]'>
        {loginState ? <LoginContainer setLoginState={setLoginState} /> :<SignUpContainer setLoginState={setLoginState}/> }
        </div>
        <div className="w-[50%] h-[100%] bg-black fixed top-0 right-0 max-[900px]:hidden">
          <img alt='' className='w-[100%] h-[100%] object-cover pointer-events-none' src='https://images.unsplash.com/photo-1615963644057-838b0829d95b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGV0aGlvcGlhfGVufDB8MXwwfHx8MA%3D%3D'/>
        
        <div className='w-[80%] mx-auto absolute top-[25%] left-[5%] text-white flex flex-col max-[1300px]:w-[90%]'>
          <span className='text-[70px] font-bold max-[1300px]:text-[50px]'>Welcome Back!</span>
          <span className='w-[70%] max-[1300px]:w-[80%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, doloribus repudiandae debitis recusandae molestias incidunt illo laudantium veniam voluptatum laboriosam.</span>
        </div>
        </div>
      </div>
    )
 
  
}

export default Login