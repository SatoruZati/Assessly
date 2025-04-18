import './Global.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './Pages/Login'

function App() {

  return (
    <BrowserRouter>
        <Routes>
            {<Route path='/signin' element = {<Login/>}/>}
            {<Route path='/signup' element = {<Login/>}/>}
        </Routes>
    </BrowserRouter>

  )
}

export default App