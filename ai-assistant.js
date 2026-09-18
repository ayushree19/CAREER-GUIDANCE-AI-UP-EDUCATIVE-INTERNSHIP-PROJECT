document.addEventListener("DOMContentLoaded", function () {

    console.log("CareerGuide AI JS Loaded");

    const chatBody = document.getElementById("chatBody");
    const userInput = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");
    const clearChat = document.getElementById("clearChat");
    const startChat = document.getElementById("startChat");
    const typingIndicator = document.getElementById("typingIndicator");
    const quickButtons = document.querySelectorAll(".quick-btn");

    if (!chatBody || !userInput || !sendButton) {
        console.error("CareerGuide AI: Required HTML elements not found.");
        return;
    }

    function escapeHTML(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }

    function addMessage(type, content) {
        const message = document.createElement("div");
        message.className = type === "user" ? "message user-message" : "message ai-message";

        const avatar = document.createElement("div");
        avatar.className = "message-avatar";
        avatar.innerHTML = type === "user" ? '<i class="fa-solid fa-user"></i>' : '<i class="fa-solid fa-robot"></i>';

        const contentWrapper = document.createElement("div");
        contentWrapper.className = "message-content";

        const name = document.createElement("div");
        name.className = "message-name";
        name.textContent = type === "user" ? "You" : "CareerGuide AI";

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

    function showTyping() {
        if (typingIndicator) {
            typingIndicator.classList.add("active");
        }
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function hideTyping() {
        if (typingIndicator) {
            typingIndicator.classList.remove("active");
        }
    }

    async function sendMessage() {
        const question = userInput.value.trim();
        if (question === "") return;

        addMessage("user", `<p>${escapeHTML(question)}</p>`);

        userInput.value = "";
        userInput.style.height = "auto";
        sendButton.disabled = true;
        showTyping();

        try {
           const API_URL = window.location.origin.includes("onrender.com") 
            ? "/api/chat" 
            : "https://career-guide-ai-xfis.onrender.com/api/chat";

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout for Render cold start

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: question }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            const data = await response.json();
            hideTyping();

            if (!response.ok) {
                throw new Error(data.error || "Server returned an error.");
            }

            const aiReply = data.reply;
            if (!aiReply) {
                throw new Error("AI did not return a response.");
            }

            addMessage("ai", `<p>${escapeHTML(aiReply).replace(/\n/g, "<br>")}</p>`);

        } catch (error) {
            console.error("CareerGuide AI Error:", error);
            hideTyping();

            let errText = error.message;
            if (error.name === "AbortError") {
                errText = "Server waking up from sleep. Please try again in 10 seconds.";
            }

            addMessage(
                "ai",
                `<p>❌ Sorry, I could not get a response.</p><p><strong>Status:</strong> ${escapeHTML(errText)}</p>`
            );
        } finally {
            sendButton.disabled = false;
            userInput.focus();
        }
    }

    sendButton.addEventListener("click", sendMessage);

    userInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });

    userInput.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = Math.min(this.scrollHeight, 100) + "px";
    });

    quickButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const question = this.getAttribute("data-question");
            if (question) {
                userInput.value = question;
                sendMessage();
            }
        });
    });

    if (clearChat) {
        clearChat.addEventListener("click", function () {
            chatBody.innerHTML = "";
            addMessage(
                "ai",
                `<p>👋 Hello! I'm <strong>CareerGuide AI</strong>.</p><p>Your conversation has been cleared. How can I help you?</p>`
            );
        });
    }

    if (startChat) {
        startChat.addEventListener("click", function () {
            userInput.focus();
            const chatSection = document.querySelector(".chat-section");
            if (chatSection) {
                chatSection.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        });
    }
});