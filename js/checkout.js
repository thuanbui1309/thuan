const order_btn = document.getElementById("order");
const reset_btn = document.getElementById("reset");
const form = document.getElementById("order_form");
const delivery_address = document.getElementById("order__delivery-address");
const delivery = document.getElementById("delivery");
const pickup = document.getElementById("pickup");
const autofill = document.getElementById("same_as_delivery");

// List of inputs
let inputs = [
    {
        input_field: document.getElementById("name_input"),
        input_error: document.getElementById("name_error"),
        input_type: "enter",
        input_pattern: /[a-zA-Z ]{1,20}$/,
        error_msg: {
            empty_error: "* Please enter your name",
            wrong_format_error: "* Only alpha letters are allowed"
        }
    },
    {
        input_field: document.querySelectorAll('input[name="Shipping Method"]'),
        input_error: document.getElementById("shipping_error"),
        input_type: "check",
        error_msg: {
            empty_error: "* Please choose delivery option",
        }
    },
    {
        input_field: document.getElementById("street_address"),
        input_error: document.getElementById("address_error"),
        input_type: "delivery-enter",
        input_pattern: /^[a-zA-Z ]{1,40}$/,
        error_msg: {
            empty_error: "* Please enter your address",
            wrong_format_error: "* Your address is not valid"
        },
        input_name_attr: "Street-Address"
    },
    {
        input_field: document.getElementById("suburb_town"),
        input_error: document.getElementById("suburb_error"),
        input_type: "delivery-enter",
        input_pattern: /^[a-zA-Z ]{1,40}$/,
        error_msg: {
            empty_error: "* Please enter your suburb/town",
            wrong_format_error: "* Your suburb is not valid"
        },
        input_name_attr: "Suburb-Town"
    },
    {
        input_field: document.getElementById("postcode"),
        input_error: document.getElementById("postcode_error"),
        input_type: "delivery-enter",
        input_pattern: /^[0-9]{4}$/,
        error_msg: {
            empty_error: "* Please enter your address's postcode",
            wrong_format_error: "* Your postcode is not valid"
        },
        input_name_attr: "Postcode"
    },
    {
        input_field: document.getElementById("billing_street_address"),
        input_error: document.getElementById("billing_address_error"),
        input_type: "enter",
        input_pattern: /^[a-zA-Z ]{1,40}$/,
        error_msg: {
            empty_error: "* Please enter your billing address",
            wrong_format_error: "* Your billing address is not valid"
        }
    },
    {
        input_field: document.getElementById("billing_suburb_town"),
        input_error: document.getElementById("billing_suburb_error"),
        input_type: "enter",
        input_pattern: /^[a-zA-Z ]{1,40}$/,
        error_msg: {
            empty_error: "* Please enter your billing suburb/town",
            wrong_format_error: "* Your billing suburb is not valid"
        }
    },
    {
        input_field: document.getElementById("billing_postcode"),
        input_error: document.getElementById("billing_postcode_error"),
        input_type: "enter",
        input_pattern: /^[0-9]{4}$/,
        error_msg: {
            empty_error: "* Please enter your billing address's postcode",
            wrong_format_error: "* Your billing's postcode is not valid"
        }
    },
    {
        input_field: document.getElementById("Email"),
        input_error: document.getElementById("email_error"),
        input_type: "enter",
        input_pattern: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
        error_msg: {
            empty_error: "* Please enter your email",
            wrong_format_error: "* You must enter a valid email"
        }
    },
    {
        input_field: document.getElementById("phone-number"),
        input_error: document.getElementById("phone_error"),
        input_type: "enter",
        input_pattern: /^[0-9]{8,12}$/,
        error_msg: {
            empty_error: "* Please enter your phone number",
            wrong_format_error: "* Your phone number is not valid"
        }
    },
    {
        input_field: document.querySelectorAll('input[name="Payment Method"]'),
        input_error: document.getElementById("payment_error"),
        input_type: "check",
        error_msg: {
            empty_error: "* Please choose payment method",
        }
    }
]

// Show or hide input when data is valid or not 
function show_error(input, error) {
    input.input_error.style.color = "#EC5F5F";
    input.input_error.innerText = input.error_msg[`${error}`];
}

function hide_error(input) {
    input.input_error.style.color = "transparent";
}

// Validate form before submitting
order_btn.addEventListener("click", (event) => {
    event.preventDefault();
    let errors = 0;
    inputs.forEach((input) => {
        if (input.input_field !== null) {
            if (input.input_type === "enter" || input.input_type === "delivery-enter") {
                if (input.input_field.value.length === 0) {
                    show_error(input, "empty_error");
                    console.log("error");
    
                    errors += 1;
                } else {
                    if (input.input_field.value.match(input.input_pattern) ===  null){
                        show_error(input, "wrong_format_error")
                        errors += 1;
                    } else {
                        hide_error(input);
                    }
                }
            } else if (input.input_type === "check") {
                let is_checked = false;
                input.input_field.forEach((check) => {
                    if (check.checked) {
                        is_checked = true;
                    }
                });
                if (!is_checked) {
                    show_error(input, "empty_error");
                    errors += 1;
                } else {
                    hide_error(input);
                }
            } else if (input.input_type === "select") {
                let is_checked = false;
                if (input.input_field.value !== "") {
                    is_checked = true;
                }
    
                if (!is_checked) {
                    show_error(input, "empty_error");
                    errors += 1;
                } else {
                    hide_error(input);
                }
            }
        }
        
    });

    // Move this outside of the loop
    if (errors === 0) {
        form.submit();
    }
});

// Reset all inputs and error messages
reset_btn.addEventListener("click", () => {
    inputs.forEach(input => {
        if (input.input_type !== "none") {
            hide_error(input);
        }
    })
})

// Show delivery address when delivery is chosen
document.addEventListener("DOMContentLoaded", function() {
    
    // Show delivery address if user choose
    delivery.addEventListener("change", function() {
        if (this.checked) {
            document.getElementById("shipping_error").style.color = "transparent";

            delivery_address.innerHTML = `
                <legend>Delivery Address <span class="required-mark">*</span></legend>
                                
                <label for="street_address">Address <span class="required-mark">*</span></label>
                <input type="text" name="Street-Address" id="street_address">
                <p class="sub-error" id="address_error">error msg</p>

                <label for="suburb_town">Suburb/Town<span class="required-mark"> *</span></label>
                <input type="text" name="Suburb-Town" id="suburb_town">
                <p class="sub-error" id="suburb_error">error msg</p>

                <label for="postcode">Postcode</label>
                <input type="text" name="Postcode" id="postcode" placeholder=" ex.1234">
                <p class="sub-error" id="postcode_error">error msg</p>
            `;

            inputs.forEach((input) => {
                if (input.input_field = "delivery-enter") {
                }
            });

            delivery_address.style.display = "block";
        }
    });

    pickup.addEventListener("change", function() {
        if (this.checked) {
            document.getElementById("shipping_error").style.color = "transparent";
            delivery_address.style.display = "none";
    
            inputs.forEach((input) => {
                if (input.input_type === "delivery-enter") {
                    // input.input_field.removeAttribute("name"); // Avoid the form submitting delivery address
                }
            });
        }

    });

    // Autofill billing address if user choose
    // autofill.addEventListener("change", function() {
    //     if (this.checked) {
    //         document.getElementById("shipping_error").style.color = "transparent";
    //         delivery_address.style.display = "none";
    
    //         inputs.forEach((input) => {
    //             if (input.input_type === "delivery-enter") {
    //                 // input.input_field.removeAttribute("name"); // Avoid the form submitting delivery address
    //                 input.input_field.setAttribute("name", null);
    //             }
    //         });
    //     }

    // });

});