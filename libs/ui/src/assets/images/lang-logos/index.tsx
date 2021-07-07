import ARSVG from './arabic.svg'
import BRSVG from './bulgarian.svg'
import CZSVG from './czech.svg'
import DASVG from './dutch.svg'
import ENSVG from './en.svg'
import FRSVG from './french.svg'
import HGSVG from './hungarian.svg'
import LTSVG from './latvian.svg'
import NWSVG from './norwegian.svg'
import POSVG from './polish.svg'
import ROMSVG from './romanian.svg'
import RUSSVG from './russian.svg'
import SPSVG from './spanish.svg'
import SWSVG from './swedish.svg'
import USSVG from './us.svg'

export const languageMenu = [
  {
    label: 'English',
    logo: ENSVG,
    selected: true,
  },
  {
    label: 'English (UK)',
    logo: ENSVG,
    selected: true,
    shortLabel: 'EN',
  },
  {
    label: 'English (US)',
    logo: USSVG,
    selected: true,
    shortLabel: 'US',
  },
  {
    label: 'French',
    logo: FRSVG,
    shortLabel: 'FR',
  },
  {
    label: 'Spanish',
    logo: SPSVG,
    shortLabel: 'SP',
  },
  {
    label: 'Arabic',
    logo: ARSVG,
    shortLabel: 'AR',
  },
  {
    label: 'Bulgarian',
    logo: BRSVG,
    shortLabel: 'BG',
  },
  {
    label: 'Czech',
    logo: CZSVG,
    shortLabel: 'CS',
  },
  {
    label: 'Danish',
    logo: DASVG,
    shortLabel: 'DA',
  },
  {
    label: 'Hungarian',
    logo: HGSVG,
    shortLabel: 'HU',
  },
  {
    label: 'Latvian',
    logo: LTSVG,
    shortLabel: 'LV',
  },
  {
    label: 'Norwegian',
    logo: NWSVG,
    shortLabel: 'NO',
  },
  {
    label: 'Polish',
    logo: POSVG,
    shortLabel: 'PL',
  },
  {
    label: 'Swedish',
    logo: SWSVG,
    shortLabel: 'SW',
  },
  {
    label: 'Romanian',
    logo: ROMSVG,
    shortLabel: 'RO',
  },
  {
    label: 'Russian',
    logo: RUSSVG,
    shortLabel: 'RU',
  },
]

export const countryMenu = [
  {
    label: 'United Kingdom',
    code: 'UK',
    logo: ENSVG,
  },
  {
    label: 'USA',
    code: 'US',
    logo: USSVG,
  },
  {
    label: 'France',
    code: 'FR',
    logo: FRSVG,
  },
  {
    label: 'Spain',
    code: 'ES',
    logo: SPSVG,
  },
]
