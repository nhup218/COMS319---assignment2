import React, { useState, useEffect } from "react";

export function BrowseView({
  isActive,
  changePage,
  cart,
  removeFromCart,
  addToCart,
  prices,
  products,
  picture,
}) {
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    var cartEmpty = Object.values(cart).every((item) => item === 0);
    const checkoutButton = document.getElementById("checkout-button");
    if (cartEmpty) {
      checkoutButton.classList.add("collapse");
    } else {
      checkoutButton.classList.remove("collapse");
    }
  }, [cart]);

  useEffect(() => {
    setFiltered(products);
  }, [products]);

  function handleSearchChange(event) {
    if (event) {
      let filtered = products.filter((product) =>
        product.title.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFiltered(filtered);
    }
  }
  function doneShopping() {
    setFiltered(products);
    changePage("Cart");
  }

  return !isActive ? (
    <></>
  ) : (
    <div>
      <link
        rel="canonical"
        href="https://getbootstrap.com/docs/5.3/examples/album/"
      ></link>

      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@docsearch/css@3"
      ></link>

      <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet"></link>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
        crossOrigin="anonymous"
      ></link>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa"
        crossOrigin="anonymous"
      ></script>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
      ></link>
      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <div className="col-span-1 p-4">
            <input
              type="text"
              name="price"
              id="price"
              className="block rounded-md border-0 py-2 pl-3 pr-10 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Search"
              onChange={handleSearchChange}
            />
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {filtered.map((product) => (
              <div className="col">
                <div key={product.id}>
                  <div className="card shadow-sm">
                    <img
                      src={product.image}
                      alt={product.title}
                      width="100%"
                      height="225"
                    ></img>
                    <div className="card-body">
                      <h4 className="card-text">{product.title}</h4>
                      <p className="card-text">${product.price}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => addToCart(product.title)}
                          >
                            +
                          </button>
                          <span style={{ color: "black" }}>
                            &emsp; {cart[product.title]} &emsp;
                          </span>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => removeFromCart(product.title)}
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-2 p-4 ">
            <div>
              <div className="bg-white border-white border-2 p-4 rounded">
                <h1>Cart</h1>
                <div className="text-left">
                  {Object.keys(cart).map((key) =>
                    cart[key] > 0 ? (
                      <div key={key}>
                        {key}: {cart[key]} x ${prices[key].toFixed(2)}
                      </div>
                    ) : null
                  )}
                </div>
                <br></br>
                <div>
                  Subtotal: $
                  {Object.keys(cart)
                    .map((key) => (cart[key] > 0 ? prices[key] : 0))
                    .reduce(
                      (total, price, index) =>
                        total + price * cart[Object.keys(cart)[index]],
                      0
                    )
                    .toFixed(2)}
                </div>
                <br></br>
                <div>
                  Tax: $
                  {Object.keys(cart)
                    .map((key) => (cart[key] > 0 ? prices[key] : 0))
                    .reduce(
                      (total, price, index) =>
                        total + 0.07 * price * cart[Object.keys(cart)[index]],
                      0
                    )
                    .toFixed(2)}
                </div>
                <br></br>
                <div>
                  Total: $
                  {Object.keys(cart)
                    .map((key) => (cart[key] > 0 ? prices[key] : 0))
                    .reduce(
                      (total, price, index) =>
                        total +
                        price * cart[Object.keys(cart)[index]] +
                        0.06 * price * cart[Object.keys(cart)[index]],
                      0
                    )
                    .toFixed(2)}
                </div>
              </div>
            </div>

            <button
              id="checkout-button"
              onClick={() => {
                doneShopping();
              }}
              className="bg-green-500 hover:bg-green-700 py-4 px-4 border-green-700 rounded"
            >
              🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
