import { objectType, arg, extendType } from 'nexus'

export const ClassProduct = objectType({
  name: 'ClassProduct',
  definition(t) {
    t.model.id()
    t.model.code()
    t.model.name()
    t.model.unit()
    t.model.size()
    t.model.productOrder()
    t.model.um()
    t.model.cost()
    t.model.price()
    t.model.alertQuantity()
    t.model.image()
    t.model.categoryId()
    t.model.occupier()
    t.model.uid()
    t.model.createdDate()
    t.model.modifiedDate()
    t.model.productDesc()
  },
})

export const classProductQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.classProduct()
    t.field('findFirstClassProduct', {
      type: 'ClassProduct',
      args: {
        where: 'ClassProductWhereInput',
        orderBy: arg({ type: 'ClassProductOrderByInput' }),
        cursor: 'ClassProductWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.classProduct.findFirst(args as any)
      },
    })
    t.crud.classProducts({ filtering: true, ordering: true })
    t.field('classProductsCount', {
      type: 'Int',
      args: {
        where: 'ClassProductWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.classProduct.count(args as any)
      },
    })
  },
})

export const classProductMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneClassProduct()
    t.crud.updateOneClassProduct()
    t.crud.upsertOneClassProduct()
    t.crud.deleteOneClassProduct()
    t.crud.updateManyClassProduct()
    t.crud.deleteManyClassProduct()
  },
})
