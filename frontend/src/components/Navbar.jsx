import { useContext, useState } from 'react'
import { assets } from '../assets/assets.js'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext.jsx'

const Navbar = () => {

    const [visible, setVisible] = useState(false)
    const { setShowSearch, cartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    return (
            <div className="flex items-center justify-between py-5 font-medium">
                <Link to='/'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBziGLGyV1PgU1m3r1KQK5dmnl_P-LnbdBg&s' className='w-60 h-20 -ml-8' alt='Logo' />
                </Link>

                <ul className='hidden sm:flex gap-5 text-md text-gray-700'>

                    <NavLink to='/' className='flex flex-col items-center gap-1'>
                        <p>HOME</p>
                        <hr className='w-[45px] border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>

                    <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                        <p>COLLETIONS</p>
                        <hr className='w-[90px] border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>

                    <NavLink to='/about' className='flex flex-col items-center gap-1'>
                        <p>ABOUT</p>
                        <hr className='w-[50px] border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>

                    <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                        <p>CONTACT</p>
                        <hr className='w-[65px] border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>

                </ul>

                <div className='flex items-center gap-6' >
                    <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt='Serarch-icon' className='w-7 cursor-pointer' />

                    <div className='group relative'>

                        <img
                            onClick={() => token ? null : navigate('/login')}
                            src={assets.profile_icon}
                            alt="Profile-Icon"
                            className="w-10 h-10 min-w-[40px] min-h-[40px] sm:w-12 sm:h-12 lg:w-10 lg:h-10 cursor-pointer object-contain rounded-full border-2 border-gray-300 p-1"
                        />



                        {/* DropDown Menu */}

                        {
                            token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4' >
                                <div className='flex flex-col gap-2 w-44 py-3 px-5 bg-slate-100 text-gray-500 rounded' >
                                    <p onClick={() => navigate('/profile')} className='cursor-pointer hover:text-black text-center'>My Profile</p>
                                    <hr className='w-[100px] border-none h-[0.5px] bg-gray-300 ml-4' />
                                    <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black text-center'>Orders</p>
                                    <hr className='w-[100px] border-none h-[0.5px] bg-gray-300 ml-4' />
                                    <p onClick={logout} className='cursor-pointer hover:text-black text-center'>LogOut</p>
                                    <hr className='w-[100px] border-none h-[0.5px] bg-gray-300 ml-4' />
                                    <a href='https://shop-sphere-admin-theta.vercel.app' target='_blank' onClick={() => navigate('/admin')} className='cursor-pointer hover:text-black text-center'>Admin Panel</a>
                                </div>
                            </div>
                        }
                    </div>

                    <Link to='/cart' className='relative' >
                        <img src={assets.cart_icon} alt='Cart-Icon' className='w-6 min-w-5' />
                        <p className='absolute right-[-8px] top-[1px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{cartCount()}</p>
                    </Link>

                    <img onClick={() => setVisible(true)} src={assets.menu_icon} alt='Menu-icon' className=' sm:hidden w-5 cursor-pointer' />
                </div>


                {/* Sidebar for smaller screens */}

                <div className={`absolute top-0 bottom-0 right-0 overflow-hidden bg-white transition-all  duration-500 ${visible ? 'w-full' : 'w-0'}`} >
                    <div className='flex flex-col text-gray-600'>
                        <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                            <img src={assets.dropdown_icon} alt='dropdown_icon' className='h-4 rotate-180 ' />
                            <p>Back</p>
                        </div>

                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border text-center mr-4 ml-4 mt-2 font-bold ' to='/' >HOME</NavLink>

                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border text-center mr-4 ml-4 mt-2 font-bold' to='/collection' >COLLECTION</NavLink>

                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border text-center mr-4 ml-4 mt-2 font-bold' to='/about' >ABOUT</NavLink>

                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border text-center mr-4 ml-4 mt-2 font-bold' to='/contact' >CONTACT</NavLink>
                    </div>
                </div>
            </div>
    )
}

export default Navbar

