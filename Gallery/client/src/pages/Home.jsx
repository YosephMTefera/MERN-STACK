import { useEffect } from "react";
import Content from "../components/Home/Content"
import Navbar from "../components/Home/Navbar"
import {useDispatch, useSelector} from 'react-redux'
import { postAction } from "../REDUX/postSlice";
import ResponsiveNavbar from "../components/Home/ResponsiveNavbar";


function Home() {
  const disPatch = useDispatch();
  const {navbarOpened} = useSelector((state)=>state.appState);
  
  useEffect(()=>{
    disPatch(postAction.setCategory("65859d27f8e02b0d9d69624f"))
  },[disPatch])
  
  
  return (
    <div className="w-[100%]">
        <Navbar />
        {navbarOpened &&        <ResponsiveNavbar />}
        <Content />
    </div>
  )
}

export default Home