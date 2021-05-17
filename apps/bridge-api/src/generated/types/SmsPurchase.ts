import { objectType, arg, extendType } from 'nexus'

export const SmsPurchase = objectType({
  name: 'SmsPurchase',
  definition(t) {
    t.model.id()
    t.model.date()
    t.model.sms_amount()
    t.model.company_id()
    t.model.user_id()
    t.model.price()
    t.model.profit()
    t.model.purchase_type()
    t.model.status()
    t.model.Company()
    t.model.User()
  },
})

export const smsPurchaseQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.smsPurchase()
    t.field('findFirstSmsPurchase', {
      type: 'SmsPurchase',
      args: {
        where: 'SmsPurchaseWhereInput',
        orderBy: arg({ type: 'SmsPurchaseOrderByInput' }),
        cursor: 'SmsPurchaseWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.smsPurchase.findFirst(args as any)
      },
    })
    t.crud.smsPurchases({ filtering: true, ordering: true })
    t.field('smsPurchasesCount', {
      type: 'Int',
      args: {
        where: 'SmsPurchaseWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.smsPurchase.count(args as any)
      },
    })
  },
})

export const smsPurchaseMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneSmsPurchase()
    t.crud.updateOneSmsPurchase()
    t.crud.upsertOneSmsPurchase()
    t.crud.deleteOneSmsPurchase()
    t.crud.updateManySmsPurchase()
  },
})
