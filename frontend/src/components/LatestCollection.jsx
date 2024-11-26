import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    console.log(products)
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        if (products && products.length > 0) {
            setLatestProducts(products.slice(0, 15));
        }
    }, [products]);

    if (!products || products.length === 0) {
        return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
            </div>
        )
    }

    return (
        <div className="my-10">
            <div className="text-center py-8 text-3xl">

                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    This page covers all the latest products collections. If you want to buy, you can buy now!
                </p>
            </div>


            {/* Rendering ProductItems */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6">
                {
                    latestProducts.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    );
};

export default LatestCollection;
