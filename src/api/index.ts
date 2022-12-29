import axios from 'axios'

const DOMAIN = import.meta.env.VITE_BACKEND_URL

const instance = axios.create({ baseURL: DOMAIN })

const postWithoutToken = (url: string, data: any): any => instance.post(url, data)

const tokenStored: any = localStorage.getItem('token')

const tokenParsed: string = JSON.parse(tokenStored)

const postWithtToken = async (url: string, data: any, progressFn?: any): Promise<any> => {
  if (tokenParsed === null) {
    return {
      data: {
        failed: true,
        message: 'You must provide a token'
      }
    }
  }

  return await instance.post(url, data, {
    headers: {
      Authorization: `Bearer ${tokenParsed}`
    },
    onUploadProgress: progressFn
  })
}

const getWithtToken = async (url: string, progressFn?: any): Promise<any> => {
  if (tokenParsed === null) {
    return {
      data: {
        failed: true,
        message: 'You must provide a token'
      }
    }
  }

  return await instance.get(url, {
    headers: {
      Authorization: `Bearer ${tokenParsed}`
    },
    onUploadProgress: progressFn
  })
}

export { postWithoutToken, postWithtToken, getWithtToken }
