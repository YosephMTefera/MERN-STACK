import {Routes,Route} from 'react-router-dom'
import Users from './Users'
import UserDetail from './UserDetail'
import UserProfile from './UserProfile'
import HomeFeed from './HomeFeed'
import PostDetail from './PostDetail'
import Upload from './Upload'

function Content() {

  return (
    <div className="w-[100%] py-[2px] min-h-[100vh]">

        <Routes>
          <Route path='/' Component={HomeFeed} />
            <Route path='/users' Component={Users} />
            <Route path='/users/:id' Component={UserDetail} />
            <Route path='/myprofile' Component={UserProfile} />
            <Route path='/postDetail/:id' Component={PostDetail} />
            <Route path='/upload' Component={Upload} />
        </Routes>
     
    </div>
  )
}

export default Content