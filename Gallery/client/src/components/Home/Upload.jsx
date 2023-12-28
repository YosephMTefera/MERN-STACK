import { useState } from "react"
import { BsFillCloudUploadFill } from "react-icons/bs"
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import apiRequest from "../../utils/request"
import { appStateAction } from "../../REDUX/applicationStateSlice"


function Upload() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const userID = localStorage.getItem('userID')
  const {categoryList} = useSelector((state)=>state.categories);
  const [title,setTitle] = useState("")
  const [category,setCategory] = useState("")
  const [caption,setCaption] = useState("")
  const [file,setFile] = useState(null)
  const [loading,setLoading] = useState(false)
  const [responseError,setResponseError] = useState("")
  const [serverError,setServerError] = useState("");




  const handleUpload = async()=>{
    try {


      const uploadData =new   FormData();
      uploadData.append('userID',userID)
      uploadData.append('title',title)
      uploadData.append('caption',caption);
      uploadData.append('category',category);
      uploadData.append('postPicture',file);
   

      setLoading(true)
      await apiRequest.post('/api/posts/add_post',uploadData).then(()=>{
        setLoading(false)
  
        
      navigate('/')


      }).catch((error)=>{
        setResponseError(error.response.data.message)
      })

      
    } catch (error) {
      setServerError(true)
      
    }
  }
  if(serverError) return dispatch(appStateAction.setError(true))


  return (
    <div className="w-[100%] p-2 mx-auto  min-h-[70vh] bg-white shadow-md rounded-[10px]">
      <div className="w-[90%] my-[100px] mx-auto">
        <div className="mx-6 my-[50px] font-bold w-[100%] text-center flex flex-col gap-[20px]">
          <span className="text-[#0D5C63] font-bold text-[20px]">Upload  File</span>
        {responseError && <span>{responseError}</span>}
        </div>
        <div className="w-[50%] mx-6 flex flex-col gap-[10px] max-[1000px]:w-[90%]">
          <span className="font-bold text-[#0D5C63]">Title</span>
          <input
          onChange={(e)=>setTitle(e.target.value)}
            type="text"
            className="py-1 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]"
          />
        </div>
        <div className="w-[50%] mt-[30px] mx-6 flex flex-col gap-[10px] max-[1000px]:w-[90%]">
          <span className="font-bold text-[#0D5C63]">Category</span>
          <select
          onChange={(e)=>setCategory(e.target.value)}
            
            className="py-2 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]"
          >
            {categoryList?.map((category,index)=>{
              return <option key={index} className='uppercase text-[14px] font-bold' value={category?._id}>{category?.categoryName}</option>
            })}
        

          </select>
        </div>
        <div className="w-[50%] mt-[30px] mx-6 flex flex-col gap-[10px] max-[1000px]:w-[90%]">
          <span className="font-bold text-[#0D5C63] text-[14px]">Caption</span>
          <textarea
          onChange={(e)=>setCaption(e.target.value)}
          cols={4} rows={10}
            type="text"
            className="py-1 px-4 border border-gray-400 rounded-[5px] outline-[#0D5C63]"
          ></textarea>
        </div>
        <div className="w-[95%] my-[30px]  mx-auto flex justify-between items-center gap-[20px] max-[800px]:flex-col">
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
                Upload File
              </span>
           </div>
           
           
              <span className="w-[50%] text-[12px] max-[1000px]:w-[70%]">Please ensure images are of high resolution in format jpg, or png.
Only upload media that you have the legal rights to.</span>
            </div>
          </label>
        </div>
        <div className="w-[50%] mt-[20px] mx-auto flex gap-[20px] max-[800px]:w-[80%]">
          {file && (
            <img
              className="w-[100%] h-[300px] object-cover"
              src={URL.createObjectURL(file)}
              alt=""
            />
          )}
        </div>
      </div>
      <div className="w-[100%] my-[100px] flex items-center gap-[20px] justify-end">
        <button className="text-[14px]" onClick={()=>navigate(-1)}>Cancel</button>
          <button onClick={handleUpload} className="bg-[#0D5C63] text-white py-1 px-4 text-[14px] rounded-[5px]">{loading ? "Loading":"Uplaod"}</button>
      </div>
      </div>
    </div>
  )
}

export default Upload