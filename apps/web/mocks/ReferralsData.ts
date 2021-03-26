function randomDate() {
  const base = new Date(0)
  base.setMilliseconds(Math.floor(Math.random() * Date.now()))
  return base
}

const columnData = Array.from({ length: 30 })
  .fill(0)
  .map((item, index) => ({
    referer: {
      name: 'Ian Senne',
      picture: 'https://via.placeholder.com/36',
    },
    referee: {
      name: 'Ian Senne',
      picture: 'https://via.placeholder.com/36',
    },
    date: randomDate(),
    spend: Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 5000),
    incentive: Math.random() < 0.5,
    state: ['confirmed', 'pending', 'expired'][Math.floor(Math.random() * 3)],
    key: String(index),
  }))

export const ReferralsDataMock = {
  columnData,
}
