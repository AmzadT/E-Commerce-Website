import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./Title"

const CartTotal = () => {

    const { currency, delivery_fee, cartTotal } = useContext(ShopContext)


    return (
        <div className="w-full">
            <div className="text-2xl">
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>

            {/* CartTotal */}
            <div className="flex flex-col text-sm mt-2 gap-2">
                <div className="flex justify-between">
                    <p>Sub-Total</p>
                    <p>{currency} {cartTotal()}.00</p>
                </div>

                <hr />

                <div className="flex justify-between">
                    <p>Shipping Fee</p>
                    <p>{currency} {delivery_fee}.00</p>
                </div>

                <hr />

                <div className="flex justify-between">
                    <b>Total</b>
                    <b>{currency} {cartTotal() === 0 ? 0 : cartTotal() + delivery_fee}.00</b>
                </div>
            </div>
        </div>
    )
}

export default CartTotal