// Render products on menu
let products = [
    {
        product_name: "Pink Lava Scoop",
        product_price: 8.00,
        product_description: "Creamy indulgence with a burst of fruity sweetness and captivating pink hues"
    },
    {
        product_name: "Avocado Cream",
        product_price: 3.00,
        product_description: "Smooth and velvety, blending the richness if avocado with creamy delight"
    },
    {
        product_name: "Blueberry Bits",
        product_price: 5.00,
        product_description: "Juicy blueberry pieces nestled in a creamy ice base for a fruit sensation"
    },
    {
        product_name: "Choco Mint",
        product_price: 7.00,
        product_description: "Refreshingly cool mint ice cream with decadent chocolate for a delightful treat"
    },
    {
        product_name: "Double chocolate",
        product_price: 9.00,
        product_description: "Rich, velvety chocolate ice cream loaded with decadent chocolate chunks"
    },
    {
        product_name: "Caramel Lemon",
        product_price: 2.00,
        product_description: "Tangy lemon infused with sweet caramel swirls, creating a zesty yet indulgent delight"
    },
    {
        product_name: "Cookie Sandwich",
        product_price: 6.00,
        product_description: "Crisp cookies embracing creamy ice cream for a classic, irresistible treat ever"
    },
    {
        product_name: "Vanilla Swirl",
        product_price: 4.00,
        product_description: "Smooth vanilla ice cream with delicate swirls, a timeless classic combination"
    },
    {
        product_name: "Fruits Ice Cream",
        product_price: 5.00,
        product_description: "Sweet ice cream and fresh fruits, a must-try combination for party nights"
    }
];

// Render content into Home page's menu
let home_dishes = document.getElementById("home__dishes");
let home_dishes_html = "";

products.forEach((product, index) => {
    home_dishes_html += `
        <article class="home__dish">
            <div class="home__dish-content">
                <h3>${product["product_name"]}</h3>
                <h4>$ ${product["product_price"].toFixed(2)}</h4>
                <p>${product["product_description"]}</p>
                <p class="order" id="${index}">Add to cart</p>   
            </div>
            <div class="home__dish-img">
                <img src="images/dish-${index + 1}.png" alt="Lava Scoop">
            </div>
        </article>
    `;

    home_dishes.innerHTML = home_dishes_html;
});

// Add selected product to shopping cart
let cart = JSON.parse(sessionStorage.getItem("cart"));

for (let i = 0; i < products.length; i++) {
    let order_btn = document.getElementById(`${i}`);

    order_btn.addEventListener("click", () => {
        if (cart !== null) {
            let existing_index = -1;
            cart.forEach((order, index) => {
                if (order["product_name"] === products[i]["product_name"]) {
                    existing_index = index;
                }
            });

            if (existing_index !== -1) {
                cart[existing_index]["order_quantity"] += 1;
            } else {
                let new_order = {
                    product_name: products[i]["product_name"],
                    product_id: i,
                    product_price: products[i]["product_price"],
                    order_quantity: 1
                };

                cart.push(new_order);
            }
        } else {
            cart = [];

            let new_order = {
                product_name: products[i]["product_name"],
                product_id: i,
                product_price: products[i]["product_price"],
                order_quantity: 1
            };

            cart.push(new_order);
        }
        
        sessionStorage.setItem("cart", JSON.stringify(cart));
    });
}