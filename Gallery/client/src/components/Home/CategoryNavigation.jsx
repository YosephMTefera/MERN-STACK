import {useDispatch, useSelector} from 'react-redux'
import { postAction } from '../../REDUX/postSlice'
import useCategoryFetch from '../../hooks/categoryFetch';



function CategoryNavigation() {
  const dispatch = useDispatch()
  const {category} = useSelector((state)=>state.post)

  const {categoryList} = useCategoryFetch();
  

  return <div className="w-[95%] mx-auto h-[80px]  border-b border-gray-300 flex justify-center items-center overflow-x-auto hide-scroll-bar">
      <div className="w-[100%] mx-auto flex justify-between items-center">

      <div className='flex items-center gap-[50px] text-gray-500'>
        {categoryList && categoryList?.map((categoryID,index)=>{
          return <button key={index} className={category ===categoryID?._id ? "uppercase text-[12px] font-bold py-2 px-4 bg-[#0D5C63] rounded-[20px] text-white max-[700px]:text-[10px] whitespace-nowrap" :'whitespace-nowrap uppercase text-[12px] font-bold max-[700px]:text-[10px]'} onClick={()=>dispatch(postAction.setCategory(categoryID?._id))}>{categoryID?.categoryName}</button>
        })}

      </div>


      </div>
  </div>;
}

export default CategoryNavigation;
