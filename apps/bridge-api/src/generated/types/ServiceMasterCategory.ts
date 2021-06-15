import { objectType, arg, extendType } from 'nexus'

export const ServiceMasterCategory = objectType({
  name: 'ServiceMasterCategory',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.company_id()
    t.model.ord()
    t.model.type()
    t.model.image()
    t.model.InvCategory()
    t.model.Company()
  },
})

export const serviceMasterCategoryQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.serviceMasterCategory()
    t.field('findFirstServiceMasterCategory', {
      type: 'ServiceMasterCategory',
      args: {
        where: 'ServiceMasterCategoryWhereInput',
        orderBy: arg({ type: 'ServiceMasterCategoryOrderByInput' }),
        cursor: 'ServiceMasterCategoryWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.serviceMasterCategory.findFirst(args as any)
      },
    })
    t.crud.serviceMasterCategories({ filtering: true, ordering: true })
    t.field('serviceMasterCategoriesCount', {
      type: 'Int',
      args: {
        where: 'ServiceMasterCategoryWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.serviceMasterCategory.count(args as any)
      },
    })
  },
})

export const serviceMasterCategoryMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneServiceMasterCategory()
    t.crud.updateOneServiceMasterCategory()
    t.crud.upsertOneServiceMasterCategory()
    t.crud.deleteOneServiceMasterCategory()
    t.crud.updateManyServiceMasterCategory()
  },
})
