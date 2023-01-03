import axios from 'axios'

const domain: string = import.meta.env.VITE_BACKEND_URL

const baseURL = domain + '/api/v1'

const instance = axios.create({ baseURL })

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
    onDownloadProgress: progressFn
  })
}

const deleteWithtToken = async (url: string, progressFn?: any): Promise<any> => {
  if (tokenParsed === null) {
    return {
      data: {
        failed: true,
        message: 'You must provide a token'
      }
    }
  }

  return await instance.delete(url, {
    headers: {
      Authorization: `Bearer ${tokenParsed}`
    },
    onUploadProgress: progressFn

  })
}

const patchWithtToken = async (url: string, data: any, progressFn?: any): Promise<any> => {
  if (tokenParsed === null) {
    return {
      data: {
        failed: true,
        message: 'You must provide a token'
      }
    }
  }

  return await instance.patch(url, data, {
    headers: {
      Authorization: `Bearer ${tokenParsed}`
    },
    onUploadProgress: progressFn

  })
}

export { postWithoutToken, postWithtToken, getWithtToken, deleteWithtToken, patchWithtToken }
