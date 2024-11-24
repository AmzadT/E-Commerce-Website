import { assets } from "../assets/assets"
import Title from "../components/Title"
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className="text-3xl text-center border-t  border-gray-300 pt-8">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src='https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D' className="w-full max-w-[450px] h-[500px] " />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">

          <p>At ShopSphere, we believe in delivering high-quality, stylish products that enhance your everyday life. Our diverse collection includes the latest trends in fashion, electronics, and lifestyle products, all carefully curated to meet the unique needs of our customers.</p>

          <p>Our mission at ShopSphere is to create a seamless shopping experience by providing top-notch service, easy navigation, and secure transactions. Whether you are looking for the latest tech gadgets or timeless fashion pieces, we ensure that every product is sourced from trusted brands and manufacturers.</p>
          <b className="text-gray-800 text-xl">Our Mission</b>
          <p>At ShopSphere, our mission is to inspire and empower individuals by providing an unparalleled shopping experience through carefully curated products that blend quality, innovation, and style. We are dedicated to fostering long-lasting relationships with our customers by delivering exceptional value, exceptional service, and a seamless online shopping journey. Our goal is to become your go-to destination for all things fashion and lifestyle, ensuring that every purchase reflects your individuality while making a positive impact on the world.</p>
        </div>
      </div>

      <div className="text-2xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col gap-5 rounded-sm md:flex-row text-sm mb-20">
        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-center text-base">Quality Assurance :</b>
          <p className="text-gray-600 text-center">At ShopSphere, we are committed to delivering only the highest quality products, rigorously tested and sourced from trusted suppliers to ensure durability, style, and customer satisfaction.</p>
        </div>

        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-center text-base">Convenience :</b>
          <p className="text-gray-600 text-center">We prioritize your ease by offering a seamless shopping experience, with intuitive navigation, fast checkout, and reliable delivery right to your doorstep.</p>
        </div>

        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-center text-base">Exceptional Customer Service :</b>
          <p className="text-gray-600 text-center">At ShopSphere, our dedicated support team is always here to assist you, ensuring prompt, friendly, and personalized service to make your shopping experience smooth and enjoyable.</p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About