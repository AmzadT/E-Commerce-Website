import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "../components/Title"
import { toast } from "react-toastify"
import axios from "axios"

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])

  const getOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      // Make API call to get order data using token
      const response = await axios.post(`${backendUrl}/api/orders/user-orders`, {}, {
        headers: { token },
      })
      console.log(response.data)

      if (response.data.success) {
        const allOrderItems = []
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status
            item["payment"] = order.payment
            item["paymentMethod"] = order.paymentMethod
            item["date"] = order.date
            allOrderItems.push(item)
          })
        })
        setOrderData(allOrderItems.reverse())
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getOrderData()
  }, [token])

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-5">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {/* Conditional Rendering */}
      {orderData.length === 0 ? (
        <div className="flex items-center justify-center h-[30vh]">
          <h2 className="text-2xl text-gray-500">Your Orders Empty Now</h2>
        </div>
      ) : (
        <div>
        
        {/* Mapping Orders Data */}
          {orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start text-sm gap-6">
                <img src={item.image[0]} className="w-16 sm:w-20" />

                <div>
                  <p className="text-base font-medium">{item.name}</p>
                  <div className="flex items-center text-base text-gray-700 gap-3 mt-1">
                    <p>
                      {currency} {item.price}
                    </p>
                    <p>Quantity : {item.quantity}</p>
                    <p>Size : {item.size}</p>
                  </div>
                  <p className="mt-1">
                    Date : <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                  </p>

                  <p className="mt-1">
                    Payment : <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button
                  onClick={getOrderData}
                  className="border px-4 py-2 text-sm font-medium rounded-sm"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
