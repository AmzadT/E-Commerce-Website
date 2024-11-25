import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

    // const addToCart = async (itemId, size) => {
    //     if (!size) {
    //         return toast.error('Select Product Size')
    //     }
    //     var cartData = structuredClone(cartItems)

    //     if (cartData[itemId]) {
    //         if (cartData[itemId][size]) {
    //             cartData[itemId][size] += 1
    //         } else {
    //             cartData[itemId][size] = 1
    //         }
    //     } else {
    //         cartData[itemId] = {}
    //         cartData[itemId][size] = 1
    //     }

    //     setCartItems(cartData)
    //     toast.success('Item Added SuccessFully ✅')

    //     if (token) {
    //         try {
    //             await axios.post(backendUrl + '/api/cart/add', { itemId, size }, {headers: {token}})
    //         } catch (error) {
    //             console.log(error)
    //             toast.error(error.message)
    //         }
    //     }
    // }


    const addToCart = async (itemId, size) => {
        if (!token) {
            // Double-check if token exists in localStorage
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken); // Update token state
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
            await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };    


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


    const updateQuantity = async (itemId, size, quantity) => {
        var cartData = structuredClone(cartItems)
        cartData[itemId][size] = quantity
        setCartItems(cartData)

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, {headers: {token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

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

    const fetchProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/products/list')
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

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers: {token}})
            console.log(response.data);
            if (response.data.success) {
                return setCartItems(response.data.cartData)
            } 

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


   

    // useEffect(() => {
    //     fetchProductsData()
    // }, [])

    // useEffect(() => {
    //     if (!token && localStorage.getItem('token')) {
    //         setToken(localStorage.getItem('token'))
    //         getUserCart(localStorage.getItem('token'))
    //     }
    // }, [])


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
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;