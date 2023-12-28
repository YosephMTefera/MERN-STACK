import {useNavigate} from 'react-router-dom'
import {useDispatch,  useSelector} from 'react-redux'
import { motion } from "framer-motion"
import { FaEye, FaRegHeart } from "react-icons/fa"
import { IoIosHeart } from "react-icons/io"
import CategoryNavigation from './CategoryNavigation'
import apiRequest from '../../utils/request'
import useUserFetch from '../../hooks/userFetch'
import useSWR from 'swr'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton'
import { appStateAction } from '../../REDUX/applicationStateSlice'
import {ThreeDot} from 'react-loading-indicators'
import { useState } from 'react'
import { container, item } from '../../utils/data'


function HomeFeed() {
  const dispatch = useDispatch()
    const navigate = useNavigate()
    const {category} = useSelector((state)=>state.post)
    const {users}  = useUserFetch();
    const userID =localStorage.getItem('userID')
    const [componentError,setComponentError] = useState(false)
    const fetcher = (url) => apiRequest.get(url).then((res) => res?.data);
    const { data,mutate,error,isLoading } = useSWR(
   "/api/posts/get_posts",
   fetcher,
   {
     refreshInterval: 1000,
   }
 );
 
    const filteredPost = data?.posts?.filter((post)=>post.category===category);
    

  const handleLikedPost = async (id)=>{
  try {
  

    await apiRequest.put(`/api/posts/like_Post/${id}`,{userID}).then(()=>{
    mutate('/api/posts/get_posts')
  

  })

  
    
  } catch (error) {
    dispatch(appStateAction.setError(true))
  
    
  }
}
      

const removeLikedPost = async (id)=>{
  try {
    await apiRequest.put(`/api/posts/remove_like_post/${id}`,{userID}).then(()=>{

    mutate('/api/posts/get_posts')

    }).catch((error)=>{
      setComponentError(error.response.data.message)
    })
    
  } catch (error) {
    dispatch(appStateAction.setError(true))
    
  }
}

const handlePostDetail = async (id)=>{

  try {
    await apiRequest.put(`/api/posts/view_post/${id}`,{userID}).then(()=>{
      navigate(`/postDetail/${id}`)
   
    }).catch((error)=>{
      setComponentError(error.response.data.message)
    })
    
  } catch (error) {
    dispatch(appStateAction.setError(true))
    
  }

}
      
  if(error) return dispatch(appStateAction.setError(true))

      
    
  return (
    <div className="w-[95%] mt-[100px] mb-[20px] mx-auto">
         {componentError && <div className='mt-[50px]'>
          <span>{componentError}</span>
          </div>}
         
         <CategoryNavigation />

       
        <div className="w-[90%] my-[50px] mx-auto flex flex-col items-center  gap-[20px] max-[1500px]:w-[100%]">
          
{isLoading ? <ThreeDot variant="pulsate" color="#0D5C63" size="medium" text="" textColor="" />:     <motion.div     variants={container}
    initial="hidden"
    animate="visible" className="w-[100%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-[10px]">

            {category==="65859d27f8e02b0d9d69624f" ? data?.posts?.length ===0 ? <div className="w-[100%] col-span-6 flex justify-center items-center"> <span className="font-bold">No data available</span></div> :data?.posts?.map((post,index)=>{
            const firstname = users?.find((user)=>user?._id===post?.userID)?.firstname;
            const middlename = users?.find((user)=>user?._id===post?.userID)?.middlename;
            const username = users?.find((user)=>user?._id===post?.userID)?.username;
            const profileImg = users?.find((user)=>user?._id===post?.userID)?.profileImg;
            const userLiked =  post?.like?.some((user)=>user?.user_id===userID);
               
            return <motion.div onClick={()=>handlePostDetail(post?._id)} variants={item} key={index} className="bg-white my-[5px]  max-[1100px]:pb-4 rounded-[10px]    min-h-[400px] cursor-pointer">
                    <img src={post?.filename} className="w-[100%] h-[80%] aspect-video rounded-[10px] object-cover pointer-events-none" alt=""/>
                <div className="w-[90%] mx-auto flex items-center justify-between gap-[20px]">
                    <div className=" flex items-center gap-[20px]">
                    {profileImg ?   <div className="rounded-full">
          <img
            src={profileImg}
            className="w-[30px] h-[30px] object-cover rounded-full"
            alt=""
          />
        </div>:  <div className=" w-[30px] h-[30px] flex justify-center items-center bg-[#0D5C63] rounded-full">
          <span className='text-[14px] text-white'>{firstname?.[0] || <Skeleton />}</span>
        </div> }
                        <div className="flex flex-col my-[20px]">
                        <span className="text-[12px] font-extrabold text-[#0D5C63]">{firstname} {middlename}</span>
                        <span className="text-gray-400 text-[11px]">@{username || <Skeleton />}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-[20px] text-gray-500">
          <div className="flex items-center gap-[5px] text-[14px]">
            
            <div className="flex items-center gap-[5px]">
          
            <div  className="flex items-center gap-[10px]">
            {userLiked ? <IoIosHeart onClick={(e) =>{e.stopPropagation(); removeLikedPost(post?._id)}} className="text-red-500 text-[20px]" />:<FaRegHeart onClick={(e) =>{e.stopPropagation(); handleLikedPost(post?._id);}} className="text-[20px]" />}   
                      <span className="text-[14px]">{post?.like?.length || <Skeleton />}</span>
                    </div>
              
            </div>
            
          </div>
          <div className="flex items-center gap-[5px] text-[14px]">
            <FaEye />
            <span className="text-[14px]">{post?.views?.length}</span>
          </div>
        </div>
  

                       
                        
                    </div>
                </motion.div>
            }) : filteredPost?.length ===0 ? <div className="w-[100%] col-span-6 flex justify-center items-center"> <span className="font-bold">No data available</span></div> :filteredPost?.map((post,index)=>{
              const firstname = users?.find((user)=>user?._id===post?.userID)?.firstname;
              const middlename = users?.find((user)=>user?._id===post?.userID)?.middlename;
              const username = users?.find((user)=>user?._id===post?.userID)?.username;
              const profileImg = users?.find((user)=>user?._id===post?.userID)?.profileImg;
              const userLiked =  post?.like?.some((user)=>user?.user_id===userID);
        
             
                  return <motion.div onClick={()=>handlePostDetail(post?._id)} variants={item} key={index} className="w-[100%] bg-white my-[5px]  max-[1100px]:pb-4 rounded-[10px]   col-span-1 max-[1350px]:col-span-2 max-[700px]:col-span-4 max-[700px]:w-[100%] min-h-[400px] cursor-pointer">
                      <img src={post?.filename} className="w-[100%] h-[80%] aspect-video rounded-[10px] object-cover pointer-events-none" alt=""/>
                  <div className="w-[90%] mx-auto flex items-center justify-between gap-[20px]">
                      <div className=" flex items-center gap-[20px]">
                      {profileImg ?   <div className="rounded-full">
          <img
            src={profileImg}
            className="w-[30px] h-[30px] object-cover rounded-full"
            alt=""
          />
        </div>:  <div className=" w-[30px] h-[30px] flex justify-center items-center bg-[#0D5C63] rounded-full">
          <span className='text-[14px] text-white'>{firstname?.[0]}</span>
        </div> }
                          <div className="flex flex-col my-[20px]">
                          <span className="text-[12px] font-extrabold text-[#0D5C63]">{firstname} {middlename}</span>
                          <span className="text-gray-400 text-[11px]">@{username}</span>
                          </div>
                      </div>
                      <div className="flex items-center gap-[20px] text-gray-500">
            <div className="flex items-center gap-[5px] text-[14px]">
              
              <div className="flex items-center gap-[5px]">
            
                    <div  className="flex items-center gap-[10px]">
                    {userLiked ? <IoIosHeart onClick={(e) =>{e.stopPropagation(); removeLikedPost(post?._id)}} className="text-red-500 text-[20px]" />:<FaRegHeart onClick={(e) =>{e.stopPropagation(); handleLikedPost(post?._id);}} className="text-[20px]" />}
                      <span className="text-[14px]">{post?.like?.length}</span>
                    </div>
              </div>
              
            </div>
            <div className="flex items-center gap-[5px] text-[14px]">
              <FaEye />
              <span className="text-[14px]">{post?.views?.length}</span>
            </div>
          </div>                      
                      </div>
                  </motion.div>
              })}
        </motion.div>}
        </div>
    </div>
  )
}

export default HomeFeed