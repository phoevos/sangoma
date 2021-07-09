const config = {
    "ESB_URL": (process.env.NODE_ENV == 'production') ? 'https://sangoma-soa-esb.herokuapp.com/esb' : "http://localhost:4000/esb",
    "Services": {
        "AuthenticatorService": "auth",
        "DiagramService": "diagram",
        "QAService": "qa"
    }
}
export default config