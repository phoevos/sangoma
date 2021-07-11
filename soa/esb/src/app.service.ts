import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { services } from '../config/services.config'
import { endpoints } from '../config/endpoints.config'
import { BASE_URL } from 'config/url.config';

@Injectable()
export class AppService {

  async getServices() {
    return services
  }

  async getEndpoints(id: number) {
    return endpoints.find(endpoint => endpoint.id === id)
  }

  async getRedirect(endpoint: string, params) {
    const url = BASE_URL + endpoint
    return axios.get(url, params)
  }

  async postRedirect(endpoint: string, body, old_headers) {
    const url = BASE_URL + endpoint
    const headers = {
      "content-type": "application/json"
    }
    headers["authorization"] = old_headers.authorization ? old_headers.authorization : null;    
    return axios.post(url, body, { headers })
  }

  async patchRedirect(endpoint: string, body, old_headers) {
    const url = BASE_URL + endpoint
    const headers = {
      "content-type": "application/json"
    }
    headers["authorization"] = old_headers.authorization ? old_headers.authorization : null
    return axios.patch(url, body, { headers })
  }

  async deleteRedirect(endpoint: string, old_headers) {
    const url = BASE_URL + endpoint
    const headers = {}
    headers["authorization"] = old_headers.authorization ? old_headers.authorization : null
    return axios.delete(url, { headers })
  }
}
