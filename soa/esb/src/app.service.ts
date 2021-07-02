import { HttpService, Injectable } from '@nestjs/common';
import axios from 'axios';
const BASE_URL = 'http://localhost:3000/'

@Injectable()
export class AppService {

  async getServices() {
    const Services = [
      {
        "service_id": 0,
        "name": "Questions and Answer Service",
        "relative_path": "qa",
        "description": "This service is responsible for implementing all Crud operations related to the entities of the database."
      },
      {
        "service_id": 1,
        "name": "Authenticator Service",
        "relative_path": "auth",
        "description": "This service is responsible for sign in/up and the implementation of the JWT strategy."
      },
      {
        "service_id": 2,
        "name": "Diagram_Service",
        "relative_path": "diagram",
        "description": "This service is responsible for implementing various operations which can produce helpful diagrams."
      }
    ]
    return Services
  }
  async getEndpoints(){

    return {"general-description": "In order to send a request to the required service, send the request to the general esb endpoint and put the relative url as an attribute in the headers as follows : 'url': my_relative_url."}
  }
  async getRedirect(endpoint: string, params) {
    const url = BASE_URL + endpoint
    // console.log(params)
    console.log(url)
    return axios.get(url, params)
  }

  async postRedirect(endpoint: string, body, headers) {
    const url = BASE_URL + endpoint
    headers["content-type"] = "application/json"
    return axios.post(url, body, { headers })
  }

  async patchRedirect(endpoint: string, body, headers) {
    const url = BASE_URL + endpoint
    return axios.patch(url, body, { headers })
  }

  async deleteRedirect(endpoint: string, headers) {
    const url = BASE_URL + endpoint
    return axios.delete(url, { headers })
  }
}
