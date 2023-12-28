import  { useEffect, useState } from 'react'
import { FaEye, FaRegHeart } from 'react-icons/fa';
import { IoIosAddCircle, IoIosHeart } from 'react-icons/io';
import {useNavigate} from 'react-router-dom'
import { motion } from "framer-motion"
import useSWR from 'swr'
import apiRequest from '../../utils/request';
import UserFollowing from './UserFollowing';
import {useDispatch, useSelector} from 'react-redux'
import { profileSliderAction } from '../../REDUX/profileSliderSlice';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {MdDelete, MdEdit} from 'react-icons/md'
import { appStateAction } from '../../REDUX/applicationStateSlice';
import {ThreeDot} from 'react-loading-indicators'
import EditProfile from './EditProfile';
import Interest from './Interest';
import { container, item } from '../../utils/data';

function UserProfile() {
  const dispatch = useDispatch();
  const {isDisplayed,following} = useSelector((state)=>state.profileSlider);
  const {editProfile,interest} = useSelector((state)=>state.appState)
  const [menu,setMenu] = useState(false) 
  const [error,setError] = useState(false)

  const navigate = useNavigate()
  const userID = localStorage.getItem('userID')
 
  const userFetcher = (url) => apiRequest.get(url).then((res) => res?.data);
  const { data:userData,mutate,isLoading } = useSWR(
 "/api/users/get_users",
 userFetcher,
 {
   refreshInterval: 1000,
 }
 );




 const fetcher = (url) => apiRequest.get(url).then((res) => res?.data);
 const {data:postData,mutate:postMutate,isLoading:postLoading,error:userError } = useSWR(
"/api/posts/get_posts",
fetcher,
{
  refreshInterval: 1000,
}
);



const findPost = postData?.posts?.filter((post)=>post?.userID===userID);
const findUser = userData?.users?.find((us)=>us?._id===userID);


useEffect(()=>{
  try {
    dispatch(profileSliderAction.setfollowingList({
      followingList:findUser?.following,
      followerList:findUser?.followers
  
  }))
  mutate('/api/users/get_users')
    
  } catch (error) {
    dispatch(appStateAction.setError(true))
    
    
  }


// eslint-disable-next-line react-hooks/exhaustive-deps
},[mutate,dispatch])



const handleLikedPost = async (id)=>{
  try {
  

    await apiRequest.put(`/api/posts/like_Post/${id}`,{userID}).then(()=>{
    postMutate('/api/posts/get_posts')
  

  }).catch(error=>{
    setError(error.response.data.message)
  })

  
    
  } catch (error) {
    dispatch(appStateAction.setError(true))
    
  }
}

const removeLikedPost = async (id)=>{
  try {
    await apiRequest.put(`/api/posts/remove_like_post/${id}`,{userID}).then(()=>{
    postMutate('/api/posts/get_posts')

    }).catch((error)=>{
      setError(error.response.data.message)
    })
    
  } catch (error) {
    dispatch(appStateAction.setError(true))

    
  }
}
const handleDeletePost =async (id)=>{
  try {
    await apiRequest.delete(`/api/posts/remove_post/${id}`).then((res)=>{
      console.log(res.data)
      postMutate('/api/posts/get_posts')
    }).catch((error)=>{
setError(error.response.data.message)
  
    })
    
  } catch (error) {
    dispatch(appStateAction.setError(true))
    
  }

  
}

    useEffect(()=>{
        window.scrollTo({ top: 0 });
    },[])

    if(isLoading || postLoading){
      return <ThreeDot variant="pulsate" color="#32cd32" size="medium" text="" textColor="" />
    }

    
 if(userError){
  return  dispatch(appStateAction.setError(true))
 } 

  return (
    <div className="relative mt-[100px] mb-[20px] w-[100%] p-2">
   {error &&  <div className='w-[100%] h-[80px] my-[20px] p-2 flex justify-center items-center bg-white shadow-md '>
      <span>{error}</span>
      </div>}
    
    <div onClick={()=>setMenu(false)} className="w-[70%] rounded-[20px] bg-white mx-auto my-[50px] p-4 max-[1100px]:w-[100%]">
      <div className="flex flex-col items-center gap-[50px]">
        {findUser?.profileImg ?   <div className="rounded-full">
          <img
            src={findUser.profileImg}
            className="w-[200px] h-[200px] object-cover rounded-full max-[1100px]:w-[100px] max-[1100px]:h-[100px]"
            alt=""
          />
        </div>:  <div className=" w-[150px] h-[150px] flex justify-center items-center bg-[#0D5C63] rounded-full">
          <span className='text-[50px] text-white'>{findUser?.firstname?.[0]}</span>
        </div> }
      
        <div className="w-[100%] flex flex-col  items-center gap-[50px] text-center">
            <div>
          <div className=" flex justify-center items-center gap-[10px] text-center">
            <span className="text-[30px] text-[#0D5C63] font-bold max-[700px]:text-[20px]">
              {findUser?.firstname} {findUser?.middlename} {findUser?.lastname} 
            </span>
            <MdEdit onClick={()=>dispatch(appStateAction.setEditProfile(true))} className="text-[30px] text-[#0D5C63] font-bold cursor-pointer"/>
         
          </div>
          <div className='flex mt-[10px] items-center justify-center gap-[20px] text-gray-500 text-[12px]'>
            <span className=' hover:underline'>@{findUser?.username}</span>
            <span>|</span>
            <span className='hover:underline cursor-pointer' onClick={()=>dispatch(profileSliderAction.setSliderState({
               initial:{
                x:700
               },
               animate:{
                    x:0
                },
                following:false

            }))}>followers {findUser?.followers?.length}</span>
            <span>|</span>
            <span className='hover:underline cursor-pointer'onClick={()=>dispatch(profileSliderAction.setSliderState({
               initial:{
                x:700
               },
               animate:{
                    x:0
                },
                following:true

            }))}>following {findUser?.following?.length}</span>
            <span>|</span>
            <span onClick={()=>dispatch(appStateAction.setIntereset(true))} className='text-[14px] text-[#2b5a5e] font-bold cursor-pointer flex items-center gap-[10px]'><IoIosAddCircle  className='text-[20px]'/> Add Interest</span>
          </div>
          </div>
          <div className='flex items-center gap-[20px]'>
            {findUser?.interesets?.map((interest,index)=>{
              return <span key={index} className='relative px-4 py-1 bg-[#2b5a5e] text-white text-[12px] rounded-[20px] flex justify-between gap-[20px]'>{interest} </span>
            })}
        


          </div>
        </div>
      </div>
      <div className="w-[90%] mx-auto mt-[100px] flex flex-col gap-[20px]">
        <span className="text-[20px] text-[#0D5C63] font-bold">
        My Posts 
        </span>

        <motion.div     variants={container}
    initial="hidden"
    animate="visible" className="w-[100%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-[10px]">
            {findPost?.length ===0 ? <div className="w-[100%] col-span-6 flex flex-col justify-center items-center gap-[20px]"> <span className="font-bold">You don&apos;t have any posts</span> <span className='underline cursor-pointer' onClick={()=>navigate('/upload')}>Create your first post</span></div> :findPost?.map((post,index)=>{

           const userLiked =  post?.like?.some((user)=>user?.user_id===userID);
                return <motion.div onClick={()=>navigate(`/postDetail/${post._id}`)} variants={item} key={index}  className="border relative bg-white my-[5px]  max-[1100px]:pb-4 rounded-[10px]   col-span-2 min-h-[400px] cursor-pointer">
                    <img src={post?.filename} className="w-[100%] h-[80%] aspect-video rounded-[10px] object-cover pointer-events-none" alt=""/>
                <div className="w-[90%] mt-[30px]  mx-auto flex items-center justify-between gap-[20px]">
             
                    <div className="flex items-center gap-[20px] text-gray-500">
          <div className="flex items-center gap-[5px] text-[14px]">
            
            <div className="flex items-center gap-[5px]">
          
            <div  className="flex items-center gap-[10px]">
                    {userLiked ? <IoIosHeart onClick={(e) =>{e.stopPropagation(); removeLikedPost(post?._id)}} className="text-red-500 text-[20px] cursor-pointer hover:scale-150 transition duration-500" />:<FaRegHeart onClick={(e) =>{e.stopPropagation(); handleLikedPost(post?._id);}} className="text-[20px] cursor-pointer  hover:scale-150 transition duration-500" />}
                      <span className="text-[14px]">{post?.like?.length}</span>
                    </div> 
       
            </div>
            
          </div>
          <div className="flex items-center gap-[5px] text-[14px]">
            <FaEye />
            <span className="text-[14px]">{post?.views?.length}</span>
          </div>
        </div>

        <div className="flex items-center gap-[20px] text-gray-500">
        
          <div className=" h-[30px] w-[30px]  flex justify-center rounded-full items-center gap-[5px] text-[14px]  hover:bg-gray-200" onClick={(e)=>{e.stopPropagation(); setMenu(!menu)}}>
          <BsThreeDotsVertical className='font-bold text-[20px]'/>

          </div>
        </div>
  

                       
      
                    </div>

                    {menu &&     <div className='bg-white w-[50%] p-2  flex flex-col gap-[20px] shadow-lg  absolute right-0 rounded-[10px]'>
              <div onClick={(e)=>{e.stopPropagation(); handleDeletePost(post?._id)}} className='p-2 flex items-center gap-[5px] hover:bg-[#2b5a5e] rounded-[5px] hover:text-white'>
              <MdDelete />
              <span>Delete</span>
              </div>
              

            </div>}
                
                </motion.div>
            })}

          

        </motion.div>
      </div>
    </div>
    
    {isDisplayed &&   <div  className='w-[100%] flex justify-center items-center overflow-x-hidden'>
  
<UserFollowing following={following} /> 

    </div>}

    {editProfile && <EditProfile /> }
    {interest && <Interest  findUser={findUser}/>}


  
    
  </div>
  )
}

export default UserProfile