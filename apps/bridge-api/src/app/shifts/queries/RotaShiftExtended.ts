import { extendType, intArg } from 'nexus'
import { RotaShift } from '@prisma/client'
import dayjs from 'dayjs'

export const RotaShiftExtended = extendType({
  type: 'RotaShift',
  definition(t) {
    t.field('duration', {
      type: 'Int',
      async resolve(parent: RotaShift) {
        const start = dayjs(`${parent.start}` as 'YYYYMMDDHHmmss').format(
          'YYYY-MM-DD HH:mm:ss'
        )
        const end = dayjs(`${parent.end}` as 'YYYYMMDDHHmmss').format(
          'YYYY-MM-DD HH:mm:ss'
        )

        return dayjs(end).diff(start, 'minutes')
      },
    })
  },
})
