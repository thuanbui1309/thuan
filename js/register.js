const register_btn = document.getElementById("register");
const reset_btn = document.getElementById("reset");
const form = document.getElementById("register_form");

// List of inputs
let inputs = [
    {
        input_id: "username",
        input_error: "username_error",
        input_type: "enter",
        input_pattern: /^[a-zA-Z0-9_]{4,16}$/,
        error_msg: {
            empty_error: "* Please enter your username",
            wrong_format_error: "* Your username should be between 4 and 16 characters"
        }
    },
    {
        input_id: "password",
        input_error: "password_error",
        input_type: "enter",
        input_pattern: /^.{9,}$/,
        error_msg: {
            empty_error: "* Please enter password",
            wrong_format_error: "* Your password should be at least 8 characters"
        }
    },
    {
        input_id: "confirm-password",
        input_error: "confirm_password_error",
        input_type: "confirm",
        input_pattern: /^.{8,}$/,
        error_msg: {
            empty_error: "* Please enter confirm password",
            wrong_format_error: "* Your password not match"
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
        input_id: 'input[name="Gender"]',
        input_error: "gender_error",
        input_type: "check",
        error_msg: {
            empty_error: "* Please enter your gender"
        }
    },
    {
        input_id: "dietary",
        input_error: "dietary_error",
        input_type: "select",
        error_msg: {
            empty_error: "* Please select your diet"
        }
    },
    {
        input_id: 'input[name="Favorites-Ice-Creams[]"]',
        input_error: "favorite_error",
        input_type: "check",
        error_msg:  {
            empty_error: "* Please select your favorite ice creams"
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
register_btn.addEventListener("click", (event) => {
    event.preventDefault();

    let errors = 0;
    inputs.forEach((input) => {
        let input_field = document.getElementById(input.input_id);

        if (input.input_type === "enter") {
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
        } else if (input.input_type === "confirm") {
            if (input_field.value.length === 0) {
                show_error(input.input_error, input.error_msg["empty_error"]);
                errors += 1;
            } else {
                if (input_field.value !== document.getElementById("password").value) {
                    show_error(input.input_error, input.error_msg["wrong_format_error"])
                    errors += 1;
                } else {
                    hide_error(input.input_error);
                }
            }
        } else if (input.input_type === "check") {
            let checked = false;

            document.querySelectorAll(input.input_id).forEach((check) => {
                if (check.checked) {
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
    } else {
        window.location.href = "#registration_form";
    }
});

// Reset all inputs and error messages
reset_btn.addEventListener("click", () => {
    inputs.forEach(input => {
        hide_error(input.input_error);
    })
})