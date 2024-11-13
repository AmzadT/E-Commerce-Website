import { assets } from "../assets/assets"

const Footer = () => {
    return (
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                <div>
                    <img src={assets.logo} className="w-32 mb-5" />
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
                        <li>amzadhussain@gmail.com</li>
                    </ul>
                </div>

            </div>

            <div>
                <hr />
                <p className="py-5 text-sm text-center">Copyright 2024@ Forever.com - All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer