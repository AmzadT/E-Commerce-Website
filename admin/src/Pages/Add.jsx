import { useState } from "react"
import { assets } from "../assets/assets"
import { toast } from "react-toastify"
import axios from "axios"
import {backendUrl}  from "../App"

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')  
  const [subCategory, setSubCategory] = useState('') 
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const formSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('bestseller', bestseller)
      formData.append('sizes', JSON.stringify(sizes))

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)

      const response = await axios.post(
        backendUrl + '/api/products/add',
        formData,
        {headers: {token}}
      );
      console.log(response.data);
      if(response.data.success){
        toast.success('Product Added SuccessFully ✅')
        setName('')
        setDescription('')
        setPrice('')
        setCategory('')
        setSubCategory('')
        setBestseller(false)
        setSizes([])

        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)

      }else{
        console.log(response.data)
        toast.error(`Failed to Add Product: ${response.data.message} || "Something went wrong, please try again."`)
      }

    } catch (error) {
      console.error(error);
      toast.error(`Failed to Add Product: ${error.message} || "Something went wrong, please try again."`)
    }
  }

  return (
    <form onSubmit={formSubmitHandler} className="flex flex-col w-full items-start gap-5">
      <div>
        <p className="mb-5 font-mono font-semibold text-xl ml-52">Upload Image</p>

        <div className="flex gap-5">
          <label htmlFor="image1" >
            <img className="w-[120px]  shadow-xl hover:opacity-80 transition duration-300" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt={`Upload Area`} />
            <input onChange={(event) => setImage1(event.target.files[0])} type="file" id="image1" hidden />
          </label>

          <label htmlFor="image2" >
            <img className="w-[120px]  shadow-xl hover:opacity-80 transition duration-300" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt={`Upload Area`} />
            <input onChange={(event) => setImage2(event.target.files[0])} type="file" id="image2" hidden />
          </label>

          <label htmlFor="image3" >
            <img className="w-[120px]  shadow-xl hover:opacity-80 transition duration-300" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt={`Upload Area`} />
            <input onChange={(event) => setImage3(event.target.files[0])} type="file" id="image3" hidden />
          </label>

          <label htmlFor="image4" >
            <img className="w-[120px]  shadow-xl hover:opacity-80 transition duration-300" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt={`Upload Area`} />
            <input onChange={(event) => setImage4(event.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-3 font-mono font-semibold text-[18px] mt-5">Product Name</p>
        <input onChange={(event) => setName(event.target.value)} value={name} type="text" placeholder="Product Name" required className="w-full max-w-[500px] px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-500" />
      </div>

      <div className="w-full">
        <p className="mb-3 font-mono font-semibold text-[18px]">Product Description</p>
        <textarea onChange={(event) => setDescription(event.target.value)} value={description} type="text" rows={3} placeholder="Product Description" required className="w-full max-w-[500px] px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-500" />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">

        <div>
          <p className="mb-3 font-mono font-semibold text-[18px]">Product Categories</p>
          <select onChange={(event) => setCategory(event.target.value)} className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 text-gray-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-500">
            <option value="">Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-3 font-mono font-semibold text-[18px] ">Sub Categories</p>
          <select onChange={(event) => setSubCategory(event.target.value)} className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 text-gray-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-500">
            <option value="">Select Sub Category</option>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-3 font-mono font-semibold text-[18px] ">Product Price</p>
          <input onChange={(event) => setPrice(event.target.value)} value={price} type="Number" placeholder="Product Price" required className="w-full max-w-[500px] px-3 py-2 sm:w-[140px] border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-500 " />
        </div>

      </div>

      <div>
        <p className="mb-3 font-mono font-semibold text-[18px] ">Sizes</p>
        <div className="flex gap-3">

          <div onClick={() => setSizes(prev => prev.includes('S') ? prev.filter(size => size !== 'S') : [...prev, 'S'])}>
            <p className={` ${sizes.includes("S") ? 'bg-green-300' : 'bg-slate-200'} px-3 py-1 cursor-pointer rounded-md text-black`}>S</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes('M') ? prev.filter(size => size !== 'M') : [...prev, 'M'])}>
            <p className={` ${sizes.includes("M") ? 'bg-green-300' : 'bg-slate-200'} px-3 py-1 cursor-pointer rounded-md text-black`}>M</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes('L') ? prev.filter(size => size !== 'L') : [...prev, 'L'])}>
            <p className={` ${sizes.includes("L") ? 'bg-green-300' : 'bg-slate-200'} px-3 py-1 cursor-pointer rounded-md text-black`}>L</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes('XL') ? prev.filter(size => size !== 'XL') : [...prev, 'XL'])}>
            <p className={` ${sizes.includes("XL") ? 'bg-green-300' : 'bg-slate-200'} px-3 py-1 cursor-pointer rounded-md text-black`}>XL</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes('XXL') ? prev.filter(size => size !== 'XXL') : [...prev, 'XXL'])}>
            <p className={` ${sizes.includes("XXL") ? 'bg-green-300' : 'bg-slate-200'} px-3 py-1 cursor-pointer rounded-md text-black`}>XXL</p>
          </div>

        </div>
      </div>

      <div className="flex gap-2">
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} className="w-4" type="checkbox" placeholder="" id="bestseller" />
        <label className="cursor-pointer font-mono font-semibold text-md" htmlFor="bestseller">Add to Bestseller</label>
      </div>

      <button style={{ wordSpacing: '5px' }} type="submit" className="w-44 py-3 px-5 mt-4 rounded-md bg-black text-white">ADD PRODUCT</button>

    </form>
  )
}

export default Add
