import React, { useState, useEffect } from "react";
import { BrowseView } from "./BrowseView";
import { CartView } from "./CartView";

export function App() {
  const [page, changePage] = useState("Browse");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetch("./products.json")
      .then((response) => response.json())
      .then((json) => {
        json = json.products;
        setProducts(json);
        setCart(Object.fromEntries(json.map((product) => [product.title, 0])));
        setPrices(
          Object.fromEntries(
            json.map((product) => [product.title, product.price])
          )
        );
      });
  }, []);

  useEffect(() => {
    let totalQuantity = Object.values(cart).reduce(
      (acc, curr) => acc + curr,
      0
    );
    setQuantity(totalQuantity);
  }, [cart]);

  function removeFromCart(productName) {
    setCart((prevState) => ({
      ...prevState,
      [productName]: Math.max(0, cart[productName] - 1),
    }));
  }
  function addToCart(productName) {
    setCart((prevState) => ({
      ...prevState,
      [productName]: cart[productName] + 1,
    }));
  }
  function resetCart(productName) {
    setCart((prevState) => ({
      ...prevState,
      [productName]: 0,
    }));
  }

  return (
    <div className="h-screen">
      <BrowseView
        isActive={page === "Browse"}
        changePage={changePage}
        cart={cart}
        removeFromCart={removeFromCart}
        addToCart={addToCart}
        prices={prices}
        products={products}
      />
      <CartView
        isActive={page === "Cart"}
        changePage={changePage}
        addToCart={addToCart}
        resetCart={resetCart}
        cart={cart}
        prices={prices}
        quantity={quantity}
      />
    </div>
  );
}
