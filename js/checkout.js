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
        input_id: "name_input",
        input_error: "name_error",
        input_type: "enter",
        input_pattern: /[a-zA-Z ]{1,20}$/,
        error_msg: {
            empty_error: "* Please enter your name",
            wrong_format_error: "* Only alpha letters are allowed"
        }
    },
    {
        input_id: "input[name=\"Shipping Method\"]",
        input_error: "shipping_error",
        input_type: "check",
        error_msg: {
            empty_error: "* Please choose delivery option",
        }
    },
    {
        input_id: "street_address",
        input_error: "address_error",
        input_type: "enter",
        input_pattern: /^[a-zA-Z ]{1,40}$/,
        error_msg: {
            empty_error: "* Please enter your address",
            wrong_format_error: "* Your address is not valid"
        },
        input_name_attr: "Street-Address"
    },
    {
        input_id: "suburb_town",
        input_error: "suburb_error",
        input_type: "enter",
        input_pattern: /^[a-zA-Z ]{1,40}$/,
        error_msg: {
            empty_error: "* Please enter your suburb/town",
            wrong_format_error: "* Your suburb is not valid"
        },
        input_name_attr: "Suburb-Town"
    },
    {
        input_id: "postcode",
        input_error: "postcode_error",
        input_type: "enter",
        input_pattern: /^[0-9]{4}$/,
        error_msg: {
            empty_error: "* Please enter your address's postcode",
            wrong_format_error: "* Your postcode is not valid"
        },
        input_name_attr: "Postcode"
    },
    {
        input_id: "billing_street_address",
        input_error: "billing_address_error",
        input_type: "enter",
        input_pattern: /^[a-zA-Z ]{1,40}$/,
        error_msg: {
            empty_error: "* Please enter your billing address",
            wrong_format_error: "* Your billing address is not valid"
        }
    },
    {
        input_id: "billing_suburb_town",
        input_error: "billing_suburb_error",
        input_type: "enter",
        input_pattern: /^[a-zA-Z ]{1,40}$/,
        error_msg: {
            empty_error: "* Please enter your billing suburb/town",
            wrong_format_error: "* Your billing suburb is not valid"
        }
    },
    {
        input_id: "billing_postcode",
        input_error: "billing_postcode_error",
        input_type: "enter",
        input_pattern: /^[0-9]{4}$/,
        error_msg: {
            empty_error: "* Please enter your billing address's postcode",
            wrong_format_error: "* Your billing's postcode is not valid"
        }
    },
    {
        input_id: "Email",
        input_error: "email_error",
        input_type: "enter",
        input_pattern: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
        error_msg: {
            empty_error: "* Please enter your email",
            wrong_format_error: "* You must enter a valid email"
        }
    },
    {
        input_id: "phone-number",
        input_error: "phone_error",
        input_type: "enter",
        input_pattern: /^[0-9]{8,12}$/,
        error_msg: {
            empty_error: "* Please enter your phone number",
            wrong_format_error: "* Your phone number is not valid"
        }
    },
    {
        input_id: "input[name=\"Payment Method\"]",
        input_error: "payment_error",
        input_type: "check",
        error_msg: {
            empty_error: "* Please choose payment method",
        }
    },
    {
        input_id: "card_name_input",
        input_error: "card_name_error",
        input_type: "enter",
        input_pattern: /[a-zA-Z ]{1,20}$/,
        error_msg: {
            empty_error: "",
            wrong_format_error: ""
        }
    }
];

// List of cards
let cards = [
    {
        card_length: 16,
        card_error: "visa-card-label",
        error_msg: {
            empty_error: "* Please enter your Visa card number",
            wrong_format_error: "* Remember Visa card number is 16 digits"
        }
    },
    {
        card_length: 16,
        card_error: "master-card-label",
        error_msg: {
            empty_error: "* Please enter your MaterCard number",
            wrong_format_error: "* Remember MasterCard number is 16 digits"
        }
    },
    {
        card_length: 15,
        card_error: "amex-card-label",
        error_msg: {
            empty_error: "* Please enter your American Express card number",
            wrong_format_error: "* Remember American Express card number is 15 digits"
        }
    }
]

// Show or hide input when data is valid or not 
function show_error(input_error, error_msg) {
    error_element = document.getElementById(input_error);
    error_element.style.color = "#EC5F5F";
    error_element.innerText = error_msg;
}

function hide_error(input_error) {
    error_element = document.getElementById(input_error);
    error_element.style.color = "transparent";
}

// Validate form before submitting
order_btn.addEventListener("click", (event) => {
    event.preventDefault();

    let errors = 0;
    inputs.forEach((input) => {

        let input_field = document.getElementById(input.input_id);

        if (input.input_type === "enter" && input_field !== null) {
            if (input_field.value.length === 0) {
                show_error(input.input_error, input.error_msg["empty_error"]);
                errors += 1;
            } else {
                if (input_field.value.match(input.input_pattern) ===  null){
                    show_error(input.input_error, input.error_msg["wrong_format_error"])
                    errors += 1;
                } else {
                    hide_error(input.input_error);
                }
            }
        } else if (input.input_type === "check") {
            let checked = false;

            // Check if any radio button in the group is checked
            document.querySelectorAll(input.input_id).forEach((radio) => {
                if (radio.checked) {
                    checked = true;
                }
            });

            if (!checked) {
                show_error(input.input_error, input.error_msg["empty_error"]);
                errors += 1;
            } else {
                hide_error(input.input_error);
            }
        } else if (input.input_type === "select") {
            let is_checked = false;
            if (input_field.value !== "") {
                is_checked = true;
            }

            if (!is_checked) {
                show_error(input.input_error, input.error_msg["empty_error"]);
                errors += 1;
            } else {
                hide_error(input.input_error);
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
        let input_field = document.getElementById(input.input_id);
        if (input_field) {
            hide_error(input.input_error);
        } else {
            if (input.input_type === "check") {
                hide_error(input.input_error);
            }
        }
    })

    document.getElementById("shipping_error").style.color = "transparent";
    delivery_address.innerHTML = ``;
    delivery_address.style.display = "none";
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
            delivery_address.style.display = "block";
        }

        if (autofill.checked) {
            autofill.checked = false;
        }
        hide_error("same_as_delivery_error");
    });

    pickup.addEventListener("change", function() {
        if (this.checked) {
            document.getElementById("shipping_error").style.color = "transparent";
            delivery_address.innerHTML = ``;
            delivery_address.style.display = "none";
        }
    });

    // Autofill billing address if user choose
    autofill.addEventListener("change", function() {
        if (this.checked) {
            // Check if user has finished delivery address or not
            if (document.getElementById("delivery").checked){

                // When user choose delivery, check if they has finished
                // delivery address or not
                let street_address = document.getElementById("street_address");
                let suburb_town = document.getElementById("suburb_town");
                let postcode = document.getElementById("postcode");

                let billing_street_address = document.getElementById("billing_street_address");
                let billing_suburb_town = document.getElementById("billing_suburb_town");
                let billing_postcode = document.getElementById("billing_postcode");

                console.log(postcode.value);

                if (street_address.value.trim() !== "" && suburb_town.value.trim() !== "" && postcode.value.trim() !== "") {
                    billing_street_address.value = street_address.value;
                    billing_suburb_town.value = suburb_town.value;
                    billing_postcode.value = postcode.value;
                    hide_error("same_as_delivery_error");
                } else {
                    show_error("same_as_delivery_error", "Please finish your delivery address");
                    this.checked = false;
                }
            } else {
                this.checked = false;
                show_error("same_as_delivery_error", "Please choose delivery first");
            }
        } else {
            hide_error("same_as_delivery_error");
        }
    });
});

// Change 
// Select all radio buttons with name "cards[]"
const card_inputs = document.querySelectorAll('[name="cards[]"]');

// Add event listener to each radio button
card_inputs.forEach((card_input, index) => {
    card_input.addEventListener("change", function() {
        if (this.checked) {
            document.getElementById(cards[index].card_error).style.backgroundColor = "#E7E7E7";
        } else if (!this.checked) {
            document.querySelectorAll('.inner-img').forEach(label => {
                label.style.backgroundColor = "transparent";
            });
            document.getElementById(cards[index].card_error).style.backgroundColor = "white";
            console.log(index);
        }
    });
});