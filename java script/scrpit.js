
// Products Data

let products = [

    {
        id: 1,
        title: "The car is frarey is generation",
        price: 2500000,
        imgurl: "images/عربية1 .jpg"
    },

    {
        id: 2,
        title: "The car is marsedis is generation",
        price: 1800000,
        imgurl: "images/عربية 2.jpg"
    },

    {
        id: 3,
        title: "The car is lambor is generation",
        price: 4500000,
        imgurl: "images/عربية 3.jpg"
    },

    {
        id: 4,
        title: "The car is lenxia is generation",
        price: 2200000,
        imgurl: "images/hhhhhhhhhhhhkkkkkkkk.jpg"
    },

    {
        id: 5,
        title: "The car is touta is generation",
        price: 3500000,
        imgurl: "images/jjjjjjjjjjjjjjjjjjjjj.jpg"
    },

    { 
        id: 6,
        title: "The car is touta is modern",
        price: 1500000,
        imgurl: "images/فخعفش 1.jpg"
    },

    {
        id: 7,
        title: "The car is touta is land crounzie",
        price: 5000000,
        imgurl: "images/touta 2 .jpg"
    },

    {
        id: 8,
        title: "The car is touta is land rangi",
        price: 3500000,
        imgurl: "images/touta 3.jpg"
    },

    {
        id: 9,
        title: "The car is touta is land rangi",
        price: 2500000,
        imgurl: "images/touta 5.jpg"
    },

    {
        id: 10,
        title: "The car is touta is land rangi",
        price: 4000000,
        imgurl: "images/123456.jpg"
    },

    {
        id: 11,
        title: "The car is  name Rolls Rouce ",
        price: 9000000,
        imgurl: "images/246810.jpg"
    },
     
    {
        id: 12,
        title: "The car is name Rolls Rouce",
        price: 10000000,
        imgurl: "images/dddddddddddddddddddddddddd.jpg"
    },


];


// Read Cart From LocalStorage

let addeditem = JSON.parse(
    localStorage.getItem("productsIncart")
) || [];


// Update Old Cart Data

addeditem = addeditem.map(item => {

    let product = products.find(
        product => product.id === item.id
    );

    return {
        ...product,
        ...item,
        price: product ? product.price : (item.price || 0),
        quantity: Number(item.quantity) || 1
    };

});


// Read Favorites From LocalStorage

let favoriteProducts = JSON.parse(
    localStorage.getItem("favoriteProducts")
) || [];


// Update Old Favorites Data

favoriteProducts = favoriteProducts.map(item => {

    let product = products.find(
        product => product.id === item.id
    );

    return {
        ...product,
        ...item,
        price: product ? product.price : (item.price || 0)
    };

});


// Save Cart

function saveCart() {

    localStorage.setItem(
        "productsIncart",
        JSON.stringify(addeditem)
    );

}


// Save Favorites

function saveFavorites() {

    localStorage.setItem(
        "favoriteProducts",
        JSON.stringify(favoriteProducts)
    );

}


// Format Price

function formatPrice(price) {

    return price.toLocaleString("en-US") + " EGP";

}


// Draw Products

let allproducts = document.querySelector(".products");

function drawitem(productsToShow = products) {

    if (!allproducts) return;

    if (productsToShow.length === 0) {

        allproducts.innerHTML =
            "<h2>No products found</h2>";

        return;

    }

    allproducts.innerHTML = productsToShow.map((item) => {

        let isInCart = addeditem.some(
            product => product.id === item.id
        );

        let isFavorite = favoriteProducts.some(
            product => product.id === item.id
        );

        return `

            <div class="product-item">

                <img class="product-item-img"
                    src="${item.imgurl}" alt="">

                <div class="product-item-des">

                    <h2>${item.title}</h2>

                    <p>The car is better model</p>

                    <span>Price: ${formatPrice(item.price)}</span>

                </div>

                <div class="product-item-action">

                    <button class="Add_to_cart"
                        onclick="toggleCart(${item.id})">

                        ${isInCart
                            ? "Remove from Cart"
                            : "Add to Cart"}

                    </button>

                    <i class="fa-solid fa-heart"
                        onclick="toggleFavorite(${item.id})"
                        style="
                            cursor: pointer;
                            color: ${isFavorite ? 'red' : 'gray'};
                        ">
                    </i>

                </div>

            </div>

        `;

    }).join("");

}


// Search Products

let searchInput = document.querySelector("#search-input");

let searchBtn = document.querySelector("#search-btn");

function searchProducts() {

    if (!searchInput) return;

    let searchValue = searchInput.value.trim().toLowerCase();

    let filteredProducts = products.filter(item => {

        return item.title.toLowerCase().includes(searchValue);

    });

    drawitem(filteredProducts);

}


if (searchBtn) {

    searchBtn.addEventListener("click", searchProducts);

}


// Add And Remove Cart

function toggleCart(id) {

    let existingItem = addeditem.find(
        item => item.id === id
    );

    if (existingItem) {

        addeditem = addeditem.filter(
            item => item.id !== id
        );

    } else {

        let choosenitem = products.find(
            item => item.id === id
        );

        if (choosenitem) {

            addeditem.push({
                ...choosenitem,
                quantity: 1
            });

        }

    }

    saveCart();

    drawitem(getCurrentSearchResults());

    renderCartPreview();

}


// Get Current Search Results

function getCurrentSearchResults() {

    if (!searchInput || searchInput.value.trim() === "") {
        return products;
    }

    let searchValue = searchInput.value.trim().toLowerCase();

    return products.filter(item =>
        item.title.toLowerCase().includes(searchValue)
    );

}


// Add And Remove Favorites

function toggleFavorite(id) {

    let existingFavorite = favoriteProducts.find(
        item => item.id === id
    );

    if (existingFavorite) {

        favoriteProducts = favoriteProducts.filter(
            item => item.id !== id
        );

    } else {

        let selectedProduct = products.find(
            item => item.id === id
        );

        if (selectedProduct) {
            favoriteProducts.push(selectedProduct);
        }

    }

    saveFavorites();

    drawitem(getCurrentSearchResults());

    drawFavorites();

}


// Draw Favorite Products

function drawFavorites() {

    let favoriteContainer = document.querySelector(
        ".favorite-products"
    );

    if (!favoriteContainer) return;

    if (favoriteProducts.length === 0) {

        favoriteContainer.innerHTML =
            "<h3>No favorite products yet</h3>";

        return;

    }

    favoriteContainer.innerHTML = favoriteProducts.map((item) => {

        return `

            <div class="product-item">

                <img class="product-item-img"
                    src="${item.imgurl}" alt="">

                <div class="product-item-des">

                    <h2>${item.title}</h2>

                    <p>The car is better model</p>

                    <span>Price: ${formatPrice(item.price)}</span>

                </div>

                <div class="product-item-action">

                    <button class="Add_to_cart"
                        onclick="toggleFavorite(${item.id})">

                        Remove from Favorites

                    </button>

                </div>

            </div>

        `;

    }).join("");

}


// Cart Preview

function renderCartPreview() {

    let cartproductDiv = document.querySelector(
        ".carts_products div"
    );

    let badge = document.querySelector(".badge");

    let totalQuantity = addeditem.reduce(
        (total, item) => total + item.quantity,
        0
    );

    if (cartproductDiv) {

        cartproductDiv.innerHTML = addeditem.map(item => {

            return `
                <p>
                    ${item.title}
                    - Quantity: ${item.quantity}
                </p>
            `;

        }).join("");

    }

    if (badge) {

        badge.innerHTML = totalQuantity;

        badge.style.display =
            totalQuantity > 0 ? "block" : "none";

    }

}


// Open And Close Cart

let shoppingCartIcon = document.querySelector(
    ".shopping_carts"
);

let cartsproducts = document.querySelector(
    ".carts_products"
);

if (shoppingCartIcon && cartsproducts) {

    shoppingCartIcon.addEventListener("click", function () {

        if (addeditem.length > 0) {

            cartsproducts.style.display =
                cartsproducts.style.display === "block"
                    ? "none"
                    : "block";

        }

    });

}


// User Login

let userinfo = document.querySelector("#user_info");

let datauser = document.querySelector("#user");

let links = document.querySelector(".links");

if (localStorage.getItem("username")) {

    if (links) {
        links.remove();
    }

    if (userinfo) {
        userinfo.style.display = "flex";
    }

    if (datauser) {
        datauser.innerHTML = localStorage.getItem("username");
    }

} else {

    if (userinfo) {
        userinfo.style.display = "none";
    }

}


// Logout

let logoutBtn = document.querySelector("#logout");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        localStorage.removeItem("username");

        window.location.href = "login.html";

    });

}




// =========================================
// DARK / LIGHT MODE
// =========================================

const themeToggle = document.querySelector("#theme-toggle");
const savedTheme = localStorage.getItem("siteTheme") || "dark";

// Apply the saved theme on every page that loads this JavaScript file.
document.body.setAttribute("data-theme", savedTheme);

function updateThemeButton() {
    if (!themeToggle) return;

    const isDarkMode = document.body.getAttribute("data-theme") === "dark";

    themeToggle.innerHTML = isDarkMode
        ? '<i class="fa-solid fa-sun" aria-hidden="true"></i><span>Light Mode</span>'
        : '<i class="fa-solid fa-moon" aria-hidden="true"></i><span>Dark Mode</span>';

    themeToggle.setAttribute(
        "aria-label",
        isDarkMode ? "Switch to light mode" : "Switch to dark mode"
    );
}

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        const currentTheme = document.body.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        document.body.setAttribute("data-theme", newTheme);
        localStorage.setItem("siteTheme", newTheme);

        updateThemeButton();
    });
}

updateThemeButton();


// Start

saveCart();
saveFavorites();

drawitem();

renderCartPreview();

drawFavorites();
