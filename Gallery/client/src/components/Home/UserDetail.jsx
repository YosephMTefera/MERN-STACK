import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react';
import apiRequest from '../../utils/request';
import useSWR from 'swr'
import {useNavigate} from 'react-router-dom';
import { motion } from "framer-motion"
import { FaEye, FaRegHeart } from 'react-icons/fa';
import { IoIosHeart } from 'react-icons/io';
import {useDispatch} from  'react-redux'
import { appStateAction } from '../../REDUX/applicationStateSlice';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { container, item } from '../../utils/data';

function UserDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {id} = useParams();
  const userFetcher = (url) => apiRequest.get(url).then((res) => res?.data);
  const { data:userData } = useSWR(
    "/api/users/get_users",
    userFetcher,
    {
      refreshInterval: 1000,
    }
    );
  
  
  const userID = localStorage.getItem('userID');
  const [componentError,setComponentError] = useState(false)
  const findUser = userData?.users?.find((user)=>user?._id === id);
  const userFollowed =  findUser?.followers?.some((user)=>user?.user_id===userID);


  const fetcher = (url) => apiRequest.get(url).then((res) => res?.data);
  const { data:postData,mutate,error } = useSWR(
 "/api/posts/get_posts",
 fetcher,
 {
   refreshInterval: 1000,
 }
);

  const filteredPost = postData?.posts?.filter((post)=>post?.userID===findUser?._id);




  const handleUserFollow =async () =>{
      try {
        await apiRequest.put('/api/users/follow-user',{
          userID:userID,
          usertobeFollowedID:findUser?._id
        }).then((res)=>{
          console.log(res.data)
        
        }).catch((error)=>{
          setComponentError(error.response.data.message)
        
        })
        
      } catch (error) {
        dispatch(appStateAction.setError(true))
      }
  }

  const handleUserUnFollow =async ()=>{
      try {
        await apiRequest.put('/api/users/unfollow-user',{
          userID:userID,
          usertobeFollowedID:findUser?._id
        }).then((res)=>{
      
          console.log(res.data)
      
          
        }).catch((error)=>{
          setComponentError(error.response.data.message)
        })
        
      } catch (error) {
        dispatch(appStateAction.setError(true))
      }
    }

    
  const handleLikedPost = async (id)=>{
    try {
    
  
      await apiRequest.put(`/api/posts/like_Post/${id}`,{userID}).then(()=>{
    
      mutate('/api/posts/get_posts')
    
  
    }).catch((error)=>{
      setComponentError(error.response.data.message)
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
  useEffect(()=>{
        window.scrollTo({ top: 0 });
  },[]);

  if(error) return dispatch(appStateAction.setError(true))


  return (
    <div className="w-[100%] my-[100px] p-2">
    <div className="w-[70%] mx-auto mt-[50px] max-[1400px]:w-[80%]">
      <div className="flex items-center gap-[50px] max-[700px]:flex-col max-[700px]:justify-center">
      {findUser?.profileImg ?  <div className="rounded-full">
          <img
            src={findUser?.profileImg}
            className="w-[200px] h-[200px] object-cover rounded-full max-[1100px]:w-[100px] max-[1100px]:h-[100px]"
            alt=""
          />
        </div>:  <div className=" w-[150px] h-[150px] flex justify-center items-center bg-[#0D5C63] rounded-full max-[1100px]:w-[100px] max-[1100px]:h-[100px]">
          <span className='text-[50px] text-white'>{findUser?.firstname?.[0]}</span>
        </div> }
        <div className="w-[50%] flex flex-col max-[700px]:justify-center max-[700px]:items-center gap-[20px] max-[1200px]:flex-1 max-[1200px]:w-[100%]">
            <div>
          <div className="flex items-center gap-[20px]">
            <span className="text-[30px] text-[#0D5C63] font-bold max-[850px]:text-[20px]">
              {findUser?.firstname} {findUser?.middlename} {findUser?.lastname}
            </span>
            {userFollowed  &&  <button
                className="border border-[#0D5C63] text-[#0D5C63] text-[12px] py-0.5 px-4 rounded-[20px]"
                onClick={handleUserUnFollow}
              >
                Unfollow
              </button>}
              {!userFollowed &&   <button
                className="bg-[#0D5C63] text-white text-[12px] py-0.5 px-4 rounded-[20px]"
                onClick={handleUserFollow}
              >
                Follow
              </button>}
          </div>
          <div className='my-[10px] flex items-center gap-[20px] text-gray-500 text-[12px]'>
            <span className=' hover:underline'>@{findUser?.username}</span>
            <span>|</span>
            <span className='hover:underline'>followers {findUser?.followers?.length}</span>
            <span>|</span>
            <span className='hover:underline'>following {findUser?.following?.length}</span>
          </div>
          <div className='flex items-center gap-[20px]'>
            {findUser?.interesets?.map((interest,index)=>{
              return <span key={index} className='relative px-4 py-1 bg-[#2b5a5e] text-white text-[12px] rounded-[20px] flex justify-between gap-[20px]'>{interest} </span>
            })}
        


          </div>
          </div>
{findUser?.caption && 
          <span className="text-gray-500 text-[12px]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam at
            qui suscipit dolor. Eum repellat cumque, aperiam animi totam
            praesentium iste deleniti possimus deserunt sint eligendi saepe
            corporis a quas, architecto libero delectus. Laboriosam,
            praesentium sint quos temporibus perferendis vero.
          </span>}
        </div>
      </div>
      <div className="w-[100%] mt-[100px] flex flex-col gap-[20px]">
        <span className="text-[20px] text-[#0D5C63] font-bold">
        Posts 
        </span>
        {componentError && <div className='mt-[50px]'>
          <span>{componentError}</span>
          </div>}
      
          <motion.div     variants={container}
    initial="hidden"
    animate="visible" className="w-[100%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-[10px]">
            {filteredPost?.length ===0 ? <div className="w-[100%] col-span-6 flex justify-center items-center"> <span className="font-bold">No data available</span></div> :filteredPost?.map((post,index)=>{

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
        
          <div className=" h-[30px] w-[30px]  flex justify-center rounded-full items-center gap-[5px] text-[14px]  hover:bg-gray-200">
          <BsThreeDotsVertical className='font-bold text-[20px]'/>

          </div>
        </div>
   
      
                    </div>

             
                
                </motion.div>
            })}

          

        </motion.div>

     
      </div>
    </div>
  </div>
  )
}

export default UserDetail