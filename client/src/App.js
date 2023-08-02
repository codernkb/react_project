import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Fetch from './components/Fetch'
import Register from './components/Register'
import Nav from './components/Nav';
import Update from './components/Update';


function App() {
  return (
    <>
        <BrowserRouter>
        <Nav/>
         <Routes>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/fetch' element={<Fetch/>}></Route>
          <Route path='/update/:id' element={<Update/>}></Route>
         
         </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
