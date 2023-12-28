import connectionLost from '../Images/connection-lost.png'

const Error = () => {
  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center">
      <div className='min-h-[400px] flex flex-col gap-[20px]'>
        <img src={connectionLost} className='object-cover' alt=""/>
      <span className='text-[14px] text-gray-500 my-[30px]'>Connection Lost. Please check your interenet connection and try again!</span>
        <button onClick={()=>window.location.reload()} className='bg-[#0D5C63] px-4 py-2 rounded-[20px] text-white'>Reload Page</button>
      </div>
    </div>
  )
}

export default Error