import { BsArrowRight } from "react-icons/bs"
import { motion } from "framer-motion"
import {useSelector,useDispatch} from 'react-redux'
import { profileSliderAction } from "../../REDUX/profileSliderSlice"
import useSWR from 'swr'
import apiRequest from "../../utils/request"
import { useState } from "react"
import { appStateAction } from "../../REDUX/applicationStateSlice"


// eslint-disable-next-line react/prop-types
const UserFollowing = ({following}) => {

    const dispatch = useDispatch();
    const [componentError,setComponentError] = useState(false)
    const {initial,animate} = useSelector((state)=>state.profileSlider);
    const userFetcher = (url) => apiRequest.get(url).then((res) => res?.data);
    const { data:userData } = useSWR(
   "/api/users/get_users",
   userFetcher,
   {
     refreshInterval: 1000,
   }
   );


   const userID = localStorage.getItem('userID')
   const currentUser = userData?.users?.find((user)=>user?._id===userID);


const handleUserFollow =async (id)=>{
  try {
    await apiRequest.put('/api/users/follow-user',{
      userID:userID,
      usertobeFollowedID:id
    }).then((res)=>{
      console.log(res.data)
    
    }).catch((error)=>{
      setComponentError(error.response.data.message)
    })
    
  } catch (error) {
    dispatch(appStateAction.setError(true))
  }
}
const handleUserUnFollow =async (id)=>{
  try {
    await apiRequest.put('/api/users/unfollow-user',{
      userID:userID,
      usertobeFollowedID:id
    }).then((res)=>{
  
      console.log(res.data)
  
      
    }).catch((error)=>{
      setComponentError(error.response.data.message)
    })
    
  } catch (error) {
    dispatch(appStateAction.setError(true))
  }
}
 
    
    return (
    <motion.div  initial={initial}
        animate={animate}
       
        className="fixed top-[80px]  right-0 p-2 bg-white shadow-lg w-[20%] mx-auto  h-[100%]">
       
       {componentError && <div className='my-[20px] w-[80%] mx-auto'>
          <span>{componentError}</span>
          </div>}
        <div className="m-4 flex items-center justify-between gap-[20px]">
        <span className="text-[#0D5C63] font-bold">{following  ? "Following":"Followers"}</span>
            <BsArrowRight onClick={()=>dispatch(profileSliderAction.setSliderState({
               initial:{
                x:0
               },
               animate:{
                    x:700
                }

            }))} className="text-[20px] text-[#0D5C63] font-bold cursor-pointer"/>
        </div>

        {following ? currentUser?.following?.length === 0 ? <div className="w-[100%] mt-[30px] flex justify-center items-center"><span className="text-[14px] text-gray-500">You are not following anyone!</span></div>: currentUser?.following?.map((user,index)=>{
            const firstname = userData?.users?.find((u)=>u?._id===user?.user_id)?.firstname;
            const middlename = userData?.users?.find((u)=>u?._id===user?.user_id)?.middlename;
            const lastname = userData?.users?.find((u)=>u?._id===user?.user_id)?.lastname;
            const username = userData?.users?.find((u)=>u?._id===user?.user_id)?.username;
            const profileImg = userData?.users?.find((u)=>u?._id ===user?.user_id)?.profileImg;
            const userFollowed = currentUser?.following?.some((u)=>u?.user_id===user?.user_id);
      
            return  <div key={index} className="w-[90%] mt-[50px] mx-auto flex justify-between">
            <div>
                <div className="flex items-center gap-[20px]">
                  {profileImg ?     <div className="w-[40px] h-[40px] bg-[#0D5C63] rounded-full">
                                                <img src={profileImg} className="w-[100%] h-[100%] rounded-full" alt=""/>

                  </div>:    <div className="w-[40px] h-[40px] bg-[#0D5C63] rounded-full flex justify-center items-center">
                    <span className="text-white uppercase font-bold">{firstname?.[0]}</span>
                  </div> }
                    
                        <div className="flex flex-col">
                                <span className="text-[12px] text-[#0D5C63] font-bold">{firstname} {middlename} {lastname}</span>
                            <span className="text-[10px] text-gray-500">@{username}</span>
                        </div>
                </div>

            </div>
            <div>
                     
            {userFollowed &&      <button
                className="border border-[#0D5C63] text-[#0D5C63] text-[12px] py-0.5 px-4 rounded-[20px]"
                onClick={()=>handleUserUnFollow(user?.user_id)}
              >
                Unfollow
              </button>}
              {!userFollowed &&    <button
                className="bg-[#0D5C63] text-white text-[12px] py-0.5 px-4 rounded-[20px]"
                onClick={()=>handleUserFollow(user?.user_id)}
              >
                Follow
              </button>}
            </div>
        </div>
        })
      : currentUser?.followers?.length === 0 ? <div className="w-[100%] mt-[30px] flex justify-center items-center"><span className="text-[14px] text-gray-500">You don&apos;t have any followers!</span></div>: currentUser?.followers?.map((user,index)=>{
          const firstname = userData?.users?.find((u)=>u?._id===user?.user_id)?.firstname;
          const middlename = userData?.users?.find((u)=>u?._id===user?.user_id)?.middlename;
          const lastname = userData?.users?.find((u)=>u?._id===user?.user_id)?.lastname;
          const username = userData?.users?.find((u)=>u?._id===user?.user_id)?.username;
          const profileImg = userData?.users?.find((u)=>u?._id ===user?.user_id)?.profileImg;
          const userFollowed = currentUser?.following?.some((u)=>u?.user_id===user?.user_id);
      
         

          return  <div key={index} className="w-[90%] mt-[50px] mx-auto flex justify-between">
          <div>
              <div className="flex items-center gap-[20px]">
              {profileImg ?     <div className="w-[40px] h-[40px] bg-[#0D5C63] rounded-full">
                                                <img src={profileImg} className="w-[100%] h-[100%] rounded-full" alt=""/>

                  </div>:    <div className="w-[40px] h-[40px] bg-[#0D5C63] rounded-full flex justify-center items-center">
                    <span className="text-white uppercase font-bold">{firstname?.[0]}</span>
                  </div> }
                      <div className="flex flex-col">
                              <span className="text-[12px] text-[#0D5C63] font-bold">{firstname} {middlename} {lastname}</span>
                          <span className="text-[10px] text-gray-500">@{username}</span>
                      </div>
              </div>

          </div>
          <div>
                   
           
          {userFollowed &&      <button
                className="border border-[#0D5C63] text-[#0D5C63] text-[12px] py-0.5 px-4 rounded-[20px]"
                onClick={()=>handleUserUnFollow(user?.user_id)}
              >
                Unfollow
              </button>}
              {!userFollowed &&    <button
                className="bg-[#0D5C63] text-white text-[12px] py-0.5 px-4 rounded-[20px]"
                onClick={()=>handleUserFollow(user?.user_id)}
              >
                Follow
              </button>}
          </div>
      </div>
      })}
        

    
        
        
        
     
    </motion.div>
  )
}

export default UserFollowing