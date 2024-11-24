import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ShopContext } from "../context/ShopContext"
import { assets } from "../assets/assets"
import RelatedProducts from "../components/RelatedProducts"
// import { toast } from "react-toastify"

const Product = () => {

  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  const fetchProductsData = async () => {
    try {
      products.map((item) => {
        if (item._id === productId) {
          setProductData(item)
          setImage(item.image[0])
          return null;
        }
      })

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchProductsData()
  }, [productId, products])

  return productData ? (
    <div className="border-t-2 border-gray-300 pt-10 transition-opacity ease-in duration-500 opacity-100">

      {/* Products Data */}

      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Products Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} key={index} src={item} className="w-[24%] sm:w-full sm:mb-3 cursor-pointer flex-shrink-0" />
              ))
            }

          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" />
          </div>
        </div>
        {/* Product Details */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl -mt-2.5">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img className="w-3.5" src={assets.star_icon} />
            <img className="w-3.5" src={assets.star_icon} />
            <img className="w-3.5" src={assets.star_icon} />
            <img className="w-3.5" src={assets.star_icon} />
            <img className="w-3.5" src={assets.star_dull_icon} />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency} {productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Sizes</p>
            <div className="flex gap-2">
              {
                productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} className={`border rounded-md py-2 px-4 bg-gray-100 ${item === size ? 'bg-green-300' : ''}`} key={index}>{item}</button>
                ))
              }
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 rounded-sm" >ADD TO CART</button>
          <hr className="mt-8 sm:w-4/5"/>
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash on Delivery Available on this Product.</p>
            <p>Easy Return and Exchange Policy within 7 Days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}

      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>

        <div className="flex flex-col gap-4 text-gray-500 border px-6 py-6 text-sm">
          <p>Discover the ultimate blend of style and comfort with our premium cotton T-shirt. Designed for everyday wear, this lightweight and breathable fabric keeps you feeling fresh all day long. Whether you are dressing up or keeping it casual, its versatile design pairs perfectly with any outfit. Available in a range of colors, this must-have wardrobe essential offers durability and easy care. Elevate your style effortlessly with this classic piece.</p>
          <p>Upgrade your wardrobe with this stylish and durable cotton T-shirt. Soft, breathable, and perfect for everyday wear, it pairs effortlessly with jeans or shorts for a casual yet polished look. Available in multiple colors!</p>
        </div>
      </div>

      {/* Display Related Products */}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className="opacity-0"></div>
}

export default Product

