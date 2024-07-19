import React from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import AllBooks from './pages/AllBooks'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import AboutUs from './pages/AboutUs'
import ViewBookDetail from './components/viewBookDetail/ViewBookDetail'
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/allbooks' element={<AllBooks />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/viewbookdetails/:id' element={<ViewBookDetail />} />
          <Route path='/*' element={<div>No Such directory</div>} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App