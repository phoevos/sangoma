import { HttpService, Injectable } from '@nestjs/common';
import axios from 'axios';
const BASE_URL = 'http://localhost:3000/'

@Injectable()
export class AppService {

  async getRedirect(endpoint: string, params) {
    const url = BASE_URL + endpoint
    // console.log(params)
    console.log(url)
    return axios.get(url, params)
  }

  async postRedirect(endpoint: string, body, headers) {
    const url = BASE_URL + endpoint
    headers["content-type"] = "application/json"
    return axios.post(url,body, { headers })    
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
