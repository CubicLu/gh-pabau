import {
  extendType,
  list,
  nonNull,
  intArg,
  nullable,
  inputObjectType,
} from 'nexus'
import { Context } from '../../../context'

export const RotaShiftFilterInput = inputObjectType({
  name: 'RotaShiftFilterInput',
  definition(t) {
    t.list.int('location_ids')
    t.list.int('user_ids')
    t.int('group_id')
    t.float('start_date')
    t.float('end_date')
  },
})
export const findManyRotaExtended = extendType({
  type: 'Query',
  definition(t) {
    t.field('findManyFilteredRotaShift', {
      type: nonNull(list('RotaShift')),
      args: {
        where: nullable(RotaShiftFilterInput),
        skip: intArg(),
        take: intArg(),
      },
      async resolve(parent: any, args, ctx: Context) {
        const where = { AND: [] }
        if (args.where?.location_ids?.length > 0) {
          where.AND.push({ Location: { id: { in: args.where.location_ids } } })
        }

        if (args.where?.user_ids?.length > 0) {
          where.AND.push({
            CmStaffGeneral: { User: { id: { in: args.where.user_ids } } },
          })
        }
        if (args.where?.group_id) {
          where.AND.push({
            CmStaffGeneral: {
              User: {
                UserGroupMember: {
                  UserGroup: { id: { equals: args.where.group_id } },
                },
              },
            },
          })
        }

        return await ctx.prisma.rotaShift.findMany({
          where: {
            ...where,
            company_id: ctx.authenticated.company,
            start: { gte: args.where?.start_date || undefined },
            end: { lte: args.where?.end_date || undefined },
          },
          skip: args.skip,
          take: args.take,
          orderBy: {
            start: 'asc',
          },
          include: {
            Company: true,
            Location: true,
            CmStaffGeneral: {
              include: {
                User: {
                  include: {
                    UserGroupMember: {
                      include: {
                        UserGroup: true,
                      },
                    },
                  },
                },
              },
            },
          },
        })
      },
    })
  },
})
