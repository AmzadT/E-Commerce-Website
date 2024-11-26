import NewsLetterBox from "../components/NewsLetterBox"
import Title from "../components/Title"

const Contact = () => {
  return (
    <div>
      <div className="text-3xl pt-10 border-t border-gray-300 text-center">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className="flex flex-col justify-center my-10 md:flex-row gap-10 mb-28">
        <img src='https://plus.unsplash.com/premium_photo-1675842663249-a8b70103dbaa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className="w-full md:max-w-[480px] h-[400px]" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">Bindusar Buzurg Purab Tola, 841227 <br/> Siwan, 841226, Bihar, India</p>
          <p className="text-gray-500">Phone : 8298101008 <br/> Email : amzadhussain7250@gmail.com</p>
          <p className="font-semibold text-xl text-gray-600">Careers at ShopSphere</p>
          <p className="text-gray-500">Learn more about our teams and job openings.</p>
          <button className="border border-black px-8 py-4 text-md hover:bg-black hover:text-white transition-all duration-500 ">Explore Jobs</button>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default Contact