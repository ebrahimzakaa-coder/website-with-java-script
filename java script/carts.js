
// Cart Container

let cartContainer = document.querySelector(".cart-page-products");


// Total Price Container

let totalPriceContainer = document.querySelector(".total-price");




// Draw Cart Products

function drawcartproduct() {

    if (!cartContainer) return;

    if (addeditem.length === 0) {

        cartContainer.innerHTML = "<h2>Your cart is empty</h2>";

        updateTotalPrice();

        return;

    }

    cartContainer.innerHTML = addeditem.map((item) => {

        let itemTotal = item.price * item.quantity;

        return `

            <div class="product-item">

                <img class="product-item-img"
                    src="${item.imgurl}" alt="">

                <div class="product-item-des">

                    <h2>${item.title}</h2>

                    <p>Price: ${formatPrice(item.price)}</p>

                    <p>
                        Total: ${formatPrice(itemTotal)}
                    </p>

                    <div class="quantity-controls">

                        <button onclick="changeQuantity(${item.id}, 1)">
                            +
                        </button>

                        <span>${item.quantity}</span>

                        <button onclick="changeQuantity(${item.id}, -1)">
                            -
                        </button>

                    </div>

                </div>

                <div class="product-item-action">

                    <button class="Add_to_cart"
                        onclick="removeFromCart(${item.id})">

                        Remove from Cart

                    </button>

                </div>

            </div>

        `;

    }).join("");

    updateTotalPrice();

}


// Change Product Quantity

function changeQuantity(id, amount) {

    let selectedItem = addeditem.find(item => item.id === id);



    if (!selectedItem) return;

    selectedItem.quantity += amount;

    if (selectedItem.quantity <= 0) {

        addeditem = addeditem.filter(
            item => item.id !== id
        );

    }

    saveCart();

    drawcartproduct();

    renderCartPreview();

    drawitem();

}


// Remove Product Completely

function removeFromCart(id) {

    addeditem = addeditem.filter(
        item => item.id !== id
    );

    saveCart();

    drawcartproduct();

    renderCartPreview();

    drawitem();

}


// Update Total Price

function updateTotalPrice() {

    if (!totalPriceContainer) return;

    let total = addeditem.reduce((sum, item) => {

        return sum + (item.price * item.quantity);

    }, 0);

    totalPriceContainer.innerHTML = `

        <h3>
            ${formatPrice(total)}
        </h3>

    `;

}


// Start

drawcartproduct();

updateTotalPrice();
