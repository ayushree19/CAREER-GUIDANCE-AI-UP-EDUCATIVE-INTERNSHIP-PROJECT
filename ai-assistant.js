document.addEventListener("DOMContentLoaded", function () {

    console.log("CareerGuide AI JS Loaded");

    const chatBody = document.getElementById("chatBody");
    const userInput = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");
    const clearChat = document.getElementById("clearChat");
    const startChat = document.getElementById("startChat");
    const typingIndicator = document.getElementById("typingIndicator");
    const quickButtons = document.querySelectorAll(".quick-btn");

    // Check required elements
    if (!chatBody || !userInput || !sendButton) {
        console.error("CareerGuide AI: Required HTML elements not found.");
        return;
    }

    // Escape HTML safely
    function escapeHTML(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }

    // Add message
    function addMessage(type, content) {

        const message = document.createElement("div");

        message.className =
            type === "user"
                ? "message user-message"
                : "message ai-message";

        const avatar = document.createElement("div");
        avatar.className = "message-avatar";

        avatar.innerHTML =
            type === "user"
                ? '<i class="fa-solid fa-user"></i>'
                : '<i class="fa-solid fa-robot"></i>';

        const contentWrapper = document.createElement("div");
        contentWrapper.className = "message-content";

        const name = document.createElement("div");
        name.className = "message-name";
        name.textContent =
            type === "user" ? "You" : "CareerGuide AI";

        const bubble = document.createElement("div");
        bubble.className = "message-bubble";
        bubble.innerHTML = content;

        contentWrapper.appendChild(name);
        contentWrapper.appendChild(bubble);

        message.appendChild(avatar);
        message.appendChild(contentWrapper);

        chatBody.appendChild(message);

        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Show typing indicator
    function showTyping() {
        if (typingIndicator) {
            typingIndicator.classList.add("active");
        }

        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Hide typing indicator
    function hideTyping() {
        if (typingIndicator) {
            typingIndicator.classList.remove("active");
        }
    }

    // Send message
    async function sendMessage() {

        const question = userInput.value.trim();

        console.log("Send button / Enter pressed:", question);

        if (question === "") {
            return;
        }

        // Show user message
        addMessage(
            "user",
            `<p>${escapeHTML(question)}</p>`
        );

        // Clear input
        userInput.value = "";
        userInput.style.height = "auto";

        // Disable button
        sendButton.disabled = true;

        // Show typing
        showTyping();

        try {

            console.log("Sending request to backend...");

            const response = await fetch("https://career-guid-ai.onrender.com/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: question
                })
            });

            const data = await response.json();

            console.log("Backend response:", data);

            hideTyping();

            if (!response.ok) {
                throw new Error(
                    data.error || "Something went wrong."
                );
            }

            const aiReply = data.reply;

            if (!aiReply) {
                throw new Error("AI did not return a response.");
            }

            addMessage(
                "ai",
                `<p>${escapeHTML(aiReply).replace(/\n/g, "<br>")}</p>`
            );

        } catch (error) {

            console.error("CareerGuide AI Error:", error);

            hideTyping();

            addMessage(
                "ai",
                `
                <p>
                    ❌ Sorry, I could not get a response.
                </p>
                <p>
                    <strong>Error:</strong>
                    ${escapeHTML(error.message)}
                </p>
                `
            );

        } finally {

            sendButton.disabled = false;
            userInput.focus();
        }
    }

    // ==========================
    // SEND BUTTON
    // ==========================

    sendButton.addEventListener("click", function () {
        sendMessage();
    });

    // ==========================
    // ENTER KEY
    // ==========================

    userInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter" && !event.shiftKey) {

            event.preventDefault();

            console.log("ENTER KEY DETECTED");

            sendMessage();
        }
    });

    // ==========================
    // TEXTAREA AUTO HEIGHT
    // ==========================

    userInput.addEventListener("input", function () {

        this.style.height = "auto";

        this.style.height =
            Math.min(this.scrollHeight, 100) + "px";
    });

    // ==========================
    // QUICK QUESTIONS
    // ==========================

    quickButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const question =
                this.getAttribute("data-question");

            if (question) {

                userInput.value = question;

                sendMessage();
            }
        });
    });

    // ==========================
    // CLEAR CHAT
    // ==========================

    if (clearChat) {

        clearChat.addEventListener("click", function () {

            chatBody.innerHTML = "";

            addMessage(
                "ai",
                `
                <p>
                    👋 Hello! I'm
                    <strong>CareerGuide AI</strong>.
                </p>

                <p>
                    Your conversation has been cleared.
                    How can I help you?
                </p>
                `
            );
        });
    }

    // ==========================
    // START CHAT
    // ==========================

    if (startChat) {

        startChat.addEventListener("click", function () {

            userInput.focus();

            const chatSection =
                document.querySelector(".chat-section");

            if (chatSection) {

                chatSection.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }
        });
    }

    console.log(
        "CareerGuide AI JavaScript Loaded Successfully!"
    );

});