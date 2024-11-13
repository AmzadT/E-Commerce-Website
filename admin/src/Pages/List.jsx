import axios from "axios"
import { useEffect, useState } from "react"
import { backendUrl, currency } from "../App"
import { toast } from "react-toastify"

const List = ({token}) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/products/list')
      console.log(response.data.products);
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.error(error);
      toast.error(error.message)
    }
  }


  const removeProduct = async(id)=>{
    try {
      const response = await axios.delete(backendUrl + `/api/products/remove/${id}`, {headers: {token}})
      console.log(response.data)
      if(response.data.success){
        toast.success('Product Removed successFully ✅')
        fetchList()
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className="mb-10 font-mono font-semibold text-2xl text-center ">All Products List</p>

      <div className="flex flex-col gap-2">

        {/* List Table */}

        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] mb-5 py-3 px-3 border bg-gray-200 text-base ">
          <b>Image</b>
          <b>Name</b>
          <b className="-ml-5">Category</b>
          <b>Price</b>
          <b className="text-center">Remove</b>
        </div>

        {/* Product List */}

        {
          list.map((item, index)=>(
            <div key={index} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border text-sm">
            {/* <img src={item.image} className="w-14" />  */}
               <img src={item.image[0]} className="w-14" /> 
               <p>{item.name}</p>
               <p>{item.category}</p>
               <p>{currency} {item.price}</p>
               <p onClick={()=> removeProduct(item._id)} className="text-right md:text-center cursor-pointer text-lg">X</p>
            </div>
          ))
        }

      </div>
    </>
  )
}

export default List
