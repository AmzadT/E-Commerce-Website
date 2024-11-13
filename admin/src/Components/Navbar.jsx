import { assets } from "../assets/assets"

const Navbar = ({setToken}) => {
  
  return (
    <div className="flex items-center py-2 justify-between px-[4%]">
      <img className="w-32" src={assets.shop_sphere_logo1} />
      <button onClick={()=> setToken('')} className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm" >LogOut</button>
    </div>
  )
}

export default Navbar
