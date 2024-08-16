document.addEventListener("DOMContentLoaded", function () {
  const cartItems = document.getElementById("cartItems");
  const totalAmount = document.getElementById("totalAmount");
  const continueShoppingBtn = document.querySelector(".continue-shopping");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.dataset.index = index; // Store index in data attribute
      li.innerHTML = `
        ${item.name}
        <input type="number" value="${
          item.quantity
        }" min="1" class="qty-input" />
        x $${item.price} = $${item.price * item.quantity}
        <button class="remove-btn">Remove</button>
      `;
      cartItems.appendChild(li);
      total += item.price * item.quantity;
    });

    totalAmount.textContent = `$${total}`;
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  function updateQuantity(index, quantity) {
    if (quantity < 1) quantity = 1;
    cart[index].quantity = parseInt(quantity, 10);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  function addToCart(productName, price) {
    const existingItem = cart.find((item) => item.name === productName);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name: productName, price, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  function handleAddToCartClick(event) {
    if (event.target.classList.contains("add-to-cart")) {
      const button = event.target;
      const productName = button.dataset.productName;
      const price = parseFloat(button.dataset.productPrice);

      addToCart(productName, price);

      button.textContent = "Added to Cart";
      button.disabled = true; // Optional: Disable button after adding
    }
  }

  cartItems.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-btn")) {
      const index = event.target.closest("li").dataset.index;
      removeFromCart(index);
    }
  });

  cartItems.addEventListener("change", function (event) {
    if (event.target.classList.contains("qty-input")) {
      const index = event.target.closest("li").dataset.index;
      const quantity = event.target.value;
      updateQuantity(index, quantity);
    }
  });

  document.addEventListener("click", handleAddToCartClick);

  continueShoppingBtn.addEventListener("click", function () {
    window.location.href = "index.html";
  });

  renderCart();
});
