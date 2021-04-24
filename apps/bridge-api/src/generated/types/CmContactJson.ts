import { objectType, arg, extendType } from 'nexus'

export const CmContactJson = objectType({
  name: 'CmContactJson',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.clients_json()
    t.model.date_updated()
    t.model.Company()
  },
})

export const cmContactJsonQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cmContactJson()
    t.field('findFirstCmContactJson', {
      type: 'CmContactJson',
      args: {
        where: 'CmContactJsonWhereInput',
        orderBy: arg({ type: 'CmContactJsonOrderByInput' }),
        cursor: 'CmContactJsonWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmContactJson.findFirst(args as any)
      },
    })
    t.crud.cmContactJsons({ filtering: true, ordering: true })
    t.field('cmContactJsonsCount', {
      type: 'Int',
      args: {
        where: 'CmContactJsonWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmContactJson.count(args as any)
      },
    })
  },
})

export const cmContactJsonMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCmContactJson()
    t.crud.updateOneCmContactJson()
    t.crud.upsertOneCmContactJson()
    t.crud.deleteOneCmContactJson()
    t.crud.updateManyCmContactJson()
  },
})
