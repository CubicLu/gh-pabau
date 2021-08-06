import { cdnURL } from '../../../baseUrl'

async function postData(url = '', data, file) {
  const token = localStorage.getItem('token')

  const postData = new FormData()

  for (const name in data) {
    postData.append(name, data[name])
  }

  if (file) {
    postData.append('File', file)
  }

  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    redirect: 'follow',
    body: postData,
  })
  return response.json()
}

export type ImgBlock = {
  key?: string
  path: string
  url: string
  tags: string[]
}

export const getImage = (url: string): string => `${cdnURL}${url}`

export default postData
