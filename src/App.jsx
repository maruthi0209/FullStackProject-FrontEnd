import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/Login'
import Categories from './Pages/Categories'
import PageNotFound from './Pages/PageNotFound'
import SignUp from './Pages/SignUp'
import ForgotPassword from './Components/LoginAndSignUp/ForgotPassword'
import UserProfile from './Pages/UserProfile'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/categories' element={<Categories/>} />
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
