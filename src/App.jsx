import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/Login'

function App() {
  return (
    <>
      <div className='app'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage/>} />
      </Routes>
      </div>
    </>
  )
}

export default App
