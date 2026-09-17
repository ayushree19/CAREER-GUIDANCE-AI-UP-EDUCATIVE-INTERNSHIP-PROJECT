document.addEventListener("DOMContentLoaded", function () {

    const forgotForm = document.getElementById("forgotForm");
    const emailStep = document.getElementById("emailStep");
    const passwordStep = document.getElementById("passwordStep");

    const emailInput = document.getElementById("email");
    const newPassword = document.getElementById("newPassword");
    const confirmPassword = document.getElementById("confirmPassword");

    const verifyBtn = document.getElementById("verifyBtn");

    const toggleNewPassword =
        document.getElementById("toggleNewPassword");

    const toggleConfirmPassword =
        document.getElementById("toggleConfirmPassword");

    const message = document.getElementById("forgotMessage");
    const stepText = document.getElementById("stepText");


    /* =========================
       MESSAGE
    ========================= */

    function showMessage(text, type) {

        message.textContent = text;
        message.className = "forgot-message " + type;

    }


    /* =========================
       GET SAVED ACCOUNT
    ========================= */

    function getSavedAccount() {

        const savedData =
            localStorage.getItem("careerGuideUser");

        if (!savedData) {
            return null;
        }

        try {

            return JSON.parse(savedData);

        } catch (error) {

            console.error(
                "Unable to read account:",
                error
            );

            return null;
        }
    }


    /* =========================
       VERIFY EMAIL
    ========================= */

    verifyBtn.addEventListener("click", function () {

        const enteredEmail =
            emailInput.value.trim().toLowerCase();


        // Empty email
        if (enteredEmail === "") {

            showMessage(
                "Please enter your registered email.",
                "error"
            );

            emailInput.focus();

            return;
        }


        // Email validation
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(enteredEmail)) {

            showMessage(
                "Please enter a valid email address.",
                "error"
            );

            emailInput.focus();

            return;
        }


        // Get account
        const user = getSavedAccount();


        // No account
        if (!user) {

            showMessage(
                "No registered account found. Please sign up first.",
                "error"
            );

            return;
        }


        // Check email exists
        if (!user.email) {

            showMessage(
                "Registered email not found. Please sign up again.",
                "error"
            );

            return;
        }


        const registeredEmail =
            String(user.email)
                .trim()
                .toLowerCase();


        // Compare
        if (enteredEmail !== registeredEmail) {

            showMessage(
                "This email is not registered.",
                "error"
            );

            return;
        }


        /* =========================
           EMAIL VERIFIED
        ========================= */

        showMessage(
            "Email verified successfully!",
            "success"
        );


        emailStep.classList.add("hidden");

        passwordStep.classList.remove("hidden");

        stepText.textContent =
            "Create a new password to continue";


        newPassword.focus();

    });


    /* =========================
       RESET PASSWORD
    ========================= */

    forgotForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const password =
            newPassword.value;

        const confirm =
            confirmPassword.value;


        // Password length
        if (password.length < 6) {

            showMessage(
                "Password must be at least 6 characters.",
                "error"
            );

            newPassword.focus();

            return;
        }


        // Password match
        if (password !== confirm) {

            showMessage(
                "Passwords do not match.",
                "error"
            );

            confirmPassword.focus();

            return;
        }


        // Get account
        const user = getSavedAccount();


        if (!user) {

            showMessage(
                "Account not found. Please sign up again.",
                "error"
            );

            return;
        }


        // Update password
        user.password = password;


        // Save account
        localStorage.setItem(
            "careerGuideUser",
            JSON.stringify(user)
        );


        // Success
        showMessage(
            "Password reset successfully! Redirecting to login...",
            "success"
        );


        setTimeout(function () {

            window.location.href = "login.html";

        }, 1500);

    });


    /* =========================
       NEW PASSWORD TOGGLE
    ========================= */

    toggleNewPassword.addEventListener(
        "click",
        function () {

            if (newPassword.type === "password") {

                newPassword.type = "text";

                this.innerHTML =
                    '<i class="fa-solid fa-eye-slash"></i>';

            } else {

                newPassword.type = "password";

                this.innerHTML =
                    '<i class="fa-solid fa-eye"></i>';

            }

        }
    );


    /* =========================
       CONFIRM PASSWORD TOGGLE
    ========================= */

    toggleConfirmPassword.addEventListener(
        "click",
        function () {

            if (confirmPassword.type === "password") {

                confirmPassword.type = "text";

                this.innerHTML =
                    '<i class="fa-solid fa-eye-slash"></i>';

            } else {

                confirmPassword.type = "password";

                this.innerHTML =
                    '<i class="fa-solid fa-eye"></i>';

            }

        }
    );


    console.log(
        "CareerGuide AI - Forgot Password JS Loaded"
    );

});