import { objectType, arg, extendType } from 'nexus'

export const CheckinProduct = objectType({
  name: 'CheckinProduct',
  definition(t) {
    t.model.id()
    t.model.queueId()
    t.model.productId()
    t.model.dateStart()
    t.model.dateEnd()
    t.model.invProductId()
  },
})

export const checkinProductQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.checkinProduct()
    t.field('findFirstCheckinProduct', {
      type: 'CheckinProduct',
      args: {
        where: 'CheckinProductWhereInput',
        orderBy: arg({ type: 'CheckinProductOrderByInput' }),
        cursor: 'CheckinProductWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.checkinProduct.findFirst(args as any)
      },
    })
    t.crud.checkinProducts({ filtering: true, ordering: true })
    t.field('checkinProductsCount', {
      type: 'Int',
      args: {
        where: 'CheckinProductWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.checkinProduct.count(args as any)
      },
    })
  },
})

export const checkinProductMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCheckinProduct()
    t.crud.updateOneCheckinProduct()
    t.crud.upsertOneCheckinProduct()
    t.crud.deleteOneCheckinProduct()
    t.crud.updateManyCheckinProduct()
    t.crud.deleteManyCheckinProduct()
  },
})
