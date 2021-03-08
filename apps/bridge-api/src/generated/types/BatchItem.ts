import { objectType, arg, extendType } from 'nexus'

export const BatchItem = objectType({
  name: 'BatchItem',
  definition(t) {
    t.model.id()
    t.model.batchId()
    t.model.companyId()
    t.model.productId()
    t.model.usageDate()
    t.model.patientId()
    t.model.createdById()
    t.model.qty()
    t.model.appointmentId()
    t.model.batchFlag()
  },
})

export const batchItemQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.batchItem()
    t.field('findFirstBatchItem', {
      type: 'BatchItem',
      args: {
        where: 'BatchItemWhereInput',
        orderBy: arg({ type: 'BatchItemOrderByInput' }),
        cursor: 'BatchItemWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.batchItem.findFirst(args as any)
      },
    })
    t.crud.batchItems({ filtering: true, ordering: true })
    t.field('batchItemsCount', {
      type: 'Int',
      args: {
        where: 'BatchItemWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.batchItem.count(args as any)
      },
    })
  },
})

export const batchItemMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneBatchItem()
    t.crud.updateOneBatchItem()
    t.crud.upsertOneBatchItem()
    t.crud.deleteOneBatchItem()
    t.crud.updateManyBatchItem()
    t.crud.deleteManyBatchItem()
  },
})
