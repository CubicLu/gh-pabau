import { objectType, arg, extendType } from 'nexus'

export const CmContactViewed = objectType({
  name: 'CmContactViewed',
  definition(t) {
    t.model.id()
    t.model.contact_id()
    t.model.user_id()
    t.model.company_id()
    t.model.date()
    t.model.Company()
    t.model.User()
    t.model.CmContact()
  },
})

export const cmContactViewedQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cmContactViewed()
    t.field('findFirstCmContactViewed', {
      type: 'CmContactViewed',
      args: {
        where: 'CmContactViewedWhereInput',
        orderBy: arg({ type: 'CmContactViewedOrderByInput' }),
        cursor: 'CmContactViewedWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmContactViewed.findFirst(args as any)
      },
    })
    t.crud.cmContactVieweds({ filtering: true, ordering: true })
    t.field('cmContactViewedsCount', {
      type: 'Int',
      args: {
        where: 'CmContactViewedWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmContactViewed.count(args as any)
      },
    })
  },
})

export const cmContactViewedMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCmContactViewed()
    t.crud.updateOneCmContactViewed()
    t.crud.upsertOneCmContactViewed()
    t.crud.deleteOneCmContactViewed()
    t.crud.updateManyCmContactViewed()
  },
})
