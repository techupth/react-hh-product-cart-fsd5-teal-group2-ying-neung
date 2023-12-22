import "./App.css";
import products from "./data/products";
import { useState } from "react";

function App() {
  const [cartItem, setCartItem] = useState([]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (let i = 0; i < cartItem.length; i++) {
      totalPrice += cartItem[i].price * cartItem[i].quantity;
    }
    return totalPrice;
  };

  const addProductToCart = (product) => {
    const existingItem = cartItem.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedCartItem = cartItem.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItem(updatedCartItem);
    } else {
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
    }
  };

  const removeProductFromCart = (productId) => {
    const updatedCartItem = cartItem.filter((item) => item.id !== productId);
    setCartItem(updatedCartItem);
  };

  const increaseQuantity = (productId) => {
    const updatedCartItem = cartItem.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItem(updatedCartItem);
  };

  const decreaseQuantity = (productId) => {
    const updatedCartItem = cartItem.map((item) => {
      if (item.id === productId) {
        if (item.quantity === 1) {
          return item;
        } else {
          return { ...item, quantity: item.quantity - 1 };
        }
      } else {
        return item;
      }
    });
    setCartItem(updatedCartItem);
  };

  return (
    <div className="App">
      <section className="product-container">
        <h1 className="product-heading">Products</h1>
        <div className="product-list">
          {products.map((product) => (
            <div className="product" key={product.id}>
              <img
                className="product-image"
                src={product.image}
                alt={product.name}
              />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <button onClick={() => addProductToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
      <hr />

      <section className="cart">
        <h1 className="cart-heading">
          Cart (Total price is {calculateTotalPrice()} Baht)
        </h1>
        <div className="cart-item-list">
          {cartItem.map((item) => (
            <div className="cart-item" key={item.id}>
              <h1>Item name: {item.name}</h1>
              <h2>Price: {item.price} Baht</h2>
              <h2>Quantity: {item.quantity}</h2>
              <button
                className="delete-button"
                onClick={() => removeProductFromCart(item.id)}>
                x
              </button>
              <div className="quantity-actions">
                <button onClick={() => increaseQuantity(item.id)}>+</button>
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
