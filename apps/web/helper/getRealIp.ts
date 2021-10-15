export const getRealIp = () => {
  return fetch('https://api.ipify.org?format=json')
    .then((response) => response.json())
    .then((res) => {
      const ip = res?.ip?.split('.')
      return ((+ip[0] * 256 + +ip[1]) * 256 + +ip[2]) * 256 + +ip[3].toString()
    })
    .catch((error) => console.error('Problem fetching IPAddress', error))
}
