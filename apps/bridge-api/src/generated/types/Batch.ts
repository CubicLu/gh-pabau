import { objectType, arg, extendType } from 'nexus'

export const Batch = objectType({
  name: 'Batch',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.order_id()
    t.model.order_item_id()
    t.model.batch_no()
    t.model.qty()
    t.model.uid()
    t.model.creation_date()
    t.model.expiry_date()
  },
})

export const batchQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.batch()
    t.field('findFirstBatch', {
      type: 'Batch',
      args: {
        where: 'BatchWhereInput',
        orderBy: arg({ type: 'BatchOrderByInput' }),
        cursor: 'BatchWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.batch.findFirst(args as any)
      },
    })
    t.crud.batches({ filtering: true, ordering: true })
    t.field('batchesCount', {
      type: 'Int',
      args: {
        where: 'BatchWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.batch.count(args as any)
      },
    })
  },
})

export const batchMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneBatch()
    t.crud.updateOneBatch()
    t.crud.upsertOneBatch()
    t.crud.deleteOneBatch()
    t.crud.updateManyBatch()
  },
})
