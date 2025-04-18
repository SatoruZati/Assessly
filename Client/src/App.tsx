import './Global.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from './pages/Signup'
import Login from './pages/Login'
function App() {

  return (
    <BrowserRouter>
        <Routes>
            {<Route path='/' element = {<Signup/>}/>}
            {<Route path='/signin' element = {<Login/>}/>}
        </Routes>
    </BrowserRouter>

  )
}

export default App