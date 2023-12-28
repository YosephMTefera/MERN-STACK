import {useNavigate} from 'react-router-dom'
import apiRequest from '../../utils/request';
import useSWR from 'swr'

function Users() {
    const navigate = useNavigate()
    const userID = localStorage.getItem('userID')
 
 const userFetcher = (url) => apiRequest.get(url).then((res) => res?.data);
 const { data:userData } = useSWR(
"/api/users/get_users",
userFetcher,
{
  refreshInterval: 1000,
}
);
const filterUsers = userData?.users?.filter((user)=>user?._id !==userID);

const handleUserFollow =async (id)=>{
  try {
    await apiRequest.put('/api/users/follow-user',{
      userID:userID,
      usertobeFollowedID:id
    }).then((res)=>{
      console.log(res.data)
    
    }).catch((error)=>{
      console.log(error.response.data.message)
    })
    
  } catch (error) {
    console.log(error.message)
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
      console.log(error.response.data.message)
    })
    
  } catch (error) {
    console.log(error.message)
  }
}

  return (
    <div className="w-[100%] my-[150px]">
        
        <div className="w-[90%] my-[30px] mx-auto">
            <div className="my-[50px]">
                    <span className="text-[25px] text-[#0D5C63] font-bold">Community</span>
            </div>
        <div     

className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7  gap-[10px] max-[600px]:w-[100%]">
        {
          filterUsers?.length ===0 ? <div className='w-[100%] flex justify-center items-center'><span>No Users Available</span></div>  :filterUsers?.map((user,index)=>{

            const findUser = userData?.users?.find((u)=>u._id===user?._id)
            const userFollowed =  findUser?.followers?.some((user)=>user?.user_id===userID);

            
              
              return <div key={index} className="col-span-2 flex flex-col items-center gap-[15px] bg-white py-4 px-2 rounded-[10px] shadow-sm">
                     {user?.profileImg ?   <div className='w-[100px] h-[100px] rounded-full cursor-pointer'>
                <img className='w-[100%] h-[100%] rounded-full object-cover' src={user?.profileImg} alt=''/>
            </div>:  <div className='w-[100px] h-[100px] rounded-full bg-[#0D5C63] cursor-pointer flex justify-center items-center'>
               <span className='text-white text-[30px] font-bold'>{user?.firstname?.[0]}</span>
            </div>}
                
                    <div className='flex flex-col items-center gap-[5px]'>
                        <span onClick={()=>navigate(`/users/${user._id}`,{state:{user:user}})} className="text-[14px] font-bold hover:underline cursor-pointer text-[#0D5C63]">{user?.firstname} {user?.middlename}</span>
                        <span className='text-[12px] text-gray-500'>{user?.profession}</span>

                    </div>
               
                  {userFollowed &&      <button
                className="border border-[#0D5C63] text-[#0D5C63] text-[12px] py-0.5 px-4 rounded-[20px]"
                onClick={()=>handleUserUnFollow(user?._id)}
              >
                Unfollow
              </button>}
              {!userFollowed &&    <button
                className="bg-[#0D5C63] text-white text-[12px] py-0.5 px-4 rounded-[20px]"
                onClick={()=>handleUserFollow(user?._id)}
              >
                Follow
              </button>}
                 
                 


                </div>
            })
        }


    </div>
        </div>
    </div>
  )
}

export default Users