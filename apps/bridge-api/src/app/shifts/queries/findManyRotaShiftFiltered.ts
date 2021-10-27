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
    t.list.int('group_ids')
    t.list.int('user_ids')
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
          where.AND.push({ User: { id: { in: args.where.user_ids } } })
        }
        if (args.where?.group_ids?.length > 0) {
          where.AND.push({
            CmStaffGeneral: {
              User: {
                UserGroupMember: {
                  UserGroup: { id: { in: args.where.group_ids } },
                },
              },
            },
          })
        }

        return await ctx.prisma.rotaShift.findMany({
          where: {
            ...where,
            company_id: ctx.authenticated.company,
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
