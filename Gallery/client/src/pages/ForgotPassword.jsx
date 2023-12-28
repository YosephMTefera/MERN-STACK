import { useState } from "react";
import apiRequest from "../utils/request";
import {FaKey} from 'react-icons/fa'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { appStateAction } from "../REDUX/applicationStateSlice";
import {useDispatch} from 'react-redux'


const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState("");
    const [loading,setLoading] = useState(false)
    const [error, setError] = useState("");
    const [serverError,setServerError] = useState(false)
  
    const handleForogtPassword = async () => {
      try {
        if(email){
            setLoading(true)
            
        await apiRequest
        .post("/api/users/forgotPassword", {
          email,
        })
        .then(() => {
            setLoading(false)
          setEmailSent("We have sent a password reset link");
        })
        .catch((error) => {
            setLoading(false)
          setError(error.response.data.msg);
        });

        }
        else{
            setLoading(false)
            setError("Email is required")
        }

      } catch (error) {
        setLoading(false)
      setServerError(true)
      }
    };
     
    if(serverError) return dispatch(appStateAction.setError(true))
  return (
    <div className="w-[100%] flex justify-center items-center h-[100vh]">
    <div className="w-[30%] shadow-md rounded-[10px] bg-white p-4 flex flex-col items-center gap-[30px]">
      <div className="w-[80%] mx-auto flex flex-col mt-[10px] justify-center items-center gap-[20px]">
        <div className="w-[70px] h-[70px] flex items-center justify-center  bg-green-100 rounded-full">
          <FaKey className=" text-[34px] text-[#0D5C63] " />
        </div>

        <span className="text-[20px] text-[#0D5C63]">Forgot password?</span>
        <span className="text-[12px] text-gray-500">
          {emailSent
            ? emailSent
            : "No worries! we will send you reset instructions."}
         {error && <span className="text-[12px] text-gray-500">{error}</span> } 
        </span>
      </div>

      <div className="w-[80%] mx-auto flex flex-col gap-[10px]">
        <span className="text-[14px] font-bold text-[#039674]">Email</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="border border-[#0D5C63] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
        />
      </div>
      <div className="w-[80%] mx-auto">
        <button
          onClick={handleForogtPassword}
          className="w-[100%] bg-[#0D5C63] py-2 px-4 text-white rounded-[5px]"
        >
            {loading ? "Loading...":"  Reset Password"}
        
        </button>
      </div>
      <div className="w-[90%] mx-auto text-[14px] flex justify-center items-center gap-[10px]">
        <AiOutlineArrowLeft />
        <a href="/login">Back to Login</a>
      </div>
    </div>
  </div>
  )
}

export default ForgotPassword