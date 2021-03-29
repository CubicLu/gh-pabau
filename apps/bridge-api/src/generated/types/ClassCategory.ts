import { objectType, arg, extendType } from 'nexus'

export const ClassCategory = objectType({
  name: 'ClassCategory',
  definition(t) {
    t.model.id()
    t.model.code()
    t.model.name()
    t.model.occupier()
    t.model.uid()
    t.model.created_date()
    t.model.modified_date()
  },
})

export const classCategoryQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.classCategory()
    t.field('findFirstClassCategory', {
      type: 'ClassCategory',
      args: {
        where: 'ClassCategoryWhereInput',
        orderBy: arg({ type: 'ClassCategoryOrderByInput' }),
        cursor: 'ClassCategoryWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.classCategory.findFirst(args as any)
      },
    })
    t.crud.classCategories({ filtering: true, ordering: true })
    t.field('classCategoriesCount', {
      type: 'Int',
      args: {
        where: 'ClassCategoryWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.classCategory.count(args as any)
      },
    })
  },
})

export const classCategoryMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneClassCategory()
    t.crud.updateOneClassCategory()
    t.crud.upsertOneClassCategory()
    t.crud.deleteOneClassCategory()
  },
})
