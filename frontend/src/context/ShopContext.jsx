import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 1. Create context 
export const ShopContext = createContext();

const ShopContextProvider = ({children}) => {

    const currency = '₹';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')
    const navigate = useNavigate();

    // Add To Cart 
    const addToCart = async (itemId, size) => {
        if (!token) {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken); 
            } else {
                toast.error('You need to Login first then add items to the cart');
                return navigate('/login');
            }
        }
    
        if (!size) {
            return toast.error('Select Product Size');
        }
    
        var cartData = structuredClone(cartItems);
    
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
    
        setCartItems(cartData);
        toast.success('Item Added Successfully ✅');
    
        try {
            await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } });
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };    


    // Count Cart Items Quantity
    const cartCount = () => {
        var totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error)
                }
            }
        }

        return totalCount
    }


    // Update Cart items Quantity
    const updateQuantity = async (itemId, size, quantity) => {
        var cartData = structuredClone(cartItems)
        cartData[itemId][size] = quantity
        setCartItems(cartData)

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, {headers: {token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }


    // Cart Total
    const cartTotal = () => {
        var totalAmount = 0;
        for (const items in cartItems) {
            var itemInfo = products.find((product) => product._id === items)
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error)
                }
            }
        }

        return totalAmount;
    }


    // Fetch All Products Data
    const fetchProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/products/list`)
            console.log(response.data.products);
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error('Failed to fetch products', error.message)
        }
    }

    // GET Usres Cart
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, {headers: {token}})
            console.log(response.data);
            if (response.data.success) {
                return setCartItems(response.data.cartData)
            } 

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    useEffect(() => {
        fetchProductsData();
    }, []);
    
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []); 
    
    useEffect(() => {
        if (token) {
            getUserCart(token);
        }
    }, [token]);
    

    // 2. Value Provide to the Context
    const value = {
        products,
        currency,
        delivery_fee,
        search, setSearch,
        showSearch, setShowSearch,
        cartItems, setCartItems, addToCart,
        cartCount, updateQuantity,
        cartTotal, navigate,
        backendUrl, token, setToken
    }

    return (
        // 2. Value Provide to the Context
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;