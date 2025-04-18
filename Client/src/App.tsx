import './Global.css'
import { StateProvider } from './Context API/StateContext'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './Components/Dashboard'
import GenerateTest from './Components/GenerateTest'
import GeneratorModal from './Components/GeneratorModal'
function App() {
  return <StateProvider>
    <BrowserRouter>
        <Routes>
            {<Route path='/signup' element = {<Signup/>}/>}
            {<Route path='/signin' element = {<Login/>}/>}
            {<Route path='/dashboard' element = {<Dashboard/>}/>}
            {<Route path='/generate-test' element = {<GenerateTest isOpen={true} onClose={() => {}} />} />}
            {<Route path='/generator-modal' element = {<GeneratorModal/>} />}
        </Routes>
    </BrowserRouter>
  </StateProvider>
}

export default App