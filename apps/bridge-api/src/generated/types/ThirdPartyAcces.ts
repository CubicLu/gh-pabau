import { objectType, arg, extendType } from 'nexus'

export const ThirdPartyAcces = objectType({
  name: 'ThirdPartyAcces',
  definition(t) {
    t.model.id()
    t.model.occupier()
    t.model.company_id()
    t.model.company_name()
    t.model.email()
    t.model.passcode()
    t.model.first_name()
    t.model.last_name()
    t.model.logo()
    t.model.access_id()
    t.model.company()
  },
})

export const thirdPartyAccesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.thirdPartyAcces()
    t.field('findFirstThirdPartyAcces', {
      type: 'ThirdPartyAcces',
      args: {
        where: 'ThirdPartyAccesWhereInput',
        orderBy: arg({ type: 'ThirdPartyAccesOrderByInput' }),
        cursor: 'ThirdPartyAccesWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.thirdPartyAcces.findFirst(args as any)
      },
    })
    t.crud.thirdPartyAcces({ filtering: true, ordering: true })
    t.field('thirdPartyAccesCount', {
      type: 'Int',
      args: {
        where: 'ThirdPartyAccesWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.thirdPartyAcces.count(args as any)
      },
    })
  },
})

export const thirdPartyAccesMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneThirdPartyAcces()
    t.crud.updateOneThirdPartyAcces()
    t.crud.upsertOneThirdPartyAcces()
    t.crud.deleteOneThirdPartyAcces()
    t.crud.updateManyThirdPartyAcces()
    t.crud.deleteManyThirdPartyAcces()
  },
})
