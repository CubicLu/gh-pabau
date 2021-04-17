import React from 'react'

export const setSocialIcon = (value) => {
  if (value.includes('facebook')) {
    return (
      <img
        src={
          'https://i.pinimg.com/564x/51/d3/66/51d366ff959f153a09c2dca347ab7855.jpg'
        }
        width="13px"
        height="13px"
        alt={'fb'}
        style={{ padding: '5px' }}
      />
    )
  } else if (value.includes('linksIn')) {
    return (
      <img
        src={
          'https://icons-for-free.com/iconfiles/png/512/linked+in+linkedin+logo+social+square+icon-1320086773461479453.png'
        }
        width="13px"
        height="13px"
        alt={'in'}
        style={{ padding: '5px' }}
      />
    )
  } else if (value.includes('instagram')) {
    return (
      <img
        src={
          'https://www.citypng.com/public/uploads/preview/-11590150289tqivt8c6o1.png'
        }
        width="13px"
        height="13px"
        alt={'insta'}
        style={{ padding: '5px' }}
      />
    )
  } else if (value.includes('twitter')) {
    return (
      <img
        src={
          'https://listimg.pinclipart.com/picdir/s/190-1902138_twitter-square-black-and-white-icon-logo-vector.png'
        }
        width="13px"
        height="13px"
        alt={'twitter'}
        style={{ padding: '5px' }}
      />
    )
  }
}
