import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./Title"
import ProductItem from "./ProductItem"

const RelatedProducts = ({ category, subCategory }) => {

  const { products } = useContext(ShopContext)
  console.log(products)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      var productsCopy = products.slice()
      productsCopy = productsCopy.filter((item) => category === item.category)
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)
      setRelated(productsCopy.slice(0, 20))
    }
  }, [products])

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      {/* RelatedProducts Rendering */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
          related.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))

        }
      </div>
    </div>
  )
}

export default RelatedProducts