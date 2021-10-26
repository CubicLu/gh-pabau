import { extendType, intArg, inputObjectType, nullable } from 'nexus'
import { Context } from '../../../context'
import { PublicStaffResponse } from '../nexus-type'
import moment from 'moment'

const PSTInput = inputObjectType({
  name: 'PSTInput',
  definition(t) {
    t.nonNull.int('company_id')
  },
})

export const Public_Staff = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('Public_Staff', {
      type: PublicStaffResponse,
      description: 'Get staff public data',
      args: {
        where: nullable(PSTInput),
        skip: intArg(),
        take: intArg(),
      },
      async resolve(root, input, ctx: Context) {
        return ctx.prisma.cmStaffGeneral.findMany({
          where: {
            ...input.where,
            RotaShift: {
              some: {
                start: {
                  gt: Number.parseFloat(moment().format('YYYYMMDDHHmmss')),
                },
              },
            },
            User: { hide_online_bookings: 0 },
          },
          skip: input.skip,
          take: input.take,
        })
      },
    })
  },
})
