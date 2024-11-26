import { useContext, useEffect, useState } from "react"
import { ShopContext } from '../context/ShopContext'
import { assets } from "../assets/assets"
import Title from '../components/Title'
import ProductItem from "../components/ProductItem"

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relavent')

  const toggleCategory = (event)=>{
    if(category.includes(event.target.value)){
      setCategory(prev=> prev.filter(item => item !== event.target.value))
    }else{
      setCategory(prev => [...prev, event.target.value])
    }
  }

  const toggleSubCategory = (event)=>{
    if(subCategory.includes(event.target.value)){
      setSubCategory(prev=> prev.filter(item => item !== event.target.value))
    }else{
      setSubCategory(prev => [...prev, event.target.value])
    }
  }

  const applyFilters = ()=>{
    var productsCopy = products.slice()

    if(showSearch && search){
      productsCopy = productsCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length > 0){
      productsCopy = productsCopy.filter(item=> category.includes(item.category))
    }

    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item=> subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)
  }

  const sortProducts = ()=>{
    var filterProductsCopy = filterProducts.slice()

    switch(sortType){
      case 'low-high' : setFilterProducts(filterProductsCopy.sort((a, b)=> (a.price - b.price)))
      break;

      case 'high-low' : setFilterProducts(filterProductsCopy.sort((a, b)=> (b.price - a.price)))
      break;

      default : applyFilters()
      break;
    }
  }

  useEffect(()=>{
    applyFilters()
  }, [category, subCategory, search, showSearch, products])

  useEffect(()=>{
    sortProducts()
  }, [sortType])


  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-300">

      {/* Filter Options */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS <img className={`h-3 sm:hidden transition-[0.5s] ${showFilter ? 'rotate-90' : ''} `} src={assets.dropdown_icon} /></p>


        {/* Category Filters */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Men'} onChange={toggleCategory} /> Men's
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Women'} onChange={toggleCategory} /> Women's
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Kids'} onChange={toggleCategory} /> Kid's
            </p>
          </div>
        </div>


        {/* Sub-Category Filters */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
            </p>
          </div>
        </div>

      </div>


      {/* Collection Right Side */}
      <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
             <Title text1={'ALL'} text2={'COLLECTIONS'}/>


             {/* Products Sorting */}
             <select onChange={(event)=> setSortType(event.target.value)} className="border-2 border-gray-300 text-sm px-2">
               <option value="relavent">Sort by Price</option>
               <option value="low-high">Price : Low to High</option>
               <option value="high-low">Price : High to Low</option>
             </select>
          </div>


          {/* Map Products */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {
              filterProducts.map((item, index)=>(
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
              ))
            }
          </div>
      </div>

    </div>
  )
}

export default Collection