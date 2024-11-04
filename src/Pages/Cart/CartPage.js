import React, { useEffect, useState } from "react";
import clientAPI from "../../client-api/rest-client";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    const loadForm = async () => {
        try {
            const data = await clientAPI.service('cart').get('');

            if (Array.isArray(data.data.products)) {
                setCartItems(data.data.products);
            } else {
                console.error("Expected an array but got:", data.data.products);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                window.alert(`Error: ${error.response.data.message}`);
            } else {
                window.alert("Error: Something went wrong");
            }
            console.log(error);
        }
    };

    useEffect(() => {
        loadForm();
    }, []);

    const handleCheckout = () => {
        // Handle checkout functionality here
    };

    const handleProductClick = (idProduct) => {
        // Handle clicking on a product here
    };

    const handleQuantityChange = async (cartId, productId, newQuantity) => {
        if (newQuantity < 1) {
            // Optionally, you can handle the case where quantity goes below 1
            window.alert("Số lượng không thể nhỏ hơn 1.");
            return;
        }
    
        // Update the cartItems state
        const updatedCartItems = cartItems.map(cartItem => {
            if (cartItem._id === cartId) {
                return {
                    ...cartItem,
                    products: cartItem.products.map(product => {
                        if (product.idProduct === productId) {
                            return {
                                ...product,
                                quantity: newQuantity,
                            };
                        }
                        return product;
                    }),
                };
            }
            return cartItem;
        });
    
        setCartItems(updatedCartItems);
    
        // Send an API request to update the quantity in the backend
        try {
            await clientAPI.service('cart').patch(cartId, {
                products: updatedCartItems.find(item => item._id === cartId).products
            });
        } catch (error) {
            console.error("Failed to update quantity:", error);
            window.alert("Đã có lỗi xảy ra khi cập nhật số lượng.");
        }
    };

    const handleSelectItem = (productId) => {
        // Toggle selection of specific product
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4">
                <h2 className="text-gray-900 text-2xl font-bold mb-4">Giỏ hàng của bạn</h2>
                {cartItems.length === 0 ? (
                    <p className="text-gray-600">Giỏ hàng của bạn đang trống.</p>
                ) : (
                    cartItems.map((product) => (
                        <div key={product._id} className="flex items-center justify-between border-b border-gray-200 py-4">
                            <img
                                className="w-20 h-20 object-cover rounded"
                                src={product.image || "placeholder.jpg"}
                                alt={product.nameOfProduct}
                                onClick={() => handleProductClick(product.idProduct)}
                            />
                            <div className="flex-1 ml-4">
                                <h3 className="text-gray-900 text-lg font-bold">{product.nameOfProduct}</h3>
                                <p className="text-red-500 text-md font-semibold">{product.price} ₫</p>
                                <p className="text-gray-600 text-sm">Mã sản phẩm: {product.idProduct}</p>
                                <div className="flex items-center mt-2">
                                    <button
                                        onClick={() => handleQuantityChange(product.idProduct, product.quantity - 1)}
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-800"
                                    >
                                        -
                                    </button>
                                    <span className="mx-2 text-gray-800">{product.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(product.idProduct, product.quantity + 1)}
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-800"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-pink-500"
                                checked={product.isSelected || false}
                                onChange={() => handleSelectItem(product.idProduct)}
                            />
                        </div>
                    ))
                )}
                {cartItems.length > 0 && (
                    <div className="mt-4">
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
                        >
                            Mua sản phẩm
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
