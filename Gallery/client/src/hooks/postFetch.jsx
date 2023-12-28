import  { useEffect, useState } from 'react'
import apiRequest from '../utils/request';
import {useDispatch} from 'react-redux'
import { postAction } from '../REDUX/postSlice';


const usePostFetch = () => {
  const dispatch = useDispatch()
    const [posts, setPosts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {

         await apiRequest.get(`/api/posts/get_posts`).then((res)=>{
          // console.log(res.data)
          setPosts(res.data.posts);
          dispatch(postAction.setPosts({
            posts:res.data.posts
          }))
          
        }).catch((error)=>{
          setError(error.response.data.message);
        });
      
 
   
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }

    };

    fetchPosts()
   


  }, [dispatch]);
  return  {posts, isLoading, error };
}

export default usePostFetch