import './Global.css'
import { StateProvider } from './Context API/StateContext'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './Components/Dashboard'

import LandingPage from './pages/LandingPage'

function App() {
  return <StateProvider>
    <BrowserRouter>
        <Routes>
            {<Route path='/signup' element = {<Signup/>}/>}
            {<Route path='/signin' element = {<Login/>}/>}
            {<Route path='/dashboard' element = {<Dashboard/>}/>}
            {<Route path='/' element = {<LandingPage/>}/>}
        </Routes>
    </BrowserRouter>
  </StateProvider>
}

export default App