import {GrHomeRounded} from 'react-icons/gr'
import { FaUsers } from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import apiRequest from '../../utils/request'
import {useDispatch, useSelector} from 'react-redux'
import { appStateAction } from '../../REDUX/applicationStateSlice'
import useUserFetch from '../../hooks/userFetch'
import { RiMenu2Fill  } from 'react-icons/ri'


function Navbar() {
    const navigate= useNavigate()
    const dispatch = useDispatch()
    const {navbarOpened} = useSelector((state)=>state.appState);
    const userID = localStorage.getItem('userID');
    const {users} = useUserFetch()
    
   
    const findUser = users?.find((us)=>us?._id===userID);

    const handleLogout = async ()=>{
       try {
        await apiRequest.get('/api/users/logout').then(()=>{
            localStorage.clear();
            navigate('/login')
        }).catch((error)=>{
            dispatch(appStateAction.setAppstate({
                error:error.response.data.message
            }))
           
        })
        
       } catch (error) {
        dispatch(appStateAction.setAppstate({
            error:error.message
        }))

        
       }
    }
  return (
    <div className="w-[100%] h-[80px] bg-white shadow-md flex items-center justify-center fixed z-50">
        <div className='w-[95%] h-[100%]  mx-auto flex justify-between items-center bg-white max-[700px]:w-[90%]'>
            <div className='min-[700px]:hidden'>
            <RiMenu2Fill onClick={()=>dispatch(appStateAction.setNavbar(!navbarOpened))} className='text-[30px] font-bold text-[#0D5C63] cursor-pointer'/>

            </div>
        <div className='flex items-center gap-[50px] bg-white text-gray-500 font-bold max-[700px]:hidden'>
            <a href="/" className='h-[100%] flex items-center gap-[10px]'>
                <GrHomeRounded className='text-[20px]' />
                <span>Home</span>
            </a>
   
            <a href="/users" className='h-[100%] flex items-center gap-[10px]'>
                <FaUsers className='text-[20px]' />
                <span>Community</span>
            </a>
          

        </div>
         <div className='max-[900px]:hidden'>
                <span className='text-[30px] font-bold text-[#0D5C63] uppercase'>[MYGallery]</span>
        </div>
        <div className='flex items-center gap-[30px]'>
            <button className='border border-gray-400 py-1 px-4 text-[14px] text-gray-500 rounded-[5px]' onClick={()=>navigate('/upload')}>Upload</button>
            {findUser?.profileImg ?   <div className='w-[40px] h-[40px] rounded-full cursor-pointer' onClick={()=>navigate("/myprofile")}>
                <img className='w-[100%] h-[100%] rounded-full object-cover' src={findUser?.profileImg} alt=''/>
            </div>:  <div className='w-[40px] h-[40px] rounded-full bg-[#0D5C63] cursor-pointer flex justify-center items-center' onClick={()=>navigate("/myprofile")}>
               <span className='text-white font-bold'>{findUser?.firstname?.[0]}</span>
            </div>}
          
            <button className='bg-[#0D5C63] text-[12px] font-bold text-white py-2 px-3 rounded-[5px]' onClick={handleLogout}>Logout</button>
        </div>
        </div>
    </div>
  )
}

export default Navbar
