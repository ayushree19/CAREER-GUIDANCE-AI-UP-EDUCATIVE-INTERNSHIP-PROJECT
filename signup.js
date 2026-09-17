document.addEventListener("DOMContentLoaded", function () {

    const signupForm = document.getElementById("signupForm");

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    const terms = document.getElementById("terms");

    const togglePassword =
        document.getElementById("togglePassword");

    const toggleConfirmPassword =
        document.getElementById("toggleConfirmPassword");

    const signupMessage =
        document.getElementById("signupMessage");


    /* =========================
       MESSAGE FUNCTION
    ========================= */

    function showMessage(message, type) {

        signupMessage.textContent = message;

        signupMessage.className =
            "form-message " + type;

    }


    /* =========================
       PASSWORD TOGGLE
    ========================= */

    if (togglePassword) {

        togglePassword.addEventListener("click", function () {

            if (password.type === "password") {

                password.type = "text";

                togglePassword.innerHTML =
                    '<i class="fa-solid fa-eye-slash"></i>';

            } else {

                password.type = "password";

                togglePassword.innerHTML =
                    '<i class="fa-solid fa-eye"></i>';

            }

        });

    }


    /* =========================
       CONFIRM PASSWORD TOGGLE
    ========================= */

    if (toggleConfirmPassword) {

        toggleConfirmPassword.addEventListener(
            "click",
            function () {

                if (confirmPassword.type === "password") {

                    confirmPassword.type = "text";

                    toggleConfirmPassword.innerHTML =
                        '<i class="fa-solid fa-eye-slash"></i>';

                } else {

                    confirmPassword.type = "password";

                    toggleConfirmPassword.innerHTML =
                        '<i class="fa-solid fa-eye"></i>';

                }

            }
        );

    }


    /* =========================
       SIGNUP
    ========================= */

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const nameValue =
            fullName.value.trim();

        const emailValue =
            email.value.trim().toLowerCase();

        const passwordValue =
            password.value;

        const confirmValue =
            confirmPassword.value;


        /* NAME VALIDATION */

        if (nameValue.length < 3) {

            showMessage(
                "Please enter your full name.",
                "error"
            );

            fullName.focus();

            return;
        }


        /* EMAIL VALIDATION */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailValue)) {

            showMessage(
                "Please enter a valid email address.",
                "error"
            );

            email.focus();

            return;
        }


        /* PASSWORD VALIDATION */

        if (passwordValue.length < 6) {

            showMessage(
                "Password must be at least 6 characters.",
                "error"
            );

            password.focus();

            return;
        }


        /* CONFIRM PASSWORD */

        if (passwordValue !== confirmValue) {

            showMessage(
                "Passwords do not match.",
                "error"
            );

            confirmPassword.focus();

            return;
        }


        /* TERMS */

        if (!terms.checked) {

            showMessage(
                "Please accept the Terms & Conditions.",
                "error"
            );

            return;
        }


        /* CHECK EXISTING USER */

        const existingUser =
            localStorage.getItem("careerGuideUser");


        if (existingUser) {

            try {

                const user =
                    JSON.parse(existingUser);

                if (
                    user.email &&
                    user.email.toLowerCase() === emailValue
                ) {

                    showMessage(
                        "An account with this email already exists.",
                        "error"
                    );

                    email.focus();

                    return;
                }

            } catch (error) {

                console.error(
                    "Error reading user data:",
                    error
                );

            }

        }


        /* CREATE USER */

        const userAccount = {

            fullName: nameValue,

            email: emailValue,

            password: passwordValue

        };


        localStorage.setItem(
            "careerGuideUser",
            JSON.stringify(userAccount)
        );


        /* SUCCESS */

        showMessage(
            "Account created successfully! Redirecting to login...",
            "success"
        );


        signupForm.reset();


        /* REDIRECT */

        setTimeout(function () {

            window.location.href = "login.html";

        }, 1500);

    });

});