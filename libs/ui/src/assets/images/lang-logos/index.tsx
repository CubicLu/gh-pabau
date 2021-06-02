import ARSVG from './arabic.svg'
import BRSVG from './bulgarian.svg'
import CZSVG from './czech.svg'
import ENSVG from './en.svg'
import FRSVG from './french.svg'
import HGSVG from './hungarian.svg'
import LTSVG from './latvian.svg'
import NWSVG from './norwegian.svg'
import POSVG from './polish.svg'
import ROMSVG from './romanian.svg'
import RUSSVG from './russian.svg'
import { default as SHSVG, default as SPSVG } from './spanish.svg'
import SWSVG from './swedish.svg'
import USSVG from './us.svg'

export const languageMenu = [
  {
    label: 'English (UK)',
    logo: ENSVG,
    selected: true,
  },
  {
    label: 'English (US)',
    logo: USSVG,
    selected: true,
  },
  {
    label: 'French',
    logo: FRSVG,
  },
  {
    label: 'Spanish',
    logo: SPSVG,
  },
  {
    label: 'Arabic',
    logo: ARSVG,
  },
  {
    label: 'Bulgarian',
    logo: BRSVG,
  },
  {
    label: 'Czech',
    logo: CZSVG,
  },
  {
    label: 'Danish',
    logo: FRSVG,
  },
  {
    label: 'Hungarian',
    logo: HGSVG,
  },
  {
    label: 'Latvian',
    logo: LTSVG,
  },
  {
    label: 'Norwegian',
    logo: NWSVG,
  },
  {
    label: 'Polish',
    logo: POSVG,
  },
  {
    label: 'Spannish',
    logo: SHSVG,
  },
  {
    label: 'Swedish',
    logo: SWSVG,
  },
  {
    label: 'Romanian',
    logo: ROMSVG,
  },
  {
    label: 'Russian',
    logo: RUSSVG,
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
