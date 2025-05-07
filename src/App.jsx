import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/Login'
import Categories from './Pages/Categories'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/categories' element={<Categories/>} />
      </Routes>
    </>
  )
}

export default App
