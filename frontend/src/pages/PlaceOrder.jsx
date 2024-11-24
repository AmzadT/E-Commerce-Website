import { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod')
  const { navigate, token, backendUrl, cartItems, setCartItems, cartTotal, delivery_fee, products } = useContext(ShopContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    streetAddress: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phoneNo: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value

    setFormData(data => ({ ...data, [name]: value }))
  }


  const initPay = (order) => {
    const options = {
      kay: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,

      handler: async (response) => {
        console.log(response);

        try {
          const {data} = await axios.post(`${backendUrl}/api/orders/verify-razorpay`, response, {
            headers: {token}
          });
          console.log(data);

          if (data.success) {
            navigate('/orders')
            setCartItems({})
            toast.success('Payment Successful! Your order has been placed.')
          } else {
            toast.error(data.message)
          }
        } catch (error) {
          console.log(error)
          toast.error(`Failed to place order: ${error.message}`)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }


  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      var orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      var orderData = {
        address: formData,
        items: orderItems,
        amount: cartTotal() + delivery_fee
      }

      switch (method) {

        case 'cod':
          try {
            const response = await axios.post(backendUrl +  '/api/orders/place-COD', orderData, {
              headers: {token}
            });
            console.log(response.data)

            if (response.data.success) {
              setCartItems({});
              navigate('/orders');
              toast.success(`Order placed successfully ✅`)
            } else {
              toast.error(`Failed to place the order : ${response.data.message}`);
            }
          } catch (error) {
            console.log(error);
            toast.error(error.message);
          }
          break;


        case 'stripe':
          try {
            const responseStripe = await axios.post(backendUrl + '/api/orders/place-stripe', orderData, {
              headers: {token}
            })
            console.log(responseStripe.data)
            if (responseStripe.data.success) {
              const { session_url } = responseStripe.data
              window.location.replace(session_url)
            } else {
              toast.error(`Failed to place the order : ${responseStripe.data.message}`);
            }
          } catch (error) {
            toast.error(error);
            toast.error(error.message);
          }
          break;


        case 'razorpay':
          try {
            const responseRazorpay = await axios.post(backendUrl + '/api/orders/place-razorpay', orderData, {
              headers: {token}
            })
            console.log(responseRazorpay.data)
            if (responseRazorpay.data.success) {
              initPay(responseRazorpay.data.order)
            } else {
              toast.error(`Failed to place the order: ${responseRazorpay.data.message}`);
            }
          } catch (error) {
            toast.error(error);
            toast.error(error.message);
          }
          break;

        default: toast.error('Invalid payment method please selected any one method.')
          break;



      }
    } catch (error) {
      console.log(error)
      toast.error(`something went wrong : ${error.message}`)
    }
  }



  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t '>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type='text' placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type='text' placeholder='Last Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} type='email' placeholder='Enter Email Address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input required onChange={onChangeHandler} name='streetAddress' value={formData.streetAddress} type='text' placeholder='Street Address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} type='text' placeholder='City Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} type='text' placeholder='State Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='pinCode' value={formData.pinCode} type='number' placeholder='Pin Code' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} type='text' placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required onChange={onChangeHandler} name='phoneNo' value={formData.phoneNo} type='number' placeholder='Phone Number' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
      </div>

      {/* Right Side */}

      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHODS'} />

          {/* Payment Methods Selection */}

          <div className='flex gap-3 flex-col lg:flex-row'>

            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-4 h-4 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
              <p className='text-black font-semibold text-sm mx-4'>Cash On Delivery</p>
            </div>

            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-4 h-4 border rounded-full ${method === 'razorpay' ? 'bg-green-500' : ''}`}></p>
              <img src={assets.razorpay_logo} className='h-5 mx-4' />
            </div>

            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-4 h-4 border rounded-full ${method === 'stripe' ? 'bg-green-500' : ''}`}></p>
              <img src={assets.stripe_logo} className='h-5 mx-4' />
            </div>

          </div>

          <div className='w-full text-center mt-8'>
            <button type='submit' className='bg-black text-white px-10 py-3 text-sm rounded'>PLACE - ORDER</button>
          </div>

        </div>
      </div>

    </form>
  )
}

export default PlaceOrder

// onClick={()=> navigate('/orders')}