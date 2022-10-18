import React, { useState } from 'react'
import CreatePost from './pages/CreatePost'
import Home from './pages/Home'
import Login from './pages/Login'
import Post from './pages/Post'
import SignUp from './pages/SignUp'
import './App.css'
import { Routes,Route, BrowserRouter } from 'react-router-dom'
import { User } from './pages/Home/type'
import Search from './pages/Search'
function App() {


  const [user, setUser] = useState<User>({} as User)

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route element={<Home user={user} setUser={setUser}/>} path='/'/>
        <Route element={<CreatePost author={user}/>} path='/new'/>
        <Route element={<Post user={user}/>} path='/post/:id'/>
        <Route element={<SignUp/>} path='/signup'/>
        <Route element={<Login/>} path='/login'/>
        <Route element={<Search/>} path='/search'/>
      </Routes>
      </BrowserRouter>
     
    </div>
  )
}

export default App