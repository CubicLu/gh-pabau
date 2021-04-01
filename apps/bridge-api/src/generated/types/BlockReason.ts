import { objectType, arg, extendType } from 'nexus'

export const BlockReason = objectType({
  name: 'BlockReason',
  definition(t) {
    t.model.id()
    t.model.reason_name()
    t.model.company_id()
    t.model.Company()
    t.model.is_active()
    t.model.block_color()
    t.model.is_paid()
    t.model.default_time()
    t.model.type()
    t.model.custom_id()
  },
})

export const blockReasonQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.blockReason()
    t.field('findFirstBlockReason', {
      type: 'BlockReason',
      args: {
        where: 'BlockReasonWhereInput',
        orderBy: arg({ type: 'BlockReasonOrderByInput' }),
        cursor: 'BlockReasonWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.blockReason.findFirst(args as any)
      },
    })
    t.crud.blockReasons({ filtering: true, ordering: true })
    t.field('blockReasonsCount', {
      type: 'Int',
      args: {
        where: 'BlockReasonWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.blockReason.count(args as any)
      },
    })
  },
})

export const blockReasonMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneBlockReason()
    t.crud.updateOneBlockReason()
    t.crud.upsertOneBlockReason()
    t.crud.deleteOneBlockReason()
    t.crud.updateManyBlockReason()
  },
})
