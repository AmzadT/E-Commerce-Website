import { useState } from 'react'
import {toast} from 'react-toastify'
import { backendUrl } from '../App'
import axios from 'axios'


const Login = ({setToken}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const formSubmitHandler = async (event)=>{
        try {
            event.preventDefault()
            const response = await axios.post(`${backendUrl}/api/users/admin`, {email, password})
            console.log(response.data)
            console.log(`${backendUrl}/api/users/admin`);

            if(response.data.success){
                console.log(response.data)
                setToken(response.data.token)
                toast.success('Logged-In SuccessFully ✅')
            }else{
                console.log(response.data)
                toast.error(response.data.message || "Something went wrong, please try again.")
            }

        } catch (error) {
            console.log(error)
            toast.error(`Failed to Login : ${error.message}`)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center w-full">
            <div className="bg-white shadow-md rounded-lg max-w-md px-8 py-6">
                <h1 className="text-2xl font-bold mb-4 text-center">Admin Panel</h1>
                <form onSubmit={formSubmitHandler}>
                    <div className="mb-3 min-w-72">
                        <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
                        <input value={email} onChange={(event)=> setEmail(event.target.value)} type="email" placeholder="Enter Your Email" required className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none" />
                    </div>

                    <div className="mb-3 min-w-72">
                        <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
                        <input value={password} onChange={(event)=> setPassword(event.target.value)} type="password" placeholder="Enter Your Password" required className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none" />
                    </div>

                    <button type="submit" className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black font-bold">LOGIN</button>
                </form>
            </div>
        </div>
    )
}

export default Login
