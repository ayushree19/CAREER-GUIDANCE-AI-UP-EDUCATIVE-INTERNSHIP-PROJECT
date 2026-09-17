/* =========================================
   CAREERGUIDE AI - ROADMAP JS
   PART 1
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const STORAGE_KEY = "careerGuideCustomRoadmap";

    const careerGoal = document.getElementById("careerGoal");
    const currentLevel = document.getElementById("currentLevel");
    const roadmapDuration = document.getElementById("roadmapDuration");
    const roadmapGoal = document.getElementById("roadmapGoal");

    const createRoadmapBtn =
        document.getElementById("createRoadmapBtn");

    const resetRoadmapBtn =
        document.getElementById("resetRoadmapBtn");

    const myRoadmapContainer =
        document.getElementById("myRoadmapContainer");

    const myRoadmapTitle =
        document.getElementById("myRoadmapTitle");

    const myRoadmapDescription =
        document.getElementById("myRoadmapDescription");

    const progressPercentage =
        document.getElementById("progressPercentage");

    const progressFill =
        document.getElementById("progressFill");

    const displayCareer =
        document.getElementById("displayCareer");

    const displayLevel =
        document.getElementById("displayLevel");

    const displayDuration =
        document.getElementById("displayDuration");

    const milestoneTitle =
        document.getElementById("milestoneTitle");

    const milestoneDescription =
        document.getElementById("milestoneDescription");

    const addMilestoneBtn =
        document.getElementById("addMilestoneBtn");

    const milestonesList =
        document.getElementById("milestonesList");

    const milestoneEmpty =
        document.getElementById("milestoneEmpty");

    const clearCustomRoadmapBtn =
        document.getElementById("clearCustomRoadmapBtn");


    /* =========================================
       ROADMAP DATA
    ========================================= */

    let roadmapData = {
        created: false,
        career: "",
        level: "",
        duration: "",
        goal: "",
        milestones: []
    };


    /* =========================================
       AUTOMATIC MILESTONES
    ========================================= */

    function getAutomaticMilestones(career) {

        const data = {

            "Software Development": [
                ["Learn Programming Basics",
                 "Learn variables, conditions, loops and functions."],

                ["Learn Data Structures",
                 "Understand arrays, strings, stacks and queues."],

                ["Practice Problem Solving",
                 "Solve programming and logic problems."],

                ["Learn Git & GitHub",
                 "Learn version control and project management."],

                ["Build a Software Project",
                 "Create a practical software project."],

                ["Prepare for Internship",
                 "Prepare your resume, portfolio and interviews."]
            ],

            "Web Development": [
                ["Learn HTML",
                 "Learn webpage structure, forms and semantic HTML."],

                ["Learn CSS",
                 "Learn styling, Flexbox, Grid and responsive design."],

                ["Learn JavaScript",
                 "Learn variables, functions, arrays, objects and DOM."],

                ["Learn Git & GitHub",
                 "Learn version control and project management."],

                ["Build a Web Project",
                 "Create a complete responsive website."],

                ["Create Portfolio",
                 "Show your skills and projects."]
            ],

            "Data Science": [
                ["Learn Python Basics",
                 "Learn variables, loops, functions and data structures."],

                ["Learn SQL",
                 "Learn databases and SQL queries."],

                ["Learn Statistics",
                 "Understand basic statistics for data analysis."],

                ["Learn NumPy & Pandas",
                 "Learn data handling using Python libraries."],

                ["Learn Data Visualization",
                 "Create charts and visualize datasets."],

                ["Build a Data Project",
                 "Analyze a real-world dataset."]
            ],

            "Artificial Intelligence": [
                ["Learn Python",
                 "Build a strong Python foundation."],

                ["Learn Mathematics",
                 "Learn basic statistics, probability and linear algebra."],

                ["Learn Machine Learning",
                 "Understand basic machine learning concepts."],

                ["Practice With Datasets",
                 "Work with datasets and basic models."],

                ["Build an AI Project",
                 "Create a beginner-friendly AI project."],

                ["Prepare AI Portfolio",
                 "Document your AI projects."]
            ],

            "Cyber Security": [
                ["Learn Computer Basics",
                 "Understand operating systems and computer fundamentals."],

                ["Learn Networking",
                 "Understand IP, DNS, HTTP and networking."],

                ["Learn Linux",
                 "Practice essential Linux commands."],

                ["Learn Security Basics",
                 "Understand common security concepts."],

                ["Practice Security Labs",
                 "Practice concepts in safe educational environments."],

                ["Build Security Portfolio",
                 "Document your learning and projects."]
            ],

            "App Development": [
                ["Learn Programming Basics",
                 "Build a strong programming foundation."],

                ["Learn App Development",
                 "Understand mobile application structure."],

                ["Learn UI Development",
                 "Create clean mobile interfaces."],

                ["Learn APIs & Data",
                 "Understand APIs and application data."],

                ["Build a Mobile App",
                 "Create a practical mobile application."],

                ["Build App Portfolio",
                 "Document your app projects."]
            ],

            "UI/UX Design": [
                ["Learn Design Fundamentals",
                 "Learn color, typography, spacing and hierarchy."],

                ["Learn User Research",
                 "Understand users and their problems."],

                ["Create Wireframes",
                 "Practice website and app wireframes."],

                ["Learn Prototyping",
                 "Create interactive designs."],

                ["Build a Design Project",
                 "Create a practical UI/UX case study."],

                ["Create Design Portfolio",
                 "Present your designs and case studies."]
            ],

            "Cloud Computing": [
                ["Learn Cloud Basics",
                 "Understand cloud computing concepts."],

                ["Learn Linux Basics",
                 "Practice essential Linux commands."],

                ["Learn Cloud Services",
                 "Understand compute, storage and networking."],

                ["Learn Cloud Security",
                 "Understand basic cloud security."],

                ["Deploy a Project",
                 "Deploy a simple project to the cloud."],

                ["Build Cloud Portfolio",
                 "Document your cloud projects."]
            ],

            "Business & Management": [
                ["Learn Business Fundamentals",
                 "Understand basic business concepts."],

                ["Improve Communication",
                 "Develop professional communication skills."],

                ["Learn Marketing Basics",
                 "Understand customers, branding and marketing."],

                ["Learn Financial Basics",
                 "Understand budgeting, revenue and costs."],

                ["Create a Business Plan",
                 "Develop a simple business idea and plan."],

                ["Practice Management",
                 "Develop planning and teamwork skills."]
            ]
        };


        const selected =
            data[career] || [];


        return selected.map(function (item, index) {

            return {
                id: Date.now() + index,
                title: item[0],
                description: item[1],
                completed: false
            };

        });

    }


    /* =========================================
       SAVE
    ========================================= */

    function saveRoadmap() {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(roadmapData)
        );

    }


    /* =========================================
       LOAD
    ========================================= */

    function loadRoadmap() {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return;
        }

        try {

            roadmapData =
                JSON.parse(saved);

            if (roadmapData.created) {
                displayRoadmap();
            }

        } catch (error) {

            console.log(
                "Roadmap loading error:",
                error
            );

        }

    }


    /* =========================================
       DEFAULT GOALS
    ========================================= */

    function getDefaultGoal(career) {

        const goals = {

            "Software Development":
                "I want to learn programming and build software projects.",

            "Web Development":
                "I want to learn web development and build modern websites.",

            "Data Science":
                "I want to learn Python, SQL and data analysis.",

            "Artificial Intelligence":
                "I want to learn AI and machine learning.",

            "Cyber Security":
                "I want to learn cyber security and networking.",

            "App Development":
                "I want to learn app development and build mobile apps.",

            "UI/UX Design":
                "I want to learn UI/UX design and create professional designs.",

            "Cloud Computing":
                "I want to learn cloud technologies and deployment.",

            "Business & Management":
                "I want to develop business and management skills."
        };


        return goals[career] ||
            "I want to develop skills for my selected career.";

    }
    /* =========================================
       CREATE ROADMAP
    ========================================= */

    if (createRoadmapBtn) {

        createRoadmapBtn.addEventListener(
            "click",
            function () {

                const career =
                    careerGoal.value.trim();

                const level =
                    currentLevel.value.trim();

                const duration =
                    roadmapDuration.value.trim();

                const goal =
                    roadmapGoal.value.trim();


                /* CAREER VALIDATION */

                if (!career) {

                    alert(
                        "Please select your career goal."
                    );

                    careerGoal.focus();

                    return;
                }


                /* LEVEL VALIDATION */

                if (!level) {

                    alert(
                        "Please select your current level."
                    );

                    currentLevel.focus();

                    return;
                }


                /* DURATION VALIDATION */

                if (!duration) {

                    alert(
                        "Please select roadmap duration."
                    );

                    roadmapDuration.focus();

                    return;
                }


                /* OPTIONAL GOAL */

                const finalGoal =
                    goal || getDefaultGoal(career);


                /* =====================================
                   CHECK OLD / USER MILESTONES
                ===================================== */

                let milestones =
                    roadmapData.milestones || [];


                /*
                   Agar user ne pehle se milestone
                   add kiya hai, usko rakhenge.

                   Agar ek bhi milestone nahi hai,
                   automatic milestones banenge.
                */

                if (milestones.length === 0) {

                    milestones =
                        getAutomaticMilestones(career);

                }


                /* =====================================
                   CREATE ROADMAP DATA
                ===================================== */

                roadmapData = {

                    created: true,

                    career: career,

                    level: level,

                    duration: duration,

                    goal: finalGoal,

                    milestones: milestones

                };


                saveRoadmap();

                displayRoadmap();


                /* SCROLL */

                if (myRoadmapContainer) {

                    myRoadmapContainer.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }


    /* =========================================
       DISPLAY ROADMAP
    ========================================= */

    function displayRoadmap() {

        if (!myRoadmapContainer) {
            return;
        }


        myRoadmapContainer.style.display =
            "block";


        if (myRoadmapTitle) {

            myRoadmapTitle.textContent =
                roadmapData.career +
                " Roadmap";

        }


        if (myRoadmapDescription) {

            myRoadmapDescription.textContent =
                roadmapData.goal;

        }


        if (displayCareer) {

            displayCareer.textContent =
                roadmapData.career;

        }


        if (displayLevel) {

            displayLevel.textContent =
                roadmapData.level;

        }


        if (displayDuration) {

            displayDuration.textContent =
                roadmapData.duration;

        }


        renderMilestones();

        updateProgress();

    }


    /* =========================================
       ADD MANUAL MILESTONE
    ========================================= */

    if (addMilestoneBtn) {

        addMilestoneBtn.addEventListener(
            "click",
            function () {

                const title =
                    milestoneTitle.value.trim();

                const description =
                    milestoneDescription.value.trim();


                if (!roadmapData.created) {

                    alert(
                        "Please create your roadmap first."
                    );

                    return;
                }


                if (!title) {

                    alert(
                        "Please enter a milestone title."
                    );

                    milestoneTitle.focus();

                    return;
                }


                const newMilestone = {

                    id:
                        Date.now(),

                    title:
                        title,

                    description:
                        description ||
                        "Learning milestone",

                    completed:
                        false

                };


                roadmapData.milestones.push(
                    newMilestone
                );


                saveRoadmap();

                renderMilestones();

                updateProgress();


                milestoneTitle.value = "";

                milestoneDescription.value = "";

                milestoneTitle.focus();

            }
        );

    }


    /* =========================================
       RENDER MILESTONES
    ========================================= */

    function renderMilestones() {

        if (!milestonesList) {
            return;
        }


        milestonesList.innerHTML = "";


        const milestones =
            roadmapData.milestones || [];


        if (milestones.length === 0) {

            if (milestoneEmpty) {

                milestoneEmpty.style.display =
                    "block";

            }

            return;
        }


        if (milestoneEmpty) {

            milestoneEmpty.style.display =
                "none";

        }


        milestones.forEach(
            function (milestone, index) {

                const item =
                    document.createElement("div");

                item.className =
                    "milestone-item";


                if (milestone.completed) {

                    item.classList.add(
                        "completed"
                    );

                }


                /* CHECKBOX */

                const checkbox =
                    document.createElement("input");

                checkbox.type =
                    "checkbox";

                checkbox.className =
                    "milestone-check";

                checkbox.checked =
                    milestone.completed;


                checkbox.addEventListener(
                    "change",
                    function () {

                        roadmapData
                            .milestones[index]
                            .completed =
                            checkbox.checked;

                        saveRoadmap();

                        renderMilestones();

                        updateProgress();

                    }
                );


                /* CONTENT */

                const content =
                    document.createElement("div");

                content.className =
                    "milestone-content";


                const title =
                    document.createElement("h4");

                title.textContent =
                    milestone.title;


                const description =
                    document.createElement("p");

                description.textContent =
                    milestone.description;


                content.appendChild(title);

                content.appendChild(
                    description
                );


                /* ACTIONS */

                const actions =
                    document.createElement("div");

                actions.className =
                    "milestone-actions";


                /* EDIT */

                const editButton =
                    document.createElement("button");

                editButton.type =
                    "button";

                editButton.className =
                    "milestone-action-btn";

                editButton.title =
                    "Edit milestone";

                editButton.innerHTML =
                    '<i class="fa-solid fa-pen"></i>';


                editButton.addEventListener(
                    "click",
                    function () {

                        editMilestone(index);

                    }
                );


                /* DELETE */

                const deleteButton =
                    document.createElement("button");

                deleteButton.type =
                    "button";

                deleteButton.className =
                    "milestone-action-btn";

                deleteButton.title =
                    "Delete milestone";

                deleteButton.innerHTML =
                    '<i class="fa-solid fa-trash"></i>';


                deleteButton.addEventListener(
                    "click",
                    function () {

                        deleteMilestone(index);

                    }
                );


                actions.appendChild(
                    editButton
                );

                actions.appendChild(
                    deleteButton
                );


                item.appendChild(
                    checkbox
                );

                item.appendChild(
                    content
                );

                item.appendChild(
                    actions
                );


                milestonesList.appendChild(
                    item
                );

            }
        );

    }


    /* =========================================
       EDIT MILESTONE
    ========================================= */

    function editMilestone(index) {

        const milestone =
            roadmapData.milestones[index];


        if (!milestone) {
            return;
        }


        const newTitle =
            prompt(
                "Enter milestone title:",
                milestone.title
            );


        if (newTitle === null) {
            return;
        }


        const cleanTitle =
            newTitle.trim();


        if (!cleanTitle) {

            alert(
                "Milestone title cannot be empty."
            );

            return;
        }


        const newDescription =
            prompt(
                "Enter milestone description:",
                milestone.description
            );


        if (newDescription === null) {
            return;
        }


        roadmapData.milestones[index].title =
            cleanTitle;


        roadmapData.milestones[index].description =
            newDescription.trim() ||
            "Learning milestone";


        saveRoadmap();

        renderMilestones();

        updateProgress();

    }


    /* =========================================
       DELETE MILESTONE
    ========================================= */

    function deleteMilestone(index) {

        const confirmDelete =
            confirm(
                "Delete this milestone?"
            );


        if (!confirmDelete) {
            return;
        }


        roadmapData.milestones.splice(
            index,
            1
        );


        saveRoadmap();

        renderMilestones();

        updateProgress();

    }


    /* =========================================
       UPDATE PROGRESS
    ========================================= */

    function updateProgress() {

        const milestones =
            roadmapData.milestones || [];


        if (milestones.length === 0) {

            if (progressPercentage) {

                progressPercentage.textContent =
                    "0%";

            }

            if (progressFill) {

                progressFill.style.width =
                    "0%";

            }

            return;
        }


        const completed =
            milestones.filter(
                function (milestone) {

                    return milestone.completed;

                }
            ).length;


        const percentage =
            Math.round(
                (completed / milestones.length) *
                100
            );


        if (progressPercentage) {

            progressPercentage.textContent =
                percentage + "%";

        }


        if (progressFill) {

            progressFill.style.width =
                percentage + "%";

        }

    }


    /* =========================================
       RESET FORM
    ========================================= */

    if (resetRoadmapBtn) {

        resetRoadmapBtn.addEventListener(
            "click",
            function () {

                careerGoal.value = "";

                currentLevel.value = "";

                roadmapDuration.value = "";

                roadmapGoal.value = "";

            }
        );

    }


    /* =========================================
       CLEAR ROADMAP
    ========================================= */

    if (clearCustomRoadmapBtn) {

        clearCustomRoadmapBtn.addEventListener(
            "click",
            function () {

                const confirmClear =
                    confirm(
                        "Are you sure you want to clear your roadmap?"
                    );


                if (!confirmClear) {
                    return;
                }


                roadmapData = {

                    created: false,

                    career: "",

                    level: "",

                    duration: "",

                    goal: "",

                    milestones: []

                };


                localStorage.removeItem(
                    STORAGE_KEY
                );


                myRoadmapContainer.style.display =
                    "none";


                renderMilestones();

                updateProgress();


                careerGoal.value = "";

                currentLevel.value = "";

                roadmapDuration.value = "";

                roadmapGoal.value = "";

                milestoneTitle.value = "";

                milestoneDescription.value = "";

            }
        );

    }


    /* =========================================
       INITIAL LOAD
    ========================================= */

    loadRoadmap();

});