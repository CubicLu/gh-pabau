import moment from 'moment'
import laserChin from '../../assets/images/client-card/package/laser-chin.png'
import laserLip from '../../assets/images/client-card/package/laser-lip.png'
import arya from '../../assets/images/users/arya.png'
import linda from '../../assets/images/users/linda.png'
import liza from '../../assets/images/users/liza.png'

export const clientPackages = [
  {
    id: '1',
    thumbnail: laserChin,
    avatar: arya,
    packageName: 'Laser / Chin',
    packageUsage: 6,
    expDate: moment().add(1, 'years').format('YYYY-MM-DD'),
    actDate: '2021-07-21',
    valueEach: 0,
    used: 0,
    invoice: 0,
    lastSaw: 'John Smith',
    lastVisited: '2021-02-15',
  },
  {
    id: '2',
    thumbnail: laserLip,
    avatar: linda,
    packageName: 'Laser / Lip',
    packageUsage: 6,
    expDate: moment().add(1, 'years').format('YYYY-MM-DD'),
    actDate: '2021-07-21',
    valueEach: 0,
    used: 5,
    invoice: 0,
    lastSaw: 'John Smith',
    lastVisited: '2021-06-30',
  },
  {
    id: '3',
    thumbnail: laserLip,
    avatar: liza,
    packageName: 'Laser / Lip',
    packageUsage: 6,
    expDate: '2021-07-01',
    actDate: '2021-07-01',
    valueEach: 0,
    used: 6,
    invoice: 0,
    lastSaw: 'John Smith',
    lastVisited: '2021-08-15',
  },
]
