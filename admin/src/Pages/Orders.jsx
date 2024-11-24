import { useEffect } from "react";
import { useState } from "react"
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {

    if (!token) {
      toast.error('Please login to view your orders');
      return null;
    }
    try {
      const response = await axios.post(backendUrl + '/api/orders/list', {}, { headers: { token } });
      console.log(response.data)
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }


  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/orders/status', {
        orderId,
        status: event.target.value
      }, {
        headers: { token }
      });
      console.log(response.data)
      if (response.data.success) {
        await fetchAllOrders();
        toast.success('Order status updated successfully');
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])


  return (
    <div>

      <div>
        {
          orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 ">
                <img src={assets.parcel_icon} className="w-20 mt-2 border border-gray-500 " />
                <div>
                  <div>
                    {
                      order.items.map((item, index) => {
                        if (index === order.items.length - 1) {
                          return <p className="py-0.5" key={index}>ProductName : {item.name} <br /> Quantity : {item.quantity} <br /> Size : <span>{item.size}</span> </p>
                        } else {
                          return <p className="py-0.5" key={index}>{item.name}  {item.quantity} <span>{item.size}</span> ,</p>
                        }
                      })
                    }
                  </div>

                  <p className="mt-3 mb-2 font-medium">Name : {order.address.firstName + ' ' + order.address.lastName}</p>

                  <div>
                    <p>Address : {order.address.streetAddress + ','}</p>
                    <p>{order.address.city + ', ' + order.address.state + ', ' + order.address.country + ', ' + order.address.pinCode}</p>
                  </div>
                  <p>Mob-No : {order.address.phoneNo}</p>
                </div>
                <div>
                  <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
                  <p className="mt-3">Method : {order.paymentMethod}</p>
                  <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
                  <p>Date : {new Date(order.date).toLocaleDateString()}</p>
                </div>

                <p className="text-sm sm:text-[15px] font-semibold ml-10">{currency}{order.amount}</p>

                <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className="p-2 font-semibold">

                  <option value='Order Placed'>Order Placed</option>
                  <option value='Packing'>Packing</option>
                  <option value='Shipped'>Shipped</option>
                  <option value='Out for delivery'>Out For Delivery</option>
                  <option value='Delivered'>Delivered</option>

                </select>
              </div>
            ))
          ) : (
            <h2 className="flex justify-center items-center font-semibold">No Order Found.</h2>
          )
        }
      </div>
    </div>
  )
}

export default Orders

