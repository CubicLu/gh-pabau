import Alex from '../assets/images/users/alex.png'
import Arya from '../assets/images/users/arya.png'
import James from '../assets/images/users/james.png'
import Austin from '../assets/images/users/austin.png'
import Walter from '../assets/images/users/walter.png'
import Liza from '../assets/images/users/liza.png'

export const staff = [
  {
    userName: 'Alex Johnson',
    profileURL: Alex,
  },
  {
    userName: 'Arya Davis',
    profileURL: Arya,
  },
  {
    userName: 'James Ocean',
    profileURL: James,
  },
  {
    userName: 'Austin Winter',
    profileURL: Austin,
  },
  {
    userName: 'Walter Brown',
    profileURL: Walter,
  },
  {
    userName: 'Liza Frank',
    profileURL: Liza,
  },
].map(({ userName, ...rest }, i) => ({
  id: i.toString(),
  name: userName,
  ...rest,
}))
