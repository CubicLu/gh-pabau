import { objectType, arg, extendType } from 'nexus'

export const GlCode = objectType({
  name: 'GlCode',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.code()
    t.model.description()
    t.model.related_to()
    t.model.InvPaymentType()
  },
})

export const glCodeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.glCode()
    t.field('findFirstGlCode', {
      type: 'GlCode',
      args: {
        where: 'GlCodeWhereInput',
        orderBy: arg({ type: 'GlCodeOrderByInput' }),
        cursor: 'GlCodeWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.glCode.findFirst(args as any)
      },
    })
    t.crud.glCodes({ filtering: true, ordering: true })
    t.field('glCodesCount', {
      type: 'Int',
      args: {
        where: 'GlCodeWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.glCode.count(args as any)
      },
    })
  },
})

export const glCodeMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneGlCode()
    t.crud.updateOneGlCode()
    t.crud.upsertOneGlCode()
    t.crud.deleteOneGlCode()
    t.crud.updateManyGlCode()
  },
})
