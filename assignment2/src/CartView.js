import React, { useState } from "react";

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const validateName = (name) => {
  // Check if the name field is not empty
  return name.trim() !== "";
};

const validateAddress = (address) => {
  // Check if the address field is not empty
  return address.trim() !== "";
};

const validateCity = (city) => {
  // Check if the city field is not empty
  return city.trim() !== "";
};

const validateState = (state) => {
  return state.trim() !== "" && state !== "Choose...";
};

const validateEmail = (email) => {
  return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};

const validateCreditCard = (cardNumber) => {
  return cardNumber.match(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/);
};

const validateZipCode = (zipCode) => {
  return zipCode.match(/^\d{5}$/);
};

function formatCreditCardNumber(input) {
  const cardNumber = input.value.replace(/\D/g, "");
  const formattedNumber = cardNumber.replace(/(\d{4})/g, "$1-");

  input.value = formattedNumber.replace(/-$/, "");
}

export function CartView({
  isActive,
  changePage,
  cart,
  prices,
  resetCart,
  quantity,
}) {
  const [showShippingAddress, setShowShippingAddress] = useState(false);

  function toggleShippingAddress() {
    setShowShippingAddress(!showShippingAddress);
  }

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  const handleFormatCardNumber = (event) => {
    const creditCard = document.getElementById("cc-number");
    formatCreditCardNumber(creditCard);
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Get form fields values
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zip = document.getElementById("zip").value;
    const creditCard = document.getElementById("cc-number").value;

    // Validate each field
    const isNameValid = validateName(firstName) && validateName(lastName);
    const isEmailValid = validateEmail(email);
    const isAddressValid = validateAddress(address);
    const isCityValid = validateCity(city);
    const isStateValid = validateState(state);
    const isZipValid = validateZipCode(zip);
    const isCreditCardValid = validateCreditCard(creditCard);

    // If any field is invalid, display an error message
    if (
      !isNameValid ||
      !isEmailValid ||
      !isAddressValid ||
      !isCityValid ||
      !isStateValid ||
      !isZipValid ||
      !isCreditCardValid
    ) {
      alert("Please fill in all required fields correctly.");
    } else {
      alert("Form submitted successfully!");
    }
  };

  function returnShopping() {
    changePage("Browse");
  }
  return !isActive ? (
    <></>
  ) : (
    <div>
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
      <div className="container">
        <button
          onClick={() => returnShopping()}
          id="return-button"
          className="my-4 bg-green-200 hover:bg-green-300 py-2 px-2 border-green-700 rounded"
        >
          Return
        </button>
        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">{quantity}</span>
            </h4>
            <ul className="list-group mb-3">
              {Object.keys(cart).map((key) =>
                cart[key] > 0 ? (
                  <div key={key}>
                    <li class="list-group-item d-flex justify-content-between lh-sm">
                      <div>
                        <h6 class="my-0">{key}</h6>
                        <small class="text-body-secondary">{cart[key]}</small>
                      </div>
                      <span class="text-body-secondary">
                        ${prices[key].toFixed(2)}
                      </span>
                    </li>
                  </div>
                ) : null
              )}
              <li class="list-group-item d-flex justify-content-between">
                <span>Subtotal (USD) </span>
                <strong>
                  {Object.keys(cart)
                    .map((key) => (cart[key] > 0 ? prices[key] : 0))
                    .reduce(
                      (total, price, index) =>
                        total + price * cart[Object.keys(cart)[index]],
                      0
                    )
                    .toFixed(2)}
                </strong>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Tax (USD)</span>
                <strong>
                  {Object.keys(cart)
                    .map((key) => (cart[key] > 0 ? prices[key] : 0))
                    .reduce(
                      (total, price, index) =>
                        total + 0.07 * price * cart[Object.keys(cart)[index]],
                      0
                    )
                    .toFixed(2)}
                </strong>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>
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
                </strong>
              </li>
            </ul>
          </div>
          <div class="col-md-7 col-lg-8">
            <h4 class="mb-3">Billing address</h4>
            <form onSubmit={handleSubmit} class="needs-validation" novalidate>
              <div class="row g-3">
                <div class="col-sm-6">
                  <label for="firstName" class="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="firstName"
                    placeholder=""
                    required
                  ></input>
                  <div class="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
<<<<<<< Updated upstream
              </form>
            </div>
            <div class="col-md-7 col-lg-8">
              <h4 class="mb-3">Billing address</h4>
              <form class="needs-validation" novalidate>
                <div class="row g-3">
                  <div class="col-sm-6">
                    <label for="firstName" class="form-label">First name</label>
                    <input type="text" class="form-control" id="firstName" placeholder="" value="" required />
                    <div class="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
      
                  <div class="col-sm-6">
                    <label for="lastName" class="form-label">Last name</label>
                    <input type="text" class="form-control" id="lastName" placeholder="" value="" required />
                    <div class="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
      
                  <div class="col-12">
                    <label for="username" class="form-label">Username</label>
                    <div class="input-group has-validation">
                      <span class="input-group-text">@</span>
                      <input type="text" class="form-control" id="username" placeholder="Username" required />
                    <div class="invalid-feedback">
                        Your username is required.
                      </div>
                    </div>
                  </div>
      
                  <div class="col-12">
                    <label for="email" class="form-label">Email <span class="text-body-secondary">(Optional)</span></label>
                    <input type="email" class="form-control" id="email" placeholder="you@example.com" />
                    <div class="invalid-feedback">
                      Please enter a valid email address for shipping updates.
                    </div>
                  </div>
      
                  <div class="col-12">
                    <label for="address" class="form-label">Address</label>
                    <input type="text" class="form-control" id="address" placeholder="1234 Main St" required />
                    <div class="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>
      
                  <div class="col-12">
                    <label for="address2" class="form-label">Address 2 <span class="text-body-secondary">(Optional)</span></label>
                    <input type="text" class="form-control" id="address2" placeholder="Apartment or suite" />
                  </div>
      
                  <div class="col-md-5">
                    <label for="country" class="form-label">Country</label>
                    <select class="form-select" id="country" required>
                      <option value="">Choose...</option>
                      <option>United States</option>
                    </select>
                    <div class="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>
      
                  <div class="col-md-4">
                    <label for="state" class="form-label">State</label>
                    <select class="form-select" id="state" required>
                      <option value="">Choose...</option>
                      <option>California</option>
                    </select>
                    <div class="invalid-feedback">
                      Please provide a valid state.
                    </div>
                  </div>
      
                  <div class="col-md-3">
                    <label for="zip" class="form-label">Zip</label>
                    <input type="text" class="form-control" id="zip" placeholder="" required />
                    <div class="invalid-feedback">
                      Zip code required.
                    </div>
                  </div>
                </div>
      
                <hr class="my-4"></hr>
      
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="same-address" />
                  <label class="form-check-label" for="same-address">Shipping address is the same as my billing address</label>
                </div>
      
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="save-info"/>
                  <label class="form-check-label" for="save-info">Save this information for next time</label>
                </div>
      
                <hr class="my-4"></hr>
      
                <h4 class="mb-3">Payment</h4>
      
                <div class="my-3">
                  <div class="form-check">
                    <input id="credit" name="paymentMethod" type="radio" class="form-check-input" checked required />
                    <label class="form-check-label" for="credit">Credit card</label>
                  </div>
                  <div class="form-check">
                    <input id="debit" name="paymentMethod" type="radio" class="form-check-input" required />
                    <label class="form-check-label" for="debit">Debit card</label>
                  </div>
                  <div class="form-check">
                    <input id="paypal" name="paymentMethod" type="radio" class="form-check-input" required />
                    <label class="form-check-label" for="paypal">PayPal</label>
                  </div>
                </div>
      
                <div class="row gy-3">
                  <div class="col-md-6">
                    <label for="cc-name" class="form-label">Name on card</label>
                    <input type="text" class="form-control" id="cc-name" placeholder="" required />
                    <small class="text-body-secondary">Full name as displayed on card</small>
                    <div class="invalid-feedback">
                      Name on card is required
                    </div>
                  </div>
      
                  <div class="col-md-6">
                    <label for="cc-number" class="form-label">Credit card number</label>
                    <input type="text" class="form-control" id="cc-number" placeholder="" required />
                    <div class="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>
      
                  <div class="col-md-3">
                    <label for="cc-expiration" class="form-label">Expiration</label>
                    <input type="text" class="form-control" id="cc-expiration" placeholder="" required />
                    <div class="invalid-feedback">
                      Expiration date required
                    </div>
                  </div>
      
                  <div class="col-md-3">
                    <label for="cc-cvv" class="form-label">CVV</label>
                    <input type="text" class="form-control" id="cc-cvv" placeholder="" required />
                    <div class="invalid-feedback">
                      Security code required
                    </div>
                  </div>
                </div>
      
                <hr class="my-4"></hr>
      
                <button class="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
              </form>
            </div>
=======

                <div class="col-sm-6">
                  <label for="lastName" class="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="lastName"
                    placeholder=""
                    required
                  ></input>
                  <div class="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>

                <div class="col-12">
                  <label for="email" class="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="username@gmail.com"
                  ></input>
                  <div class="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>

                <div class="col-12">
                  <label for="address" class="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="address"
                    placeholder="1234 Main St"
                    required
                  ></input>
                  <div class="invalid-feedback">
                    Please enter your billing address.
                  </div>
                </div>

                <div class="col-12">
                  <label for="address2" class="form-label">
                    Address 2{" "}
                    <span class="text-body-secondary">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="address2"
                    placeholder="Apartment or suite"
                  ></input>
                </div>

                <div class="col-12">
                  <label for="address" class="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="city"
                    placeholder=""
                    required
                  ></input>
                  <div class="invalid-feedback">
                    Please select a valid city.
                  </div>
                </div>

                <div class="col-md-5">
                  <label for="country" class="form-label">
                    Country
                  </label>
                  <select class="form-select" id="country" required>
                    <option>United States</option>
                  </select>
                  <div class="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>

                <div class="col-md-4">
                  <label for="state" class="form-label">
                    State
                  </label>
                  <select class="form-select" id="state" required>
                    <option value="">Choose...</option>
                    {states.map((state, index) => (
                      <option key={index}>{state}</option>
                    ))}
                  </select>
                  <div class="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>

                <div class="col-md-3">
                  <label for="zip" class="form-label">
                    Zip
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="zip"
                    placeholder=""
                    required
                  ></input>
                  <div class="invalid-feedback">Zip code required.</div>
                </div>
              </div>

              <hr class="my-4"></hr>

              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="same-address"
                  onChange={(e) => setShowShippingAddress(e.target.checked)}
                ></input>
                <label class="form-check-label" for="same-address">
                  Shipping address is the same as my billing address
                </label>
              </div>

              {!showShippingAddress && (
                <form
                  onSubmit={handleSubmit}
                  class="needs-validation"
                  novalidate
                >
                  <br></br>
                  <div class="row g-3">
                    <h4 className="mb-3">Shipping address</h4>
                    <div class="col-sm-6">
                      <label for="firstName" class="form-label">
                        First name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="firstName"
                        placeholder=""
                        required
                      ></input>
                      <div class="invalid-feedback">
                        Valid first name is required.
                      </div>
                    </div>

                    <div class="col-sm-6">
                      <label for="lastName" class="form-label">
                        Last name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="lastName"
                        placeholder=""
                        required
                      ></input>
                      <div class="invalid-feedback">
                        Valid last name is required.
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="shipping-address" className="form-label">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="shipping-address"
                        placeholder="1234 Main St"
                        required
                      />
                      <div className="invalid-feedback">
                        Please enter your shipping address.
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="address2" class="form-label">
                        Address 2{" "}
                        <span class="text-body-secondary">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="address2"
                        placeholder="Apartment or suite"
                      ></input>
                    </div>

                    <div class="col-12">
                      <label for="address" class="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="city"
                        placeholder=""
                        required
                      ></input>
                      <div class="invalid-feedback">
                        Please select a valid city.
                      </div>
                    </div>

                    <div class="col-md-5">
                      <label for="country" class="form-label">
                        Country
                      </label>
                      <select class="form-select" id="country" required>
                        <option>United States</option>
                      </select>
                      <div class="invalid-feedback">
                        Please select a valid country.
                      </div>
                    </div>

                    <div class="col-md-4">
                      <label for="state" class="form-label">
                        State
                      </label>
                      <select class="form-select" id="state" required>
                        <option value="">Choose...</option>
                        {states.map((state, index) => (
                          <option key={index}>{state}</option>
                        ))}
                      </select>
                      <div class="invalid-feedback">
                        Please provide a valid state.
                      </div>
                    </div>

                    <div class="col-md-3">
                      <label for="zip" class="form-label">
                        Zip
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="zip"
                        placeholder=""
                        required
                      ></input>
                      <div class="invalid-feedback">Zip code required.</div>
                    </div>
                  </div>
                </form>
              )}

              <hr class="my-4"></hr>

              <h4 class="mb-3">Payment</h4>

              <div class="row gy-3">
                <div class="col-md-6">
                  <label for="cc-name" class="form-label">
                    Name on card
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="cc-name"
                    placeholder=""
                    required
                  ></input>
                  <small class="text-body-secondary">
                    Full name as displayed on card
                  </small>
                  <div class="invalid-feedback">Name on card is required</div>
                </div>

                <div class="col-md-6">
                  <label for="cc-number" class="form-label">
                    Credit card number
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="cc-number"
                    placeholder="0000-0000-0000-0000"
                    maxlength="19"
                    onInput={handleFormatCardNumber}
                    required
                  ></input>
                  <div class="invalid-feedback">
                    Credit card number is required
                  </div>
                </div>

                <div class="col-md-3">
                  <label for="cc-expiration" class="form-label">
                    Expiration
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="cc-expiration"
                    placeholder=""
                    maxlength="5"
                    required
                  ></input>
                  <div class="invalid-feedback">Expiration date required</div>
                </div>

                <div class="col-md-3">
                  <label for="cc-cvv" class="form-label">
                    CVV
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="cc-cvv"
                    placeholder=""
                    maxlength="3"
                    required
                  ></input>
                  <div class="invalid-feedback">Security code required</div>
                </div>
              </div>

              <hr class="my-4"></hr>

              <button class="w-100 btn btn-primary btn-lg" type="submit">
                Order
              </button>
            </form>
>>>>>>> Stashed changes
          </div>
        </div>
        <footer class="my-5 pt-5 text-body-secondary text-center text-small">
          <p class="mb-1">&copy; 2017–2024 Company Name</p>
          <ul class="list-inline">
            <li class="list-inline-item">
              <a href="#">Privacy</a>
            </li>
            <li class="list-inline-item">
              <a href="#">Terms</a>
            </li>
            <li class="list-inline-item">
              <a href="#">Support</a>
            </li>
          </ul>
        </footer>
      </div>
<<<<<<< Updated upstream
    );
};
=======
    </div>
  );
}
>>>>>>> Stashed changes
