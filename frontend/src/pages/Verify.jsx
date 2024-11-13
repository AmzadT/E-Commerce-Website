import { useContext, useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import axios from 'axios'

const Verify = () => {

    const {navigate, token, setCartItems, backendUrl} = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async ()=>{
        try {
            if (!token) {
                // toast.error('Token not found')
                return null;
            }

            const response = await axios.post(backendUrl + '/api/orders/verify-stripe', {
                success,
                orderId,
            }, {
                headers: {token}
            })
            console.log(response.data)

            if(response.data.success){
                // toast.success('Payment Verified Successfully')
                setCartItems({})
                navigate('/orders')
            }else{
                toast.error(response.data.message)
                navigate('/cart')
            }
        } catch (error) {
            console.log(error)
            toast.error('Failed to verify payment', error.message)
        }
    }

    useEffect(()=> {
        verifyPayment()
    }, [token])

  return (
    <div>
      <h1 className="flex items-center justify-center text-green-500">Verify SuccessFull</h1>
    </div>
  )
}

export default Verify
