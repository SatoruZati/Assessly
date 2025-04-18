import './Global.css'
import { StateProvider } from './Context API/StateContext'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from './pages/Signup'
import Login from './pages/Login'
       
function App() {
  return <StateProvider>
    <BrowserRouter>
        <Routes>
            {<Route path='/' element = {<Signup/>}/>}
            {<Route path='/signin' element = {<Login/>}/>}
        </Routes>
    </BrowserRouter>
  </StateProvider>
}

export default App