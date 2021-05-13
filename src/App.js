import React, { useState, useEffect } from "react";
import { commerce } from "./libs/commerce";
import { Products, Navbar } from "./components";

const App = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});


    const fetchProducts = async () => {
        const { data } = await commerce.products.list(); //returns a promise
        setProducts(data);
    }

    const fetchCart = async () => {
        const items = await commerce.cart.retrieve();
        setCart(items);
    }

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart);
        
    }

    useEffect(() => {
        fetchProducts();
        commerce.cart.refresh();
        fetchCart();
    }, []);
    //console.log(products);
    console.log(cart);
    

    return (
        <div>
            <Navbar />
            <Products products={products} onAddToCart={handleAddToCart} />
        </div>
    )
}

export default App;