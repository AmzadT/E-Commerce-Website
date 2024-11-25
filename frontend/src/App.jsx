import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Product from './pages/Product'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import TitleImage from './components/TitleImage'
import ProtectedRoute from './components/ProtectedRoute';
import { useContext } from 'react'
import { ShopContext } from './context/ShopContext'



const App = () => {

  const { token } = useContext(ShopContext)

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <TitleImage />
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        {/* <Route path='/cart' element={<Cart />} /> */}
        <Route path='/collection' element={<Collection />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/product/:productId' element={<Product />} />
        {/* <Route path='/orders' element={<Orders />} /> */}
        <Route path='/verify' element={<Verify />} />

        {/* Protected routes */}

        <Route path='/cart' element={<ProtectedRoute token={token}><Cart /></ProtectedRoute>} />
        <Route path='/orders' element={<ProtectedRoute token={token}><Orders /></ProtectedRoute>} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App