import { useState } from 'react'
import './App.css'
import { Routes,Route} from 'react-router-dom'
import Post from './component/Post'
import CreatePost from './component/Createpost'
function App() {

 return (
    <>
      <Routes>
        <Route path="/" element={<Post/>}/>
        <Route path="/createpost" element={<CreatePost/>}/>
      </Routes>
    </>
 )
}

export default App
