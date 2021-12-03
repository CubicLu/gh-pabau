export const isHTML = (str) => {
  const doc = new DOMParser().parseFromString(str, 'text/html')
  return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1)
}

export const checkIsUrl = (str) => {
  return /^\/(?:[A-Za-z]|\d|[$-_]|[!()*,]|(?:%[\dA-Fa-f]{2}))+/.test(str)
}
