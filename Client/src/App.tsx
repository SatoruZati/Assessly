import './Global.css'
import { StateProvider } from './Context API/StateContext'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import LandingPage from './Pages/LandingPage'
       
function App() {
  return <StateProvider>
    <BrowserRouter>
        <Routes>
            {<Route path='/signup' element = {<Signup/>}/>}
            {<Route path='/signin' element = {<Login/>}/>}
            {<Route path='/' element = {<LandingPage/>}/>}
        </Routes>
    </BrowserRouter>
  </StateProvider>
}

export default App