const config = {
    "MS": {
        "AUTH": (process.env.NODE_ENV == 'production') ? 'https://sangoma-ms-auth.herokuapp.com' : "http://localhost:3000",
        "DISPLAY_KEYWORDS": (process.env.NODE_ENV == 'production') ? 'https://sangoma-ms-display-keywords.herokuapp.com' : "http://localhost:3001",
        "DISPLAY_QUESTIONS": (process.env.NODE_ENV == 'production') ? 'https://sangoma-ms-display-questions.herokuapp.com' : "http://localhost:3002",
        "QUESTIONS_MANAGEMENT": (process.env.NODE_ENV == 'production') ? 'https://sangoma-ms-question-management.herokuapp.com' : "http://localhost:3003",
        "SINGLE_POST": (process.env.NODE_ENV == 'production') ? 'https://sangoma-ms-single-post.herokuapp.com' : "http://localhost:3004",
        "CONTRIBUTIONS": (process.env.NODE_ENV == 'production') ? 'https://sangoma-ms-contributions.herokuapp.com' : "http://localhost:3005",
        "DISPLAY_ANSWERS": (process.env.NODE_ENV == 'production') ? 'https://sangoma-ms-display-answers.herokuapp.com' : "http://localhost:3006"
    },
    "Services": {
        "AuthenticatorService": "/auth",
        "DiagramService": "/diagram",
        "QAService": "/qa"
    }
}
export default config

