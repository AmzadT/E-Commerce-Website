import axios from "axios"
import { useEffect, useState } from "react"
import { backendUrl, currency } from "../App"
import { toast } from "react-toastify"

const List = ({ token }) => {

  const [list, setList] = useState([])

  // Fetch List of Products
  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/products/list`)
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

  // Remove Products
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(`${backendUrl}/api/products/remove/${id}`, {}, { headers: { token } }
      );
      console.log(response.data);
      if (response.data.success) {
        await fetchList();
        toast.success('Product Removed successfully ✅');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };


  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      {/* Title */}
      <p className="mb-10 font-mono font-semibold text-xl sm:text-2xl text-center">All Products List</p>

      {/* List Table */}
      <div className="flex flex-col gap-2">

        {/* Header for Larger Screens */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] mb-5 py-3 px-3 border bg-gray-200 text-sm sm:text-base">
          <b>Image</b>
          <b>Name</b>
          <b className="-ml-5">Category</b>
          <b>Price</b>
          <b className="text-center">Remove</b>
        </div>

        {/* Product List */}
        {
          list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[2fr_5fr_2fr] sm:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border text-xs sm:text-sm"
            >
              {/* Image */}
              <img src={item.image[0]} className="w-12 sm:w-14" alt="Product" />

              {/* Product Name */}
              <p className="truncate">{item.name}</p>

              {/* Category (hidden on very small screens) */}
              <p className="hidden sm:block">{item.category}</p>

              {/* Price */}
              <p>{currency} {item.price}</p>

              {/* Remove Button */}
              <p onClick={() => removeProduct(item._id)} className="cursor-pointer text-sm sm:text-xl font-semibold text-red-500 border border-orange-500 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center ml-3 mt-1 sm:mt-0 sm:ml-12">X</p>
            </div>
          ))
        }

      </div>

    </>
  )
}

export default List
