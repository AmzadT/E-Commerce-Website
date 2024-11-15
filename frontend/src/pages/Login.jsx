import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { toast } from "react-toastify"
import axios from 'axios'

const Login = () => {

  const [currentState, setCurrentState] = useState('Login')
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/users/register', { name, email, password })
        console.log(response.data)
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success('Registration SuccessFull ✅')
        } else {
          console.log("Response Data:", response.data)
          toast.error(response.data.message || "Something went wrong, for the Sign-Up please try again.")
        }

      } else {
        const response = await axios.post(backendUrl + '/api/users/login', { email, password })
        console.log(response.data)
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success('Login SuccessFull ✅')
        } else {
          console.log(response.data)
          toast.error(response.data.message || "Something went wrong, for the Login please try again.")
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])


  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none bg-gray-800 w-8 h-[1.5px]" />
      </div>
      {
        currentState === 'Login' ? '' : <input type="text" onChange={(event) => setName(event.target.value)} value={name} className="w-full px-3 py-2 border border-gray-800 rounded" placeholder="Enter Name" required />
      }
      <input type="email" onChange={(event) => setEmail(event.target.value)} value={email} className="w-full px-3 py-2 border border-gray-800 rounded" placeholder="Enter Email" required />

      <input type="password" onChange={(event) => setPassword(event.target.value)} value={password} className="w-full px-3 py-2 border border-gray-800 rounded" placeholder="Enter Password" required />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer text-blue-500">Forgot Password ?</p>
        {
          currentState === 'Login' ? <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer text-blue-500">Create Account</p> : <p onClick={() => setCurrentState('Login')} className="cursor-pointer text-blue-500">Login Here</p>
        }
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4 rounded">{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login

