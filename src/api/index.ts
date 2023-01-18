import axios from 'axios'

const domain: string = import.meta.env.VITE_BACKEND_URL

const baseURL = domain + '/api/v1'

const instance = axios.create({ baseURL })

const postWithoutToken = (url: string, data: any): any => instance.post(url, data)

const getTokenStored = (): string => {
  const tokenStored: any = localStorage.getItem('token')

  const tokenParsed: string = JSON.parse(tokenStored)

  return tokenParsed
}

const postWithtToken = async (url: string, data: any, progressFn?: any): Promise<any> => {
  const token = getTokenStored()

  if (token === null) {
    return {
      data: {
        failed: true,
        message: 'You must provide a token'
      }
    }
  }

  return await instance.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    onUploadProgress: progressFn
  })
}

const getWithtToken = async (url: string, progressFn?: any): Promise<any> => {
  const token = getTokenStored()

  if (token === null) {
    return {
      data: {
        failed: true,
        message: 'You must provide a token'
      }
    }
  }

  return await instance.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    onDownloadProgress: progressFn
  })
}

const deleteWithtToken = async (url: string, progressFn?: any): Promise<any> => {
  const token = getTokenStored()

  if (token === null) {
    return {
      data: {
        failed: true,
        message: 'You must provide a token'
      }
    }
  }

  return await instance.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    onUploadProgress: progressFn

  })
}

const patchWithtToken = async (url: string, data: any, progressFn?: any): Promise<any> => {
  const token = getTokenStored()

  if (token === null) {
    return {
      data: {
        failed: true,
        message: 'You must provide a token'
      }
    }
  }

  return await instance.patch(url, data, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    onUploadProgress: progressFn

  })
}

export { postWithoutToken, postWithtToken, getWithtToken, deleteWithtToken, patchWithtToken }
