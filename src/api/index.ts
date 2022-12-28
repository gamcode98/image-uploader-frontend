import axios from 'axios'

const DOMAIN = import.meta.env.VITE_BACKEND_URL

const instance = axios.create({ baseURL: DOMAIN })

const postWithoutToken = (url: string, data: any): any => instance.post(url, data)

export { postWithoutToken }
