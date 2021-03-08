import { objectType, arg, extendType } from 'nexus'

export const Batch = objectType({
  name: 'Batch',
  definition(t) {
    t.model.id()
    t.model.companyId()
    t.model.orderId()
    t.model.orderItemId()
    t.model.batchNo()
    t.model.qty()
    t.model.uid()
    t.model.creationDate()
    t.model.expiryDate()
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
    t.crud.deleteManyBatch()
  },
})
