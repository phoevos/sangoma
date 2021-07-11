export const services =  {
    "general-description" : "In order to send a request to the required service, send the request to the general esb endpoint and put the relative url as an attribute in the headers as follows : 'url': service_relative_url/endpoint_relative_url.",
    "Services": [
        {
            "service_id": 0,
            "name": "Questions and Answer Service",
            "relative_path": "qa",
            "description": "This service is responsible for implementing all CRUD operations related to the entities of the database."
        },
        {
            "service_id": 1,
            "name": "Authenticator Service",
            "relative_path": "auth",
            "description": "This service is responsible for sign in/up operations and the implementation of the JWT strategy."
        },
        {
            "service_id": 2,
            "name": "Diagram Service",
            "relative_path": "diagram",
            "description": "This service is responsible for implementing various operations which can produce helpful diagrams."
        }
    ]
}