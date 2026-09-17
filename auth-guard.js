/* =========================================
   CAREERGUIDE AI - AUTH GUARD
   PART 1
========================================= */

(function () {

    const isLoggedIn =
        localStorage.getItem("careerGuideLoggedIn") === "true";


    /* =========================================
       PROTECTED PAGES
    ========================================= */

    const protectedPages = [
        "about.html",
        "careers.html",
        "career-details.html",
        "skills.html",
        "roadmap.html",
        "contact.html",
        "ai-assistant.html"
    ];


    /* =========================================
       CURRENT PAGE
    ========================================= */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    /* =========================================
       LOGIN CHECK
    ========================================= */

    if (
        protectedPages.includes(currentPage) &&
        !isLoggedIn
    ) {

        window.location.replace(
            "login.html"
        );

    }

})();
/* =========================================
   CAREERGUIDE AI - AUTH GUARD
   PART 2
========================================= */


/* =========================================
   LOGOUT FUNCTION
========================================= */

function logoutUser() {

    localStorage.removeItem(
        "careerGuideLoggedIn"
    );

    localStorage.removeItem(
        "careerGuideUser"
    );

    localStorage.removeItem(
        "careerGuideRememberEmail"
    );


    window.location.replace(
        "login.html"
    );

}


/* =========================================
   ADD LOGOUT BUTTON SUPPORT
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const logoutButtons =
            document.querySelectorAll(
                ".logout-btn"
            );


        logoutButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        logoutUser();

                    }
                );

            }
        );

    }
);
/* =========================================
   LOGIN / LOGOUT SIDEBAR LINK
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const authLink =
            document.getElementById("authLink");


        if (!authLink) {
            return;
        }


        const isLoggedIn =
            localStorage.getItem(
                "careerGuideLoggedIn"
            ) === "true";


        if (isLoggedIn) {

            authLink.href = "#";

            authLink.innerHTML =
                '<i class="fa-solid fa-right-from-bracket"></i>' +
                '<span>Logout</span>';


            authLink.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    logoutUser();

                }
            );

        }

    }
);
/* =====================================================
   CAREERGUIDE AI - AI ASSISTANT
   PART 3/4
   ===================================================== */


/* =====================================================
   MAIN RESPONSE GENERATOR
   ===================================================== */

function generateResponse(message) {

    const text = normalizeText(message);


    /* ---------------------------------------------
       EMPTY MESSAGE
    --------------------------------------------- */

    if (!text) {

        return `
            Please type a question so I can help you.
            <br><br>
            You can ask me about careers, skills,
            roadmaps, AI, Python, Data Science
            or Web Development.
        `;

    }


    /* ---------------------------------------------
       GREETINGS
    --------------------------------------------- */

    const greetings = [
        "hi",
        "hello",
        "hey",
        "hii",
        "helo",
        "namaste",
        "good morning",
        "good afternoon",
        "good evening"
    ];


    if (
        greetings.some(greeting =>
            text === greeting ||
            text.startsWith(greeting + " ")
        )
    ) {

        return `
            Hello! 👋<br><br>

            I'm <strong>CareerGuide AI</strong>.
            I'm here to help you explore careers,
            skills and learning roadmaps.<br><br>

            What would you like to know?
        `;

    }


    /* ---------------------------------------------
       THANK YOU
    --------------------------------------------- */

    if (
        text.includes("thank you") ||
        text.includes("thanks") ||
        text === "thank"
    ) {

        return `
            You're welcome! 😊<br><br>

            Keep learning and exploring.
            If you have another career question,
            feel free to ask me.
        `;

    }


    /* ---------------------------------------------
       HELP
    --------------------------------------------- */

    if (
        text === "help" ||
        text.includes("what can you do") ||
        text.includes("how can you help") ||
        text.includes("help me")
    ) {

        return `
            <strong>I can help you with:</strong>

            <ul>
                <li>Career exploration</li>
                <li>Required skills</li>
                <li>Career roadmaps</li>
                <li>AI and Machine Learning</li>
                <li>Python</li>
                <li>Data Science</li>
                <li>Web Development</li>
                <li>Internship preparation</li>
            </ul>

            Ask me any question related to
            your career journey.
        `;

    }


    /* ---------------------------------------------
       PROJECT QUESTIONS
    --------------------------------------------- */

    const projectResponse = getProjectResponse(text);

    if (projectResponse) {

        return projectResponse;

    }


    /* ---------------------------------------------
       CAREER LIST
    --------------------------------------------- */

    if (
        text.includes("career options") ||
        text.includes("career choices") ||
        text.includes("which careers") ||
        text.includes("career list") ||
        text.includes("different careers")
    ) {

        return `
            <strong>Some technology career options:</strong>

            <ul>
                <li>AI Engineer</li>
                <li>Software Developer</li>
                <li>Web Developer</li>
                <li>Data Scientist</li>
                <li>Cybersecurity Professional</li>
            </ul>

            Each career requires a different
            combination of skills and learning.
        `;

    }


    /* ---------------------------------------------
       CAREER DETECTION
    --------------------------------------------- */

    const detectedCareer = detectCareer(text);


    if (detectedCareer) {

        const career = careerDatabase[detectedCareer];


        /* Skills question */

        if (
            text.includes("skill") ||
            text.includes("learn") ||
            text.includes("required")
        ) {

            let response = `
                <strong>Skills required for
                ${career.title}:</strong>

                <ul>
            `;


            career.skills.forEach(skill => {

                response += `<li>${skill}</li>`;

            });


            response += `
                </ul>

                Start with the fundamentals and
                gradually build practical projects.
            `;


            return response;

        }


        /* Roadmap question */

        if (
            text.includes("roadmap") ||
            text.includes("steps") ||
            text.includes("how to become") ||
            text.includes("how can i become") ||
            text.includes("path")
        ) {

            let response = `
                <strong>${career.title} Roadmap:</strong>

                <ol>
            `;


            career.roadmap.forEach(step => {

                response += `<li>${step}</li>`;

            });


            response += `
                </ol>

                Focus on one step at a time and
                build projects while learning.
            `;


            return response;

        }


        /* General career question */

        return getCareerResponse(detectedCareer);

    }


    /* ---------------------------------------------
       KNOWLEDGE BASE QUESTIONS
    --------------------------------------------- */

    const knowledgeResponse = findKnowledgeResponse(text);

    if (knowledgeResponse) {

        return knowledgeResponse;

    }


    /* ---------------------------------------------
       CAREER CONFUSION
    --------------------------------------------- */

    if (
        text.includes("confused") ||
        text.includes("which career should i choose") ||
        text.includes("which career is suitable") ||
        text.includes("what career is suitable") ||
        text.includes("career choose") ||
        text.includes("career kaise choose")
    ) {

        return `
            It's completely normal to feel confused
            about your career. 😊<br><br>

            Start by thinking about:

            <ul>
                <li>What subjects or topics you enjoy</li>
                <li>What skills you already have</li>
                <li>What kind of work interests you</li>
                <li>Which skills you are willing to learn</li>
            </ul>

            For technology careers, you can explore
            Software Development, Web Development,
            AI, Data Science and Cybersecurity.
        `;

    }


    /* ---------------------------------------------
       STUDENT / BEGINNER QUESTIONS
    --------------------------------------------- */

    if (
        text.includes("i am a beginner") ||
        text.includes("i am student") ||
        text.includes("i am a student") ||
        text.includes("beginner") ||
        text.includes("where should i start")
    ) {

        return `
            <strong>Beginner Learning Advice:</strong><br><br>

            Start with one technology instead of
            trying to learn everything at once.

            <ol>
                <li>Choose one career direction</li>
                <li>Learn the fundamentals</li>
                <li>Practice regularly</li>
                <li>Build small projects</li>
                <li>Gradually move to advanced topics</li>
            </ol>

            Consistency is more important than
            trying to learn everything quickly.
        `;

    }


    /* ---------------------------------------------
       JOB / INTERVIEW QUESTIONS
    --------------------------------------------- */

    if (
        text.includes("job preparation") ||
        text.includes("prepare for job") ||
        text.includes("interview preparation") ||
        text.includes("how to prepare for job")
    ) {

        return `
            <strong>Job Preparation:</strong>

            <ul>
                <li>Strengthen your fundamentals</li>
                <li>Practice problem solving</li>
                <li>Build practical projects</li>
                <li>Learn Git and GitHub</li>
                <li>Create a clear resume</li>
                <li>Practice interview questions</li>
            </ul>

            Try to understand the concepts instead
            of only memorizing answers.
        `;

    }


    /* ---------------------------------------------
       FALLBACK RESPONSE
    --------------------------------------------- */

    return `
        I'm still learning how to answer that question. 🤖

        <br><br>

        Try asking something like:

        <ul>
            <li>What skills do I need for AI Engineer?</li>
            <li>Give me a Web Developer roadmap.</li>
            <li>What is Machine Learning?</li>
            <li>How should I learn Python?</li>
            <li>What does CareerGuide AI do?</li>
            <li>Which career options are available?</li>
        </ul>
    `;

}
/* =====================================================
   CAREERGUIDE AI - AI ASSISTANT
   PART 4/4
   ===================================================== */


/* =====================================================
   ADD USER MESSAGE
   ===================================================== */

function addUserMessage(message) {

    const messageDiv = document.createElement("div");

    messageDiv.className = "message user-message";

    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${escapeHTML(message)}</p>
        </div>

        <div class="message-avatar">
            <i class="fa-solid fa-user"></i>
        </div>
    `;

    chatBody.appendChild(messageDiv);

    scrollToBottom();
}


/* =====================================================
   ADD AI MESSAGE
   ===================================================== */

function addAIMessage(message) {

    const messageDiv = document.createElement("div");

    messageDiv.className = "message ai-message";

    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fa-solid fa-robot"></i>
        </div>

        <div class="message-content">
            <p>${message}</p>
        </div>
    `;

    chatBody.appendChild(messageDiv);

    scrollToBottom();
}


/* =====================================================
   ESCAPE HTML
   ===================================================== */

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =====================================================
   SCROLL CHAT TO BOTTOM
   ===================================================== */

function scrollToBottom() {

    if (!chatBody) return;

    chatBody.scrollTop = chatBody.scrollHeight;

}


/* =====================================================
   SHOW TYPING INDICATOR
   ===================================================== */

function showTyping() {

    if (!typingIndicator) return;

    typingIndicator.style.display = "flex";

    scrollToBottom();

}


/* =====================================================
   HIDE TYPING INDICATOR
   ===================================================== */

function hideTyping() {

    if (!typingIndicator) return;

    typingIndicator.style.display = "none";

}


/* =====================================================
   SEND MESSAGE
   ===================================================== */

function sendMessage() {

    const message = userInput.value.trim();

    if (!message) return;


    /* Add user message */

    addUserMessage(message);


    /* Clear input */

    userInput.value = "";

    userInput.style.height = "auto";


    /* Show typing */

    showTyping();


    /*
       Small delay makes the assistant
       feel more natural.
    */

    setTimeout(() => {

        const response = generateResponse(message);

        hideTyping();

        addAIMessage(response);

    }, 600);

}


/* =====================================================
   SEND BUTTON
   ===================================================== */

if (sendButton) {

    sendButton.addEventListener("click", sendMessage);

}


/* =====================================================
   ENTER KEY
   ===================================================== */

if (userInput) {

    userInput.addEventListener("keydown", function(event) {

        /*
           Enter = Send
           Shift + Enter = New Line
        */

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    });


    /* Auto resize textarea */

    userInput.addEventListener("input", function() {

        this.style.height = "auto";

        this.style.height =
            Math.min(this.scrollHeight, 150) + "px";

    });

}


/* =====================================================
   CLEAR CHAT
   ===================================================== */

if (clearChat) {

    clearChat.addEventListener("click", function() {

        /*
           Remove all messages
        */

        chatBody.innerHTML = "";


        /*
           Add welcome message again
        */

        addAIMessage(`
            Hello! 👋<br><br>

            I'm <strong>CareerGuide AI</strong>.
            I'm here to help you explore careers,
            skills and learning roadmaps.<br><br>

            What would you like to know?
        `);


        /*
           Add quick questions again
        */

        addQuickQuestions();

    });

}


/* =====================================================
   QUICK QUESTIONS
   ===================================================== */

function addQuickQuestions() {

    const quickQuestions = document.createElement("div");

    quickQuestions.className = "quick-questions";

    quickQuestions.innerHTML = `

        <p class="quick-title">
            Try asking:
        </p>

        <div class="quick-buttons">

            <button class="quick-btn">
                What career is suitable for me?
            </button>

            <button class="quick-btn">
                What skills do I need to become an AI engineer?
            </button>

            <button class="quick-btn">
                Give me a roadmap for becoming a software engineer.
            </button>

            <button class="quick-btn">
                What does CareerGuide AI do?
            </button>

        </div>

    `;


    chatBody.appendChild(quickQuestions);


    /*
       Add click event to every
       quick question button.
    */

    const buttons =
        quickQuestions.querySelectorAll(".quick-btn");


    buttons.forEach(button => {

        button.addEventListener("click", function() {

            userInput.value = this.textContent.trim();

            sendMessage();

        });

    });


    scrollToBottom();

}


/* =====================================================
   QUICK QUESTION BUTTONS
   ===================================================== */

document.addEventListener("click", function(event) {

    if (
        event.target.classList.contains("quick-btn")
    ) {

        const question =
            event.target.textContent.trim();

        if (!question) return;

        userInput.value = question;

        sendMessage();

    }

});


/* =====================================================
   START CHATTING BUTTON
   ===================================================== */

if (startChat) {

    startChat.addEventListener("click", function() {

        /*
           Scroll to chat section
        */

        const chatSection =
            document.querySelector(".chat-section");


        if (chatSection) {

            chatSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }


        /*
           Focus input after scrolling
        */

        setTimeout(() => {

            if (userInput) {

                userInput.focus();

            }

        }, 500);

    });

}


/* =====================================================
   INITIAL QUICK QUESTIONS
   ===================================================== */

document.addEventListener("DOMContentLoaded", function() {

    /*
       Quick questions already exist in HTML,
       so we only connect their buttons.
    */

    const quickButtons =
        document.querySelectorAll(".quick-btn");


    quickButtons.forEach(button => {

        button.addEventListener("click", function() {

            const question =
                this.textContent.trim();

            if (!question) return;

            userInput.value = question;

            sendMessage();

        });

    });


    /*
       Hide typing indicator initially
    */

    hideTyping();


    /*
       Scroll chat to bottom
    */

    scrollToBottom();

});


/* =====================================================
   FINAL MESSAGE
   ===================================================== */

console.log(
    "CareerGuide AI Assistant loaded successfully."
);