import axios from 'axios'
import { baseUrl } from './api'

const client = axios.create({
  baseURL: baseUrl
})

export const get = client.get
export const post = client.post
export const put = client.put
export const del = client.delete