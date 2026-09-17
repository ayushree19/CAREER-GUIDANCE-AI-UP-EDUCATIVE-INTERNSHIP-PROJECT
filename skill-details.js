/* =========================================
   CAREERGUIDE AI
   SKILL DETAILS JS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const skills = {

        programming: {

            title: "Programming",

            icon: "fa-code",

            description:
                "Learn coding fundamentals, programming logic and problem-solving skills.",

            overview:
                "Programming is the foundation of software development. It teaches you how to solve problems using code and helps you build applications, websites, tools and software.",

            skills: [
                "Programming fundamentals",
                "Variables and data types",
                "Conditions and loops",
                "Functions",
                "Arrays and data structures",
                "Problem solving"
            ],

            technologies: [
                "C",
                "C++",
                "Python",
                "Java",
                "Git & GitHub"
            ],

            careers: [
                "Software Developer",
                "Backend Developer",
                "Application Developer",
                "Systems Developer",
                "Programming Intern"
            ],

            path: [
                [
                    "Learn Programming Basics",
                    "Understand variables, operators, conditions and loops."
                ],
                [
                    "Learn Functions",
                    "Practice reusable functions and modular programming."
                ],
                [
                    "Learn Data Structures",
                    "Understand arrays, strings, stacks and queues."
                ],
                [
                    "Practice Problems",
                    "Solve programming and logical problems regularly."
                ],
                [
                    "Build Projects",
                    "Use your programming skills to create practical projects."
                ]
            ]

        },


        web: {

            title: "Web Development",

            icon: "fa-globe",

            description:
                "Build modern, responsive and interactive websites for real-world projects.",

            overview:
                "Web development focuses on creating websites and web applications. It combines structure, design and programming to build useful experiences for users.",

            skills: [
                "HTML",
                "CSS",
                "JavaScript",
                "Responsive design",
                "DOM manipulation",
                "Basic web accessibility"
            ],

            technologies: [
                "HTML",
                "CSS",
                "JavaScript",
                "Git & GitHub",
                "APIs"
            ],

            careers: [
                "Frontend Developer",
                "Web Developer",
                "Full Stack Developer",
                "Frontend Intern",
                "Web Designer"
            ],

            path: [
                [
                    "Learn HTML",
                    "Create webpage structure using semantic HTML."
                ],
                [
                    "Learn CSS",
                    "Style websites using modern CSS, Flexbox and Grid."
                ],
                [
                    "Learn JavaScript",
                    "Add logic and interactivity to websites."
                ],
                [
                    "Build Projects",
                    "Create responsive websites and web applications."
                ],
                [
                    "Create Portfolio",
                    "Show your projects and skills professionally."
                ]
            ]

        },


        data: {

            title: "Data & Analytics",

            icon: "fa-chart-line",

            description:
                "Analyze data and turn information into meaningful insights and decisions.",

            overview:
                "Data and analytics focuses on collecting, cleaning, analyzing and visualizing data to discover useful patterns and support better decisions.",

            skills: [
                "Data analysis",
                "Statistics",
                "Data cleaning",
                "Data visualization",
                "Problem solving",
                "Basic database concepts"
            ],

            technologies: [
                "Python",
                "SQL",
                "Excel",
                "Pandas",
                "NumPy"
            ],

            careers: [
                "Data Analyst",
                "Business Analyst",
                "Data Associate",
                "Reporting Analyst",
                "Data Intern"
            ],

            path: [
                [
                    "Learn Excel",
                    "Understand spreadsheets, formulas and data organization."
                ],
                [
                    "Learn SQL",
                    "Practice databases and data queries."
                ],
                [
                    "Learn Python",
                    "Use Python for data analysis."
                ],
                [
                    "Learn Visualization",
                    "Create charts and meaningful visual reports."
                ],
                [
                    "Build Data Projects",
                    "Analyze real datasets and present your findings."
                ]
            ]

        },


        ai: {

            title: "AI & Machine Learning",

            icon: "fa-brain",

            description:
                "Explore artificial intelligence and machine learning concepts and applications.",

            overview:
                "Artificial Intelligence and Machine Learning focus on creating systems that can learn from data, recognize patterns and perform intelligent tasks.",

            skills: [
                "Python programming",
                "Mathematics basics",
                "Statistics",
                "Machine learning concepts",
                "Data handling",
                "Problem solving"
            ],

            technologies: [
                "Python",
                "NumPy",
                "Pandas",
                "Scikit-learn",
                "Jupyter"
            ],

            careers: [
                "AI Engineer",
                "Machine Learning Engineer",
                "AI Developer",
                "Data Scientist",
                "AI Intern"
            ],

            path: [
                [
                    "Learn Python",
                    "Build a strong programming foundation."
                ],
                [
                    "Learn Mathematics",
                    "Understand basic statistics, probability and linear algebra."
                ],
                [
                    "Learn Machine Learning",
                    "Understand models, training and evaluation."
                ],
                [
                    "Practice With Data",
                    "Work with datasets and basic ML models."
                ],
                [
                    "Build AI Projects",
                    "Create practical beginner-friendly AI projects."
                ]
            ]

        },


        cyber: {

            title: "Cyber Security",

            icon: "fa-shield-halved",

            description:
                "Learn digital security, networks and information protection fundamentals.",

            overview:
                "Cyber security focuses on protecting computers, networks, applications and information from unauthorized access and security threats.",

            skills: [
                "Computer fundamentals",
                "Networking",
                "Linux basics",
                "Security fundamentals",
                "Problem solving",
                "Security awareness"
            ],

            technologies: [
                "Linux",
                "Networking",
                "Python",
                "Git",
                "Security tools"
            ],

            careers: [
                "Security Analyst",
                "SOC Analyst",
                "Network Security Associate",
                "Cyber Security Intern",
                "Security Engineer"
            ],

            path: [
                [
                    "Learn Computer Basics",
                    "Understand operating systems and computer fundamentals."
                ],
                [
                    "Learn Networking",
                    "Understand IP, DNS, HTTP and basic networking."
                ],
                [
                    "Learn Linux",
                    "Practice essential Linux commands."
                ],
                [
                    "Learn Security Basics",
                    "Understand common security concepts."
                ],
                [
                    "Practice Safe Labs",
                    "Apply concepts in legal educational environments."
                ]
            ]

        },


        app: {

            title: "App Development",

            icon: "fa-mobile-screen",

            description:
                "Learn how to design and develop useful mobile applications.",

            overview:
                "App development involves designing and building applications for mobile devices. It combines programming, user interface design and application logic.",

            skills: [
                "Programming fundamentals",
                "Mobile UI design",
                "Application logic",
                "APIs",
                "Data handling",
                "Debugging"
            ],

            technologies: [
                "Android",
                "Java",
                "Flutter",
                "Dart",
                "APIs"
            ],

            careers: [
                "Android Developer",
                "Mobile App Developer",
                "Flutter Developer",
                "Application Developer",
                "Mobile Development Intern"
            ],

            path: [
                [
                    "Learn Programming",
                    "Build a strong programming foundation."
                ],
                [
                    "Choose a Platform",
                    "Start with Android or a cross-platform framework."
                ],
                [
                    "Learn UI Development",
                    "Create clean and useful mobile interfaces."
                ],
                [
                    "Learn APIs",
                    "Understand how applications communicate with services."
                ],
                [
                    "Build an App",
                    "Create and test a practical mobile application."
                ]
            ]

        }

    };


    /* =========================================
       GET SELECTED SKILL
    ========================================= */

    const params =
        new URLSearchParams(window.location.search);

    const selectedSkill =
        params.get("skill") || "programming";


    const skill =
        skills[selectedSkill] || skills.programming;


    /* =========================================
       BASIC INFORMATION
    ========================================= */

    document.title =
        skill.title + " - CareerGuide AI";


    document.getElementById("skillTitle").textContent =
        skill.title;


    document.getElementById("skillDescription").textContent =
        skill.description;


    document.getElementById("skillOverview").textContent =
        skill.overview;


    /* =========================================
       ICON
    ========================================= */

    const skillIcon =
        document.getElementById("skillIcon");

    skillIcon.innerHTML =
        '<i class="fa-solid ' +
        skill.icon +
        '"></i>';


    /* =========================================
       LIST HELPER
    ========================================= */

    function createList(elementId, items) {

        const element =
            document.getElementById(elementId);

        element.innerHTML = "";


        items.forEach(function (item) {

            const li =
                document.createElement("li");

            li.textContent =
                item;

            element.appendChild(li);

        });

    }


    createList(
        "skillList",
        skill.skills
    );


    createList(
        "technologyList",
        skill.technologies
    );


    createList(
        "careerList",
        skill.careers
    );


    /* =========================================
       LEARNING PATH
    ========================================= */

    const learningPath =
        document.getElementById("learningPath");


    learningPath.innerHTML = "";


    skill.path.forEach(
        function (step, index) {

            const stepElement =
                document.createElement("div");

            stepElement.className =
                "learning-step";


            stepElement.innerHTML =

                '<div class="step-number">' +
                (index + 1) +
                '</div>' +

                '<div>' +

                '<h3>' +
                step[0] +
                '</h3>' +

                '<p>' +
                step[1] +
                '</p>' +

                '</div>';


            learningPath.appendChild(
                stepElement
            );

        }
    );

});