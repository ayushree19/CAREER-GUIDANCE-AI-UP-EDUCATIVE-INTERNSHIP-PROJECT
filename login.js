document.addEventListener("DOMContentLoaded", function () {


    /* =================================
       GET ELEMENTS
    ================================== */

    const loginForm =
        document.getElementById("loginForm");

    const email =
        document.getElementById("email");

    const password =
        document.getElementById("password");

    const rememberMe =
        document.getElementById("rememberMe");

    const loginMessage =
        document.getElementById("loginMessage");

    const togglePassword =
        document.getElementById("togglePassword");



    /* =================================
       SHOW / HIDE PASSWORD
    ================================== */

    togglePassword.addEventListener(
        "click",
        function () {

            if (password.type === "password") {

                password.type = "text";

                togglePassword.innerHTML =
                    '<i class="fa-solid fa-eye-slash"></i>';

                togglePassword.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            } else {

                password.type = "password";

                togglePassword.innerHTML =
                    '<i class="fa-solid fa-eye"></i>';

                togglePassword.setAttribute(
                    "aria-label",
                    "Show password"
                );

            }

        }
    );



    /* =================================
       LOGIN FORM
    ================================== */

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* Get values */

            const emailValue =
                email.value.trim().toLowerCase();

            const passwordValue =
                password.value;


            /* Clear previous message */

            loginMessage.textContent = "";

            loginMessage.classList.remove(
                "success",
                "error"
            );


            /* =================================
               BASIC VALIDATION
            ================================== */

            if (emailValue === "") {

                loginMessage.textContent =
                    "Please enter your email address.";

                loginMessage.classList.add("error");

                return;
            }


            if (passwordValue === "") {

                loginMessage.textContent =
                    "Please enter your password.";

                loginMessage.classList.add("error");

                return;
            }



            /* =================================
               GET SAVED ACCOUNT
            ================================== */

            const savedAccount =
                localStorage.getItem(
                    "careerGuideUser"
                );


            /* No account */

            if (!savedAccount) {

                loginMessage.textContent =
                    "No account found. Please create an account first.";

                loginMessage.classList.add("error");

                return;
            }



            /* =================================
               READ ACCOUNT DATA
            ================================== */

            let user;

            try {

                user =
                    JSON.parse(savedAccount);

            } catch (error) {

                loginMessage.textContent =
                    "Account data is invalid. Please sign up again.";

                loginMessage.classList.add("error");

                return;
            }



            /* =================================
               CHECK EMAIL
            ================================== */

            const registeredEmail =
                String(user.email)
                    .trim()
                    .toLowerCase();


            if (registeredEmail !== emailValue) {

                loginMessage.textContent =
                    "Invalid email or password.";

                loginMessage.classList.add("error");

                return;
            }



            /* =================================
               CHECK PASSWORD
            ================================== */

            if (user.password !== passwordValue) {

                loginMessage.textContent =
                    "Invalid email or password.";

                loginMessage.classList.add("error");

                return;
            }



            /* =================================
               LOGIN SUCCESS
            ================================== */

            loginMessage.textContent =
                "Login successful! Welcome back, " +
                user.fullName +
                ".";

            loginMessage.classList.add("success");



            /* Save login status */

            localStorage.setItem(
                "careerGuideLoggedIn",
                "true"
            );



            /* =================================
               REMEMBER ME
            ================================== */

            if (rememberMe.checked) {

                localStorage.setItem(
                    "careerGuideRemember",
                    "true"
                );

            } else {

                localStorage.removeItem(
                    "careerGuideRemember"
                );

            }



            /* =================================
               REDIRECT TO HOME
            ================================== */

            setTimeout(
                function () {

                    window.location.href =
                        "./index.html";

                },
                1200
            );

        }
    );



    /* =================================
       REMEMBERED EMAIL
    ================================== */

    const savedRemember =
        localStorage.getItem(
            "careerGuideRemember"
        );


    if (savedRemember === "true") {

        const savedAccount =
            localStorage.getItem(
                "careerGuideUser"
            );


        if (savedAccount) {

            try {

                const user =
                    JSON.parse(savedAccount);


                email.value =
                    user.email || "";


                rememberMe.checked =
                    true;

            } catch (error) {

                console.log(
                    "Unable to load remembered account."
                );

            }

        }

    }



    console.log(
        "CareerGuide AI Login JavaScript Loaded Successfully"
    );

});