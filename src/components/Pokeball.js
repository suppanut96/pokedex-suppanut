import React from 'react';
import './Pokeball.css';
import { PiTrashLight } from "react-icons/pi";



const Pokeball = ({ orderedProducts, setOrderedProducts }) => {
    const totalQuantity = orderedProducts.reduce((acc, product) => acc + product.quantity, 0);

    const handleDelete = (id) => {
        setOrderedProducts(orderedProducts.filter(product => product.id !== id));
    };

    return (
        <div className="pokeball-container">
            <div className="pokeball-list">
                <h2>Pocket list ({orderedProducts.length})</h2>
                <div className="pokeball-header">
                <span>Product name</span>
                <span>Quantity</span>
                </div>
                {orderedProducts.map((product, index) => (
                <div key={index} className="pokeball-item">
                    <div className="pokeball-item-info">
                    <img src={product.sprites.other['official-artwork'].front_default} alt={product.name} />
                    <div>
                        <h3>{product.name}</h3>
                        <div className="pokemon-types">
                        {product.types.map((type) => (
                            <span key={type.type.name} className={`type-label ${type.type.name}`}>
                            {type.type.name}
                            </span>
                        ))}
                        </div>
                    </div>
                    </div>
                    <div className="product-quantity">
                        <span>{product.quantity}</span>
                        <PiTrashLight className="delete-icon" onClick={() => handleDelete(product.id)} />
                    </div>
                </div>
                ))}
            </div>
            <div className="order-summary">
                <div className="order-summary-header">
                    <h2>Order Summary</h2>
                </div>
                <div className="summary-item">
                    <span>Subtotal</span>
                    <div className= "summary-item-product">
                        <span>{orderedProducts.length} Product</span>
                    </div>
                </div>
                <div className="summary-item">
                    <span>Quantity</span>
                    <div className= "summary-item-quantity">
                        <span>{totalQuantity} Quantity</span>
                    </div>
                </div>
                <button className="checkout-button">Proceed To Checkout</button>
            </div>
        </div>
    );
};

export default Pokeball;
