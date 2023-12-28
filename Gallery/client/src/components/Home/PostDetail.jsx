import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { FaEye, FaRegHeart } from 'react-icons/fa';
import { IoIosHeart } from 'react-icons/io';
import { motion } from "framer-motion"
import {useNavigate} from 'react-router-dom'
import apiRequest from '../../utils/request';
import useSWR from 'swr'
import { container, item } from '../../utils/data';
import { appStateAction } from '../../REDUX/applicationStateSlice';
import {useDispatch} from 'react-redux'

function PostDetail() {
    const {id} = useParams()
    const dispatch = useDispatch();
    const userID = localStorage.getItem('userID')
    const navigate = useNavigate()
    const [error,setError] = useState("")
    const [serverError,setServerError] = useState(false)


    const postFetcher = (url) => apiRequest.get(url).then((res) => res?.data);
    const { data:postData,mutate:postMutate } = useSWR(
   "/api/posts/get_posts",
   postFetcher,
   {
     refreshInterval: 1000,
   }
 );
 
 
 const userFetcher = (url) => apiRequest.get(url).then((res) => res?.data);
 const { data:userData,mutate:userMutate } = useSWR(
"/api/users/get_users",
userFetcher,
{
  refreshInterval: 1000,
}
);
 const findPost = postData?.posts?.find((post)=>post._id===id);
 const findUser = userData?.users?.find((user)=>user._id===findPost?.userID)
 const userFollowed =  findUser?.followers?.some((user)=>user?.user_id===userID);
 const userLiked =  findPost?.like?.some((user)=>user?.user_id===userID);
 const filterPost = postData?.posts?.filter((post)=>post?._id !==id && post?.category===findPost?.category);

const handleUserFollow =async ()=>{
  try {
    await apiRequest.put('/api/users/follow-user',{
      userID:userID,
      usertobeFollowedID:findPost?.userID
    }).then((res)=>{
      userMutate('/api/users/get_users')
      console.log(res.data)
    }).catch((error)=>{
      setError(error.response.data.message)
    
    })
    
  } catch (error) {
    setServerError(true)
   
  }
}
const handleUserUnFollow =async ()=>{
  try {
    await apiRequest.put('/api/users/unfollow-user',{
      userID:userID,
      usertobeFollowedID:findPost?.userID
    }).then(()=>{
      userMutate('/api/users/get_users')
  
    }).catch((error)=>{
      setError(error.response.data.message)
     
    })
    
  } catch (error) {
 setServerError(true)
  }
}

const handleLikedPost = async (id)=>{
  try {
  

    await apiRequest.put(`/api/posts/like_Post/${id}`,{userID}).then(()=>{
    postMutate('/api/posts/get_posts')
  

  }).catch((error)=>{
    setError(error.response.data.message);
  })

  
    
  } catch (error) {
      setServerError(true)    
  }
}

const removeLikedPost = async (id)=>{
  try {
    await apiRequest.put(`/api/posts/remove_like_post/${id}`,{userID}).then(()=>{
    postMutate('/api/posts/get_posts')

    }).catch((error)=>{
      setError(error.response.data.message);
    })
    
  } catch (error) {
setServerError(true)
    
  }
}


    useEffect(()=>{
      
        window.scrollTo({ top: 0 });
    },[])

    if(serverError) return dispatch(appStateAction.setError(true))
  return (
    <div className='w-[100%] mt-[80px] mb-[20px]  bg-white py-4 px-2 mx-auto'>
        
        <div className='w-[65%] mt-[30px] mx-auto flex items-center justify-between max-[800px]:w-[90%]'>
            <span className='text-[30px] text-[#0D5C63] font-bold'>{findPost?.title}</span>
            {error && <span className="text-red-700">{error}</span>}
          </div>
        <div className='w-[70%] my-[30px] mx-auto flex max-[800px]:w-[90%]'>
       
            <div className='w-[50%] mx-auto flex items-center gap-[20px]'>
            {
                    findUser?.profileImg ?<img src={findUser?.profileImg} className="w-[50px] h-[50px] aspect-video rounded-[10px] object-cover pointer-events-none" alt=""/>:<div className='w-[50px] h-[50px] bg-[#0D5C63] rounded-full text-white text-[14px] font-bold flex justify-center items-center'>
                      <span>{findUser?.firstname?.[0]}</span>
                    </div>
                  }
             
                <div className='w-[100%] flex flex-col gap-[10px]'>
                
                    <span className='font-bold text-[14px] text-[#0D5C63]'>{findUser?.firstname} {findUser?.middlename} {findUser?.lastname}</span>

                    
                    <div className='w-[30%] flex items-center gap-[10px]'>
                   
                    <span className='text-[12px] text-gray-500'>@{findUser?.username}</span>
                 {findPost?.userID !==userID && <>
                  {userFollowed &&      <button
                className="border border-[#0D5C63] text-[#0D5C63] text-[12px] py-0.5 px-4 rounded-[20px]"
                onClick={handleUserUnFollow}
              >
                Unfollow
              </button>}
              {!userFollowed &&    <button
                className="bg-[#0D5C63] text-white text-[12px] py-0.5 px-4 rounded-[20px]"
                onClick={handleUserFollow}
              >
                Follow
              </button>}
                 
                 </>}
          
                    </div>

                </div>
            </div>
            <div className='w-[100%] flex flex-1 justify-end items-center gap-[20px]'>
                <div>
                <div  className="flex flex-1 items-center gap-[10px]">
                    {userLiked ? <IoIosHeart onClick={(e) =>{e.stopPropagation(); removeLikedPost(findPost?._id)}} className="text-red-500 text-[20px] cursor-pointer hover:scale-150 transition duration-500" />:<FaRegHeart onClick={(e) =>{e.stopPropagation(); handleLikedPost(findPost?._id);}} className="text-[20px] cursor-pointer  hover:scale-150 transition duration-500" />}
                      <span className="text-[14px]">{findPost?.like?.length}</span>
                    </div> 
                </div>
                <div>
                <div className="flex items-center gap-[10px]">
                <FaEye /> 
            <span className="text-[14px]">{findPost?.views?.length} views</span>
          </div>  
                </div>

                
          
            </div>
        </div>
        <div className='w-[95%] mx-auto mt-[50px]'>
            <div className='w-[80%]  mx-auto'>
            <img src={findPost?.filename} className="w-[100%]  aspect-video rounded-[10px] object-cover pointer-events-none" alt=""/>
      
            </div>


        </div>
        {findPost?.caption && <div className='w-[70%] mx-auto'><div className='mt-[30px]  w-[100%]  max-[1000px]:w-[100%]'>
         <span className='w-[100%] leading-[30px]  text-gray-500 text-[14px] spacing max-[600px]:text-[12px]'>{findPost?.caption}</span>
         </div></div>}
        {filterPost?.length !==0 &&   <div className="w-[80%] my-[50px] mx-auto flex flex-col gap-[20px]">
            <span className="text-[20px] text-[#0D5C63] font-bold max-[600px]:text-center">Similar Posts</span>

            <motion.div     variants={container}
    initial="hidden"
    animate="visible" className="w-[100%]  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-[10px]">
            {filterPost?.slice(0,4)?.map((post,index)=>{

                        const firstname = userData?.users?.find((user)=>user?._id===post?.userID)?.firstname;
                        const middlename = userData?.users?.find((user)=>user?._id===post?.userID)?.middlename;
                        const username = userData?.users?.find((user)=>user?._id===post?.userID)?.username;
                        const profileImg = userData?.users?.find((user)=>user?._id===post?.userID)?.profileImg;
                        const userLiked2 =  post?.like?.some((user)=>user?.user_id===userID);
               
               
               
               return <motion.div onClick={()=>navigate(`/postDetail/${post._id}`)} variants={item} key={index} className="bg-white my-[5px]  max-[1100px]:pb-4 rounded-[10px]  even:col-span-2 min-h-[400px] odd:col-span-2 cursor-pointer">
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
                        <span className="text-[12px] text-[#0D5C63] font-extrabold">{firstname} {middlename}</span>
                        <span className="text-gray-400 text-[11px]">@{username}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-[20px] text-gray-500">
          <div className="flex items-center gap-[5px] text-[14px]">
            
            <div className="flex items-center gap-[5px]">
            <div  className="flex items-center gap-[10px]">
                    {userLiked2 ? <IoIosHeart onClick={(e) =>{e.stopPropagation(); removeLikedPost(post?._id)}} className="text-red-500 text-[20px]" />:<FaRegHeart onClick={(e) =>{e.stopPropagation(); handleLikedPost(post?._id);}} className="text-[20px]" />}
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

        </motion.div>
        </div> }
      
    </div>
  )
}

export default PostDetail