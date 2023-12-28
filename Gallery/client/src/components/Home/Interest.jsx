/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import {useDispatch} from 'react-redux'
import { appStateAction } from "../../REDUX/applicationStateSlice";
import apiRequest from "../../utils/request";
import { interestsData } from "../../utils/data";
import { FaTrash } from "react-icons/fa";

const Interest = ({findUser}) => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedError,setSelectedError] = useState("")
  const [responseError,setResponseError] = useState("");
      
    
  const handleInterestClick = (interest) => {
        if (selectedInterests.includes(interest)) {
         
          setSelectedInterests(selectedInterests.filter(item => item !== interest));
        } else {
        
          setSelectedInterests([...selectedInterests, interest]);
        }
      };

      const handleAddInterests = async ()=>{
        try {
            if(selectedInterests.length === 0){
            setSelectedError("You must select atleast one interest")

            }
            else{
                setSelectedError("")
                apiRequest.put(`/api/users/interests/addInterests/${userID}`,
                {interests:selectedInterests}).then(()=>{
                    dispatch(appStateAction.setIntereset(false))
                }).catch((error)=>{
                    setResponseError(error.response.data.message)
                });
                

            }
        
        } catch (error) {
            dispatch(appStateAction.setError(true))
            
        }

      }



const handleRemoveInterest = async (interest)=>{

    try {
     
        
          
            apiRequest.put(`/api/users/interests/removeOneInterest/${userID}`,
            {interest:interest}).then((res)=>{
                console.log(res.data)
             
            }).catch((error)=>{
                console.log(error.response.data.message)
                setResponseError(error.response.data.message)
            });
            

        
    
    } catch (error) {
        dispatch(appStateAction.setError(true))
        
    }

}


  return (
    <div className="absolute h-[100vh] p-2 top-0 right-0 left-0">
      <div className="p-2   min-h-[400px] my-[50px] mx-auto bg-white shadow-lg rounded-[20px] lg:w-[50%] md:w-[70%] sm:w-[95%]">
      <div className="w-[80%] my-[30px] mx-auto">
      <span className="text-[25px]  font-bold text-[#0D5C63]">Select  your interests?</span>
     
     {responseError  && <div className="my-[30px] text-center"><span className="text-red-700">{responseError}</span></div>}
     {selectedInterests.length ===0 && selectedError && <div className="my-[30px] text-center"><span className="text-red-700">{selectedError}</span></div>}

     {selectedInterests?.length !==0 && <div className="w-[80%] my-[50px] mx-auto flex flex-col gap-[20px]">
      <span className="text-[#0D5C63] font-bold">Your selected interests:</span>
      <div className="w-[100%]  flex flex-col justify-center gap-[20px] text-gray-600 items-start flex-wrap p-2  rounded-[10px]">
  
        <div className="w-[90%] flex justify-stretch flex-wrap gap-[20px]">
          {selectedInterests.map((interest, index) => (
            <span key={index} className="whitespace-nowrap py-1 px-3 text-[12px] bg-[#0D5C63] text-white rounded-[20px]">{interest}</span>
          ))}
        </div>
      </div>

      </div>}
     
      <div className="w-[100%] my-[50px] mx-auto flex justify-start gap-[20px] text-gray-600 items-center flex-wrap">
      {interestsData.map((interest, index) => (
          <span key={index} className="bg-gray-200 px-2 py-1 text-[14px] rounded-[20px]">
            <button
              className={selectedInterests.includes(interest) ? 'selected' : ''}
              onClick={() => handleInterestClick(interest)}
            >
              {interest}
            </button>
          </span>
        ))}


      </div>
    </div>
    {findUser?.interesets?.length !== 0 &&     <div className="w-[80%] mx-auto my-[40px] p-2">
        <div><span className="text-[18px] text-[#0D5C63] font-bold">Your interests</span></div>
        <div className="flex flex-col gap-[20px] my-[30px]">
            {findUser?.interesets?.map((interest,index)=>{
                return <div key={index} className="w-[20%] flex justify-between items-center gap-[20px]">
                    <span className="text-gray-500">{interest}</span>
                    <FaTrash onClick={()=>handleRemoveInterest(interest)} className="text-gray-500  cursor-pointer"/>

                </div>
            })}
        </div>
    </div>}

    <div className="w-[90%]  flex justify-end items-center gap-[20px]  p-2">
      <button onClick={()=>dispatch(appStateAction.setIntereset(false))} className="text-[14px]">Cancel</button>
        <button onClick={handleAddInterests} className="bg-[#0D5C63] text-white py-1 px-4 text-[14px] rounded-[20px]">Add Interest</button>

      </div>
      </div>
    </div>
  )
}

export default Interest