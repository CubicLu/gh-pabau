import axios from 'axios'
import { useEffect, useState } from 'react'

const useFetchCountryData = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    if (!data) {
      axios
        .request({
          url: `http://api.ipstack.com/check?access_key=${process.env.NEXT_PUBLIC_IPSTACK_ACCESS_KEY}`,
        })
        .then((response: any) => {
          setData(response?.data)
        })
        .catch((error) => {
          return error
        })
    }
  }, [data])

  return { data }
}

export default useFetchCountryData
