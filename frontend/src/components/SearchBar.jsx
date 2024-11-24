import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { assets } from "../assets/assets"
import { useLocation } from "react-router-dom"

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
    const [visible, setVisible] = useState(false)
    const location = useLocation()

    useEffect(()=>{
       if(location.pathname === '/' || location.pathname.includes('collection')){
         setVisible(true)
       }else{
         setVisible(false)
       }

    }, [location])


    return showSearch && visible ? (
        <div className="border-t border-b bg-gray-100 text-center -mt-5">
            <div className="inline-flex justify-center items-center border border-gray-500 py-2 px-5 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 ">
               <input value={search} onChange={(event)=> setSearch(event.target.value)} className="flex-1 outline-none bg-inherit text-md placeholder-gray-800" type="text" placeholder="Search..."/>
               <img className="w-4 text-black" src={assets.search_icon}/>
            </div>
            <img onClick={()=> setShowSearch(false)} className="inline w-4 cursor-pointer" src={assets.cross_icon} />
        </div>
    ) : null
}

export default SearchBar