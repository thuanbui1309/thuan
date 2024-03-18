const register_btn = document.getElementById("register");
const reset_btn = document.getElementById("reset");
const form = document.getElementById("register_form");

// List of inputs
let inputs = [
    {
        input_field: document.getElementById("username"),
        input_error: document.getElementById("username_error"),
        input_type: "enter",
        input_pattern: /^[a-zA-Z0-9_]{4,16}$/,
        error_msg: {
            empty_error: "* Please enter your username",
            wrong_format_error: "* Your username should be between 4 and 16 characters"
        }
    },
    {
        input_field: document.getElementById("password"),
        input_error: document.getElementById("password_error"),
        input_type: "enter",
        input_pattern: /^.{9,}$/,
        error_msg: {
            empty_error: "* Please enter password",
            wrong_format_error: "* Your password should be at least 8 characters"
        }
    },
    {
        input_field: document.getElementById("confirm-password"),
        input_error: document.getElementById("confirm_password_error"),
        input_type: "confirm",
        input_pattern: /^.{8,}$/,
        error_msg: {
            empty_error: "* Please enter confirm password",
            wrong_format_error: "* Your password not match"
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
        input_field: document.querySelectorAll('input[name="Gender"]'),
        input_error: document.getElementById("gender_error"),
        input_type: "check",
        error_msg: {
            empty_error: "* Please enter your gender"
        }
    },
    {
        input_field: document.getElementById("dietary"),
        input_error: document.getElementById("dietary_error"),
        input_type: "select",
        error_msg: {
            empty_error: "* Please select your diet"
        }
    },
    {
        input_field: document.querySelectorAll('input[name="Favorites-Ice-Creams[]"]'),
        input_error: document.getElementById("favorite_error"),
        input_type: "check",
        error_msg:  {
            empty_error: "* Please select your favorite ice creams"
        }
    }
]

// Show or hide input when data is valid or not 
function show_error(input, index, error) {
    input.input_error.style.color = "#EC5F5F";
    input.input_error.innerText = input.error_msg[`${error}`];
}

function hide_error(input) {
    input.input_error.style.color = "transparent";
}

// Validate form before submitting
register_btn.addEventListener("click", (event) => {
    event.preventDefault();


    let errors = 0;
    inputs.forEach((input, index) => {
        if (input.input_type === "enter") {
            if (input.input_field.value.length === 0) {
                show_error(input, index, "empty_error");
                errors += 1;
            } else {
                if (input.input_field.value.match(input.input_pattern) ===  null){
                    show_error(input, index, "wrong_format_error")
                    errors += 1;
                } else {
                    hide_error(input);
                }
            }
        } else if (input.input_type === "confirm") {
            if (input.input_field.value.length === 0) {
                show_error(input, index, "empty_error");
                errors += 1;
            } else {
                if (input.input_field.value !== document.getElementById("password").value) {
                    show_error(input, index, "wrong_format_error");
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
                show_error(input, index, "empty_error");
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
                show_error(input, index, "empty_error");
                errors += 1;
            } else {
                hide_error(input);
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
        hide_error(input);
    })
})