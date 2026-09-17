document.addEventListener("DOMContentLoaded", function () {

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");

    if (!contactForm || !formMessage) {
        return;
    }


    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("contactName")
                    .value.trim();

            const email =
                document.getElementById("contactEmail")
                    .value.trim();

            const subject =
                document.getElementById("contactSubject")
                    .value.trim();

            const message =
                document.getElementById("contactMessage")
                    .value.trim();


            /* NAME */

            if (name.length < 2) {

                formMessage.textContent =
                    "Please enter your name.";

                formMessage.className =
                    "form-message error";

                return;
            }


            /* EMAIL */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                formMessage.textContent =
                    "Please enter a valid email address.";

                formMessage.className =
                    "form-message error";

                return;
            }


            /* SUBJECT */

            if (subject.length < 3) {

                formMessage.textContent =
                    "Please enter a subject.";

                formMessage.className =
                    "form-message error";

                return;
            }


            /* MESSAGE */

            if (message.length < 5) {

                formMessage.textContent =
                    "Please write a message.";

                formMessage.className =
                    "form-message error";

                return;
            }


            /* SUCCESS */

            formMessage.textContent =
                "Message sent successfully! We'll get back to you soon.";

            formMessage.className =
                "form-message success";


            /* RESET FORM */

            contactForm.reset();

        }
    );

});