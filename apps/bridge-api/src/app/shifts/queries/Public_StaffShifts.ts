import { extendType, inputObjectType, intArg, nullable } from 'nexus'
import { Context } from '../../../context'
import { PublicShiftResponse } from '../nexus-type'

export const PSInput = inputObjectType({
  name: 'PSInput',
  definition(t) {
    t.nonNull.int('company_id')
    t.nonNull.float('start')
    t.nonNull.float('end')
    t.int('uid')
  },
})

export const Public_StaffShifts = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('Public_StaffShifts', {
      type: PublicShiftResponse,
      description: 'Get staff shifts public data',
      args: {
        where: nullable(PSInput),
        skip: intArg(),
        take: intArg(),
      },
      resolve(_, input, ctx: Context) {
        return ctx.prisma.rotaShift.findMany({
          where: {
            company_id: input.where.company_id,
            uid: input.where.uid ? input.where.uid : undefined,
            start: input.where.start ? { gte: input.where.start } : undefined,
            end: input.where.end ? { lte: input.where.end } : undefined,
            holiday_id: 0,
            last_published: { not: null },
          },
          skip: input.skip,
          take: input.take,
        })
      },
    })
  },
})
