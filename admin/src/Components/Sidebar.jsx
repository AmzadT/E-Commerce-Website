import { NavLink } from "react-router-dom"
import { assets } from "../assets/assets"

const Sidebar = () => {
    return (
        <div className="w-[25%] sm:w-[40%] md:w-[30%] lg:w-[18%] min-h-screen border-r-2 bg-slate-100">
            <div className="flex flex-col gap-4 pt-6 pl-6 sm:pl-10 md:pl-[15%] text-sm md:text-[15px]">

                {/* Add Items */}
                <NavLink to='/add' className='flex items-center gap-3 border border-gray-300 px-3 py-2 rounded-sm hover:bg-green-400 mr-5'>
                    <img className="w-5 h-5" src={assets.add_icon} alt="Add Icon" />
                    <p className="hidden sm:block">Add Items</p>
                </NavLink>

                {/* List Items */}
                <NavLink to='/list' className='flex items-center gap-3 border border-gray-300 px-3 py-2 rounded-sm hover:bg-green-400 mr-5'>
                    <img className="w-5 h-5" src={assets.order_icon} alt="List Icon" />
                    <p className="hidden sm:block">List Items</p>
                </NavLink>

                {/* Orders */}
                <NavLink to='/orders' className='flex items-center gap-3 border border-gray-300 px-3 py-2 rounded-sm hover:bg-green-400 mr-5'>
                    <img className="w-5 h-5" src={assets.order_icon} alt="Orders Icon" />
                    <p className="hidden sm:block">Orders</p>
                </NavLink>

            </div>
        </div>

    )
}

export default Sidebar
