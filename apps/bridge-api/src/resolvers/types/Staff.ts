import {
  extendType,
  nonNull,
  list,
  mutationField,
  intArg,
  inputObjectType,
} from 'nexus'
import { Context } from '../../context'

export const StaffExtended = extendType({
  type: 'CmStaffGeneral',
  definition(t) {
    t.field('Locations', {
      type: nonNull(list('CompanyBranch')),
      async resolve(parent: any, args, ctx: Context) {
        const locationIds = parent.Location
        if (!locationIds) {
          return []
        }

        const ids = []
        for (const item of locationIds?.split(',')) {
          ids.push(Number.parseInt(item))
        }

        const locations = await ctx.prisma.companyBranch.findMany({
          where: {
            id: { in: ids },
          },
        })

        return locations
      },
    })
  },
})

export const UpdateStaffServices = mutationField('updateStaffServices', {
  type: 'Boolean',
  args: {
    userId: nonNull(intArg()),
    services: nonNull(
      list(
        inputObjectType({
          name: 'StaffServicesArg',
          definition(t) {
            t.nonNull.int('id')
            t.nonNull.boolean('disabled')
          },
        })
      )
    ),
  },
  async resolve(_parent, args, ctx: Context) {
    for (const service of args.services) {
      const serviceData = await ctx.prisma.companyService.findUnique({
        where: {
          id: service.id,
        },
        select: {
          disabledusers: true,
        },
      })

      const disabledUsers =
        serviceData.disabledusers && serviceData.disabledusers !== ''
          ? serviceData.disabledusers
              .split(',')
              .map((elem) => Number.parseInt(elem))
          : []

      if (service.disabled && !disabledUsers.includes(args.userId)) {
        await ctx.prisma.companyService.update({
          where: {
            id: service.id,
          },
          data: {
            disabledusers:
              disabledUsers.length > 0
                ? serviceData.disabledusers + ',' + args.userId
                : args.userId.toString(),
          },
        })
      } else if (!service.disabled && disabledUsers.includes(args.userId)) {
        await ctx.prisma.companyService.update({
          where: {
            id: service.id,
          },
          data: {
            disabledusers: disabledUsers
              .filter((user) => user !== args.userId)
              .join(','),
          },
        })
      }
    }
    return true
  },
})
