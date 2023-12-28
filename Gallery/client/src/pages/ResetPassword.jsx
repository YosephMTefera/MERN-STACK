import { useState } from "react";
import {useParams} from 'react-router-dom'
import apiRequest from "../utils/request";
import { FaKey } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { appStateAction } from "../REDUX/applicationStateSlice";
import {useDispatch} from 'react-redux'
const ResetPassword = () => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [error, setError] = useState("");
    const [serverError,setServerError] = useState(false)
    const [loading,setLoading] = useState(false)
    const { id, token } = useParams();
  
    const handleResetPassword = async () => {
      try {
        if(password && retypePassword){
            if (password === retypePassword) {
                setLoading(true)
                await apiRequest
                  .put(`/api/users/reset-password/${id}/${token}`, { password })
                  .then(() => {
                    setLoading(false)
                    window.location.href = "/login";
                  })
                  .catch((error) => {
                      setLoading(false)
                    setError(error.response.data.msg);
                  });
              } else {
                  setLoading(false)
                setError("password don't match");
              }

        }else{
            setLoading(false)
            setError("Password is requried")
        }
      
      } catch (error) {
        setLoading(false)
        setServerError(true);
      }
    };

    if(serverError) return dispatch(appStateAction.setError(true))


  return (
    <div className="w-[100%] flex justify-center items-center h-[100vh]">
    <div className="w-[30%] shadow-md rounded-[10px] bg-white p-4 flex flex-col items-center gap-[30px]">
      <div className="w-[80%] mx-auto flex flex-col mt-[10px] justify-center items-center gap-[20px]">
        <div className="w-[70px] h-[70px] flex items-center justify-center   bg-green-100 rounded-full">
          <FaKey className=" text-[34px] text-[#0D5C63] " />
        </div>

        <span className="text-[20px] text-[#0D5C63]">Reset password?</span>
       
       {error &&    <span className="text-[12px] text-gray-500">
          {error}
        </span> }
     
      </div>

      <div className="w-[80%] mx-auto flex flex-col gap-[10px]">
        <span className="text-[14px]  font-bold text-[#0D5C63]">
          Password
        </span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your new password"
          className="border border-[#039674] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
        />
      </div>

      <div className="w-[80%] mx-auto flex flex-col gap-[10px]">
        <span className="text-[14px]  font-bold text-[#0D5C63]">
          Retype your password
        </span>
        <input
          type="password"
          onChange={(e) => setRetypePassword(e.target.value)}
          placeholder="Retype password"
          className="border border-[#0D5C63] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
        />
      </div>
      <div className="w-[80%] mx-auto">
        <button
          onClick={handleResetPassword}
          className="w-[100%] bg-[#0D5C63] py-2 px-4 text-white rounded-[5px]"
        >
            {loading ? "Loading...":"Reset Password"}
    
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

export default ResetPassword