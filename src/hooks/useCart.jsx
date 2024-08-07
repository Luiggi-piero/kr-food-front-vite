import { createContext, useContext, useEffect, useState } from "react"

const CartContext = createContext(null);
const CART_KEY = 'cart';
const EMPTY_CART = {
    items: [],
    totalPrice: 0,
    totalCount: 0
}

export default function CartProvider({ children }) {

    const initCart = getCartFromLocalStorage();
    const [cartItems, setCartItems] = useState(initCart.items);
    const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
    const [totalCount, setTotalCount] = useState(initCart.totalCount);

    const removeFromCart = foodId => {
        const filteredCartItems = cartItems.filter(item => item.food.id !== foodId);
        setCartItems(filteredCartItems);
    }

    // Para el select de cartPage
    const changeQuantity = (cartItem, newQuantity) => {
        const { food } = cartItem;
        const changedCartItem = {
            ...cartItem,
            quantity: newQuantity,
            price: food.price * newQuantity
        }

        setCartItems(
            cartItems.map(item => item.food.id === food.id ? changedCartItem : item)
        )
    }

    const addToCart = food => {
        const cartItem = cartItems.find(item => item.food.id === food.id);
        if (cartItem) { // comprueba si food ya existe en el carrito
            changeQuantity(cartItem, cartItem.quantity + 1);
        } else {
            // No existe en el carrito, entonces lo agregamos
            setCartItems([...cartItems, { food, quantity: 1, price: food.price }])
        }
    };

    const clearCart = () => {
        localStorage.removeItem(CART_KEY);
        const { items, totalPrice, totalCount } = EMPTY_CART;
        setCartItems(items);
        setTotalPrice(totalPrice);
        setTotalCount(totalCount);
    }

    // Para los siguientes casos es necesario actualizar el precio y cantidad total:
    // 1. Se elimina algún elemento de cartItems
    // 2. Cambia la cantidad individual de algún producto
    // 3. Se agrega un nuevo producto
    useEffect(() => {
        const totalPrice = sum(cartItems.map(item => item.price));
        const totalCount = sum(cartItems.map(item => item.quantity));
        setTotalPrice(totalPrice);
        setTotalCount(totalCount);

        localStorage.setItem(
            CART_KEY,
            JSON.stringify({
                items: cartItems,
                totalPrice,
                totalCount
            })
        );
    }, [cartItems]);

    function getCartFromLocalStorage() {
        const storedCart = localStorage.getItem(CART_KEY);
        return JSON.parse(storedCart) ?? EMPTY_CART;
    }


    /**
     * Suma elementos de un arreglo 
     * @param {*} items arreglo de precios o de cantidades
     * @returns total
     */
    const sum = items => {
        return items.reduce((prevValue, curValue) => prevValue + curValue, 0)
    }

    return <CartContext.Provider value={{
        cart: {
            items: cartItems,
            totalPrice,
            totalCount
        },
        removeFromCart,
        changeQuantity,
        addToCart,
        clearCart
    }}>
        {children}
    </CartContext.Provider>
}

export const useCart = () => useContext(CartContext);