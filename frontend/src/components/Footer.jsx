import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                <div>
                    <Link to='/'>
                        <h3 className='text-3xl text-gray-900 mb-5'>Shop<span className='text-gray-600 text-lg'>Sphere®</span></h3>
                    </Link>
                    <p className="w-full md:w-2/3 text-gray-600">This is my website footer description to describe in that all the thigns which i made in this e-com website...</p>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>+91-8298101008</li>
                        <li>amzadhussain7250@gmail.com</li>
                    </ul>
                </div>

            </div>

            <div>
                <hr />
                <p className="py-5 text-sm text-center">Copyright 2024@ ShopSphere.com - All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer