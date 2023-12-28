import { FaUsers } from "react-icons/fa"
import { GrHomeRounded } from "react-icons/gr"


const ResponsiveNavbar = () => {
  return (
    <div className="w-[50%] h-[100vh] p-2 fixed bottom-0 z-40 top-[80px] bg-white min-[700px]:hidden">
        <div className="w-[95%] mt-[100px] mx-auto">
        <div className='flex flex-col gap-[50px] bg-white text-gray-500 font-bold'>
            <a href="/" className='h-[100%] flex items-center gap-[10px]'>
                <GrHomeRounded className='text-[20px]' />
                <span>Home</span>
            </a>
   
            <a href="/users" className='h-[100%] flex items-center gap-[10px]'>
                <FaUsers className='text-[20px]' />
                <span>Community</span>
            </a>
          

        </div>
        </div>

    </div>
  )
}

export default ResponsiveNavbar