// Render shopping cart and checkout
let cart = JSON.parse(sessionStorage.getItem("cart"));
const main__empty_cart = document.getElementById("main__empty-cart");
const main__selected_cart = document.getElementById("main__selected-cart");
const shopping_cart_content = document.getElementById("shopping__cart-content");
const total_cart = document.getElementById("shopping_cart-total");

// Render content
function render_cart(cart) {
    shopping_cart_html = "";
    shopping_cart_total = 0;
    cart.forEach((order, index) => {
        shopping_cart_html += `
        <article class="shopping__cart-item">
            <div class="inner-title flex">
                <h2>${order["product_name"]}</h2>
                <p onclick="remove(${index})">X</p>
            </div>
            <div class="inner-content flex">
                <div class="shopping__cart-img">
                    <img src="images/dish-${order["product_id"] + 1}.png" alt="cart item image">
                </div>
                <div class="shopping__cart-quantity">
                    <span onclick="minus(${index})">-</span>
                    <p id="item-${index}">${order["order_quantity"]}</p>
                    <span onclick="plus(${index})">+</span>
                </div>
                <p>$ ${order.product_price.toFixed(2)}</p>
            </div>
        </article>
        `;
    });
    shopping_cart_content.innerHTML = shopping_cart_html;
    render_total();
}

function render_quantity(id) {
    let item = document.getElementById(`item-${id}`);
    item.innerText = cart[id]["order_quantity"];
}

function render_total() {
    total = 0;
    cart.forEach(order => {
        total += order["order_quantity"] * order["product_price"];
    })
    total_cart.innerHTML = `
        <h2>Total</h2>
        <p>$ ${total.toFixed(2)}</p>
    `;
}

// Add or subtract quantity of order
function plus(id) {
    cart[id]["order_quantity"] += 1;
    render_quantity(id)
    render_total();
};

function minus(id) {
    if (cart[id]["order_quantity"] > 1) {
        cart[id]["order_quantity"] = cart[id]["order_quantity"] - 1;
        render_quantity(id)
        render_total();
    } else {
        console.log("false");
    }
};

function remove(id) {
    cart.splice(id, 1);
    if (cart.length > 0) {
        sessionStorage.setItem("cart", JSON.stringify(cart));
        render_cart(cart);
    } else {
        main__selected_cart.style.display = "none";
        main__empty_cart.style.display = "flex";
        sessionStorage.removeItem("cart");
    }
};

// Only show checkout if cart is not empty
if (cart !== null) {
    main__empty_cart.style.display = "none";
    // render_cart(cart);
} else {
    main__selected_cart.style.display = "none";
}