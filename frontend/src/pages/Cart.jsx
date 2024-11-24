import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "../components/Title"
import CartTotal from "../components/CartTotal"
import { assets } from "../assets/assets"

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])

  useEffect(() => {

    if (products.length > 0) {
      const tempData = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData)
    }


  }, [cartItems, products])

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id)

            return (
              <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4" key={index}>
                <div className="flex items-start gap-6">
                  <img src={productData.image[0]} className="w-16 sm:w-20" />
                  <div>
                    <p className="text-xs sm:text-lg font-medium ">{productData.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>{currency} {productData.price}</p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-200">{item.size}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center border border-gray-200 max-w-[100px] sm:max-w-[150px] px-2 py-1 rounded-lg">

                  <button onClick={() => item.quantity > 1 && updateQuantity(item._id, item.size, item.quantity - 1)} className="bg-red-500 text-white font-medium px-2 py-1 rounded-l hover:bg-red-600"
                  >-</button>

                  <span className="text-center flex-1 text-gray-700 font-semibold">{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                    className="bg-green-500 text-white font-medium px-2 py-1 rounded-r hover:bg-green-600"
                  >+</button>

                </div>

                  <img onClick={() => updateQuantity(item._id, item.size, 0)} src={assets.bin_icon} className="w-4 mr-4 sm:w-5 cursor-pointer" />

              </div>
            )
          })
        }
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px] '>
          <CartTotal />
          <div className="w-full text-end">
            <button onClick={() => navigate('/place-order')} className="bg-black text-white text-sm my-8 px-8 py-3 rounded">PROCEED TO CHEKOUT</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart