import { objectType, arg, extendType } from 'nexus'

export const ServiceCategory = objectType({
  name: 'ServiceCategory',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.company_id()
    t.model.category_product_id()
    t.model.cat_order()
    t.model.image()
    t.model.online_enabled()
    t.model.group_color()
    t.model.import_id()
    t.model.equipment_id()
    t.model.deposit_amount()
    t.model.tax_id()
    t.model.master_cat_id()
    t.model.company_position_id()
    t.model.ServiceMasterCategory()
    t.model.InvCategory()
    t.model.CompanyService()
  },
})

export const serviceCategoryQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.serviceCategory()
    t.field('findFirstServiceCategory', {
      type: 'ServiceCategory',
      args: {
        where: 'ServiceCategoryWhereInput',
        orderBy: arg({ type: 'ServiceCategoryOrderByInput' }),
        cursor: 'ServiceCategoryWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.serviceCategory.findFirst(args as any)
      },
    })
    t.crud.serviceCategories({ filtering: true, ordering: true })
    t.field('serviceCategoriesCount', {
      type: 'Int',
      args: {
        where: 'ServiceCategoryWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.serviceCategory.count(args as any)
      },
    })
  },
})

export const serviceCategoryMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneServiceCategory()
    t.crud.updateOneServiceCategory()
    t.crud.upsertOneServiceCategory()
    t.crud.deleteOneServiceCategory()
    t.crud.updateManyServiceCategory()
  },
})
