document.addEventListener("DOMContentLoaded", function () {
  const cartButton = document.getElementById("cartButton");
  const cartCount = document.getElementById("cartCount");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const sortSelect = document.getElementById("sort");
  const productsContainer = document.querySelector(".products");
  const categoryLinks = document.querySelectorAll("#sidebar a");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Update cart count on page load
  updateCartCount();

  // Function to add product to the cart
  function addToCart(productName, productPrice) {
    const existingProduct = cart.find((item) => item.name === productName);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }

  // Function to update the cart count displayed on the page
  function updateCartCount() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Function to filter products by category
  function filterProducts(category) {
    const products = productsContainer.querySelectorAll(".product");

    products.forEach((product) => {
      if (
        category === "all" ||
        product.getAttribute("data-category") === category
      ) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  }

  // Function to handle the "Add to Cart" button click
  function handleAddToCartClick(event) {
    if (event.target.classList.contains("add-to-cart")) {
      const button = event.target;
      const productElement = button.closest(".product");
      const productName = productElement.querySelector("h3").textContent;
      const productPrice = parseFloat(
        productElement.querySelector("p").textContent.replace("$", "")
      );

      addToCart(productName, productPrice);
      button.textContent = "Added to Cart";
      button.disabled = true; // Disable the button after clicking
    }
  }

  // Add event listener to "Add to Cart" buttons
  document.addEventListener("click", handleAddToCartClick);

  // Redirect to cart page on cart button click
  cartButton.addEventListener("click", function () {
    window.location.href = "cart.html";
  });

  // Sort products based on selected option
  sortSelect.addEventListener("change", function () {
    const value = this.value;
    const products = Array.from(productsContainer.querySelectorAll(".product"));

    products.sort((a, b) => {
      const priceA = parseFloat(a.getAttribute("data-price"));
      const priceB = parseFloat(b.getAttribute("data-price"));
      const nameA = a.querySelector("h3").textContent;
      const nameB = b.querySelector("h3").textContent;

      if (value === "price-asc") return priceA - priceB;
      if (value === "price-desc") return priceB - priceA;
      if (value === "name-asc") return nameA.localeCompare(nameB);
      if (value === "name-desc") return nameB.localeCompare(nameA);
      return 0;
    });

    // Clear the container and append sorted products
    productsContainer.innerHTML = "";
    products.forEach((product) => productsContainer.appendChild(product));
  });

  // Add event listeners to category links
  categoryLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const category = this.getAttribute("data-category");
      filterProducts(category);

      // Close the sidebar menu after selection
      const sidebar = document.getElementById("sidebar");
      if (sidebar) {
        sidebar.classList.remove("active");
      }
    });
  });
});
