import { objectType } from 'nexus'

export const ConnectMonthRegistrationsType = objectType({
  name: 'ConnectMonthRegistrationsType',
  definition(t) {
    t.int('month')
    t.int('count')
  },
})

export const ConnectStatsType = objectType({
  name: 'ConnectStatsType',
  definition(t) {
    t.int('downloads')
    t.float('total_users')
    t.float('active_users')
    t.list.field('registrations', { type: ConnectMonthRegistrationsType })
  },
})
