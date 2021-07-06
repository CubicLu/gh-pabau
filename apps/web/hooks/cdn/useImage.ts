const CDN_URL = `https://cdn.pabau.com`
export const useImage = (url: string): string =>
  url.includes('/cdn/')
    ? `${CDN_URL}${url}`
    : `${CDN_URL}'/cdn/not-finished-yet.png`
