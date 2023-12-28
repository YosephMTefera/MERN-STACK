/* eslint-disable react/prop-types */
import { useState } from "react"
import apiRequest from "../../utils/request"
import { appStateAction } from "../../REDUX/applicationStateSlice"
import {useDispatch} from 'react-redux'
function SignUpContainer({setLoginState}) {

  const dispatch = useDispatch()

  const [username,setUsername] = useState("")
  const [firstname,setFirstname] = useState("")
  const [middlename,setMiddlename] = useState("");
  const [lastname,setLastname] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [country,setCountry] = useState("");
  const [city,setCity]  = useState("");
  const [profession,setProfession] = useState("")
  const [status,setStatus] = useState(null)
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  const [loading,setLoading] = useState(false)
  const [serverError,setServerError] = useState(false)
  const [error,setError] = useState("")


  const handleSignup = async ()=>{
    try {
      if(password === confirmPassword){
        setLoading(true)
        await apiRequest.post('/api/users/register',
        { firstname,
          middlename,
          lastname,
          username,
          email,
          phone,
          password,
          country,
          city,
          profession,
          status
          }).then(()=>{
          setLoading(false)      
          setLoginState(true)
  
        }).catch((error)=>{
          setLoading(false)
          setError(error.response.data.message)
          console.log(error)
  
        })

      }else{
        setError("Password and confirm password don't match");
      }
    } catch (error) {
      setLoading(false)
    setServerError(true)
      
      
    }
  }

  if(serverError) return dispatch(appStateAction.setError(true))
  return (
    <div className="bg-white w-[100%]  min-h-[100vh] flex flex-col">
      <div className="w-[50%] h-[80px] flex items-center  fixed top-0  bg-white shadow-sm z-50">
        <span className="text-[30px] text-[#0D5C63] m-[30px] font-bold uppercase">[MYGallery]</span>
      </div>
      <div className="w-[70%] h-[80%] min-h-[50%] py-4 my-[30px] mt-[650px] mx-auto border border-gray-300 rounded-[20px] flex flex-col justify-center items-center gap-[20px]">
        <div className="w-[80%] flex flex-col gap-[10px]">
          <span className="text-[30px] font-bold text-[#0D5C63]">Sign up</span>
         {error && <span>{error}</span>}
        </div>
        <div className="w-[80%] flex flex-col gap-[20px]">
          <div className="w-[90%] flex flex-col gap-[10px]">
            <span className="font-bold text-[#0D5C63]">Username</span>
            <input
              type="text"
              onChange={(e)=>setUsername(e.target.value)}
              placeholder="Abe123"
              className="py-2 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]"
            />
          </div>
          <div className="w-[90%] flex flex-col gap-[10px]">
            <span className="font-bold text-[#0D5C63]">First Name</span>
            <input
              type="text"
              onChange={(e)=>setFirstname(e.target.value)}
              placeholder="Abebe"
              className="py-2 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]"
            />
          </div>
          <div className="w-[90%] flex flex-col gap-[10px]">
            <span className="font-bold text-[#0D5C63]">Middle Name</span>
            <input
              type="text"
              onChange={(e)=>setMiddlename(e.target.value)}
              placeholder="Abebe"
              className="py-2 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]"
            />
          </div>
          <div className="w-[90%] flex flex-col gap-[10px]">
            <span className="font-bold text-[#0D5C63]">Last Name</span>
            <input
              type="text"
              onChange={(e)=>setLastname(e.target.value)}
              placeholder="Kebede"
              className="py-2 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]"
            />
          </div>
          <div className="w-[90%] flex flex-col gap-[10px]">
            <span className="font-bold text-[#0D5C63]">Email</span>
            <input
              type="email"
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="abebe@example.com"
              className="py-2 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]"
            />
          </div>
          <div className="w-[90%] flex flex-col gap-[10px]">
            <span className="font-bold text-[#0D5C63]">Phone</span>
            <input
              type="number"
              onChange={(e)=>setPhone(e.target.value)}
              placeholder="0944556678"
              className="py-2 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]"
            />
          </div>
          <div className="w-[90%] flex flex-col gap-[10px]">
            <span className="font-bold text-[#0D5C63]">Country</span>
            <input
              type="text"
              onChange={(e)=>setCountry(e.target.value)}
              placeholder="Ethiopia"
              className="py-2 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]"
            />
          </div>
          <div className="w-[90%] flex flex-col gap-[10px]">
            <span className="font-bold text-[#0D5C63]">City</span>
            <input
              type="text"
              onChange={(e)=>setProfession(e.target.value)}
              placeholder="Addis Ababa"
              className="py-2 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]"
            />
          </div>
          <div className="w-[90%] flex flex-col gap-[10px]">
            <span className="font-bold text-[#0D5C63]">Profession</span>
            <select  onChange={(e)=>setCity(e.target.value)}
              placeholder="Addis Ababa"
              className="py-2 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]">
                  <option></option>
                  <option value={"Photographer"}>Photographer</option>
                  <option value={"UI/UX Designer"}>UI/UX Designer</option>
                  <option value={"Illustrator"}>Illustrator</option>
               
            </select>
          
          </div>
          <div className="w-[90%] flex flex-col gap-[10px]">
            <span className="font-bold text-[#0D5C63]">Status</span>
            <select  onChange={(e)=>setStatus(e.target.value)}
              placeholder="Addis Ababa"
              className="py-2 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]">
                  <option></option>
                  <option value={false}>Private</option>
                  <option value={true}>Public</option>

               
            </select>
          
          </div>
          <div className="w-[90%] flex flex-col gap-[10px]">
            <span className="font-bold text-[#0D5C63]">Password</span>
            <input
              type="password"
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter your password"
              className="py-2 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]"
            />
          </div>
          <div className="w-[90%] flex flex-col gap-[10px]">
            <span className="font-bold text-[#0D5C63]">Confirm password</span>
            <input
              type="password"
              onChange={(e)=>setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="py-2 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]"
            />
          </div>
        </div>
        <div className="w-[80%] mx-auto flex flex-col gap-[20px]">
          <button
              onClick={handleSignup}
            className="w-[90%] bg-[#0D5C63] py-2 px-4 text-white font-bold rounded-[5px]"
          >
            {loading ? "Loading":    "Sign Up"}
        
          </button>
          <div className="text-[14px] flex items-center gap-[10px]">
            <span className="text-gray-500">have an account?</span>
            <span
              onClick={()=> setLoginState(true)}
              className="text-[#0D5C63] font-bold cursor-pointer"
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpContainer;
