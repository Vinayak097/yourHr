import { useState } from 'react'

import './App.css'
import Signup from './components/Signup';
import {BrowserRouter ,Routes ,Route} from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';


function App() {
  return (
    <>

    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup></Signup>}></Route>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/profile' element={<Profile></Profile>}></Route>
    </Routes>
    </BrowserRouter>
    </>
      
       
  )
}

export default App
