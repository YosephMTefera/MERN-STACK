import { useState } from "react"
import { BsFillCloudUploadFill } from "react-icons/bs"
import apiRequest from "../../utils/request"
import {useDispatch} from 'react-redux'
import { appStateAction } from "../../REDUX/applicationStateSlice"

const EditProfile = () => {
    const dispatch = useDispatch()

    const userID = localStorage.getItem('userID')
    const [file,setFile] = useState(null)
    const [firstname,setFirstname] = useState("")
    const [middlename,setMiddlename] = useState("")
    const [lastname,setLastname] = useState("")
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [phone,setPhone] = useState("")
    const [country,setCountry] = useState("")
    const [city,setCity] = useState("")
    const [profession,setProfession] = useState("")
    const [status,setStatus] = useState(false)
    const [responseError,setResponseError] = useState("")
    const [loading,setLoading] = useState(false)
    const [editFiled,setEditField] = useState("")


    const handleUpdateProfile = async ()=>{
        try {
       


            const profileData =new   FormData();

            {editFiled ==="Firstname"  &&  profileData.append('firstname',firstname)}
            {editFiled ==="Middlename" &&  profileData.append('middlename',middlename) }
            {editFiled ==="Lastname" &&     profileData.append('lastname',lastname);}
            {editFiled ==="Username" &&   profileData.append('username',username); }
            {editFiled==="Email" &&   profileData.append('email',email);}
            {editFiled ==="Phone" &&     profileData.append('phone',phone) }
            {editFiled ==="Country" && profileData.append('country',country)}
            {editFiled ==="City" &&     profileData.append('city',city)}
            {editFiled ==="profession" && profileData.append('profession',profession)}
            {editFiled ==="status" &&    profileData.append('status',status); }
            {editFiled === "Profile picture" && profileData.append('picture',file)}
            setLoading(true)
            await apiRequest.put(`/api/users/updateUser/${userID}`,profileData).then(()=>{
              setLoading(false)
         
        
              
            dispatch(appStateAction.setEditProfile(false))
      
      
            }).catch((error)=>{
             
              setLoading(false)
              setResponseError(error.response.data.message)
            })
      
            
          } catch (error) {
            setLoading(false)
      dispatch(appStateAction.setError(true))
 
            
          }
    }
    return (
    <div className="absolute p-2 top-0 right-0 left-0">
        <div className=" p-2 mx-auto bg-white shadow-lg rounded-[20px] md:w-[80%] sm:w-[95%]">
                <div className="w-[90%] mt-[50px] mx-auto flex justify-between items-center">
                    <span className="text-[20px] text-[#0D5C63] font-bold">Want to edit your profile?</span>

                </div>
                <div>
                <div className="w-[100%] mx-auto p-2 min-h-[70vh]  rounded-[10px]">
      <div className="w-[95%] flex flex-col justify-between h-[100%]  mx-auto">
      
      {responseError && <div className="mx-6 my-[50px] font-bold w-[100%] text-center flex flex-col gap-[20px]">

     <span>{responseError}</span>
        </div>}  
           <div className="w-[50%] mt-[30px] mx-6 flex flex-col gap-[10px]">
          <span className="font-bold text-[#0D5C63]">Which filed do you want edit?</span>
          <select
          onChange={(e)=>setEditField(e.target.value)}
            
            className="py-2 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]"
          >
            <option>select field to edit?</option>
           <option>Firstname</option>
           <option>Middlename</option>
           <option>Lastname</option>
           <option>Username</option>
           <option>Email</option>
           <option>Phone</option>
           <option>Country</option>
           <option>City</option>
           <option>Profession</option>
           <option>Status</option>
           <option>Profile picture</option>
        

          </select>
        </div>
        {editFiled ==="Firstname" &&  <div className="w-[50%] my-[30px] mx-6 flex flex-col gap-[10px]">
          <span className="font-bold text-[#0D5C63]">Firstname</span>
          <input
          onChange={(e)=>setFirstname(e.target.value)}
            type="text"
            className="py-1 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]"
          />
        </div>
       }
       {editFiled ==="Middlename" && <div className="w-[50%] my-[30px] mx-6 flex flex-col gap-[10px]">
          <span className="font-bold text-[#0D5C63]">Middlename</span>
          <input
          onChange={(e)=>setMiddlename(e.target.value)}
            type="text"
            className="py-1 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]"
          />
        </div>}
        {editFiled ==="Lastname" && <div className="w-[50%] my-[30px] mx-6 flex flex-col gap-[10px]">
          <span className="font-bold text-[#0D5C63]">Lastname</span>
          <input
          onChange={(e)=>setLastname(e.target.value)}
            type="text"
            className="py-1 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]"
          />
        </div>}
        {editFiled ==="Username" &&  <div className="w-[50%]  my-[30px] mx-6 flex flex-col gap-[10px]">
          <span className="font-bold text-[#0D5C63]">Username</span>
          <input
          onChange={(e)=>setUsername(e.target.value)}
            type="text"
            className="py-1 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]"
          />
        </div>}
        {editFiled ==="Email" &&     <div className="w-[50%]  my-[30px] mx-6 flex flex-col gap-[10px]">
          <span className="font-bold text-[#0D5C63]">Email</span>
          <input
          onChange={(e)=>setEmail(e.target.value)}
            type="email"
            className="py-1 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]"
          />
        </div>}

        {editFiled === "Phone" &&  <div className="w-[50%]  my-[30px] mx-6 flex flex-col gap-[10px]">
          <span className="font-bold text-[#0D5C63]">Phone</span>
          <input
          onChange={(e)=>setPhone(e.target.value)}
            type="text"
            className="py-1 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]"
          />
        </div>}
    
       {editFiled ==="Country" &&  <div className="w-[50%]  my-[30px] mx-6 flex flex-col gap-[10px]">
          <span className="font-bold text-[#0D5C63]">Country</span>
          <input
          onChange={(e)=>setCountry(e.target.value)}
            type="text"
            className="py-1 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]"
          />
        </div> }

        {editFiled ==="City" &&  <div className="w-[50%]  my-[30px] mx-6 flex flex-col gap-[10px]">
          <span className="font-bold text-[#0D5C63]">Country</span>
          <input
          onChange={(e)=>setCity(e.target.value)}
            type="text"
            className="py-1 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]"
          />
        </div> }
        {editFiled ==="Profession" &&         <div className="w-[50%] mt-[30px] mx-6 flex flex-col gap-[10px]">
          <span className="font-bold text-[#0D5C63]">Which filed do you want edit?</span>
          <select
          onChange={(e)=>setProfession(e.target.value)}
            
            className="py-2 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]"
          >
            <option>Select Profession</option>
           <option>Photographer</option>
          </select>
        </div>}
        {editFiled ==="Status" &&         <div className="w-[50%]  my-[30px] mt-[30px] mx-6 flex flex-col gap-[10px]">
          <span className="font-bold text-[#0D5C63]">Which filed do you want edit?</span>
          <select
          onChange={(e)=>setStatus(e.target.value)}
            
            className="py-2 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]"
          >
            <option>Change account status</option>
           <option>Private</option>
           <option>Public</option>
      
          </select>
        </div>}
        {editFiled ==="Profile picture" &&   
        <div className="w-[95%] my-[30px]  mx-auto flex justify-between items-center gap-[20px]">
        <div className="w-[100%] mx-auto flex flex-col gap-[10px]">
          <span className="text-[14px] font-bold w-[80%] text-[#0D5C63]">
            Upload File
          </span>
          <label>
            <input
              type="file"
              accept="image/png, image/jpeg" 
              onChange={(e) => setFile(e.target.files[0])}
              hidden
            />
            <div className="[w-[100%] min-h-[300px] flex flex-col justify-center gap-[10px] text-[#0D5C63]  items-center p-4 mx-auto border border-gray-400 rounded border-dashed cursor-pointer text-center">
           <div className="flex items-center gap-[10px]">
           <BsFillCloudUploadFill />
              <span className="text-[14px] font-bold ">
                Upload profile image
              </span>
           </div>
           
           
              <span className="w-[50%] text-[12px]">Upload profile image</span>
            </div>
          </label>
        </div>
        <div className="w-[50%] mt-[20px] mx-auto flex gap-[20px]">
          {file && (
            <img
              className="w-[100%] h-[300px] object-cover"
              src={URL.createObjectURL(file)}
              alt=""
            />
          )}
        </div>
      </div>}
    
      <div className="w-[100%] my-[100px] flex items-center gap-[20px] justify-end">
        <button className="text-[14px]" onClick={()=>dispatch(appStateAction.setEditProfile(false))}>Cancel</button>
          <button onClick={handleUpdateProfile} className="bg-[#0D5C63] text-white py-1 px-4 text-[14px] rounded-[5px]">{loading ? "Loading":"Uplaod"}</button>
      </div>
      </div>
    </div>
                </div>
        </div>
    </div>
  )
}

export default EditProfile