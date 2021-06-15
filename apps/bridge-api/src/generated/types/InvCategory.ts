import { objectType, arg, extendType } from 'nexus'

export const InvCategory = objectType({
  name: 'InvCategory',
  definition(t) {
    t.model.id()
    t.model.code()
    t.model.name()
    t.model.order()
    t.model.category_type()
    t.model.company_id()
    t.model.uid()
    t.model.created_date()
    t.model.modified_date()
    t.model.custom_id()
    t.model.PriceListGroup_id()
    t.model.imported()
    t.model.technical()
    t.model.image()
    t.model.disabled()
    t.model.tax_id()
    t.model.master_cat_id()
    t.model.InvProduct()
    t.model.ServiceMasterCategory()
  },
})

export const invCategoryQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.invCategory()
    t.field('findFirstInvCategory', {
      type: 'InvCategory',
      args: {
        where: 'InvCategoryWhereInput',
        orderBy: arg({ type: 'InvCategoryOrderByInput' }),
        cursor: 'InvCategoryWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.invCategory.findFirst(args as any)
      },
    })
    t.crud.invCategories({ filtering: true, ordering: true })
    t.field('invCategoriesCount', {
      type: 'Int',
      args: {
        where: 'InvCategoryWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.invCategory.count(args as any)
      },
    })
  },
})

export const invCategoryMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneInvCategory()
    t.crud.updateOneInvCategory()
    t.crud.upsertOneInvCategory()
    t.crud.deleteOneInvCategory()
    t.crud.updateManyInvCategory()
  },
})
