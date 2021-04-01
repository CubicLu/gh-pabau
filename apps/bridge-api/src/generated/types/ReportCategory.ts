import { objectType, arg, extendType } from 'nexus'

export const ReportCategory = objectType({
  name: 'ReportCategory',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.description()
    t.model.company_id()
    t.model.type()
    t.model.colour()
    t.model.Report()
  },
})

export const reportCategoryQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.reportCategory()
    t.field('findFirstReportCategory', {
      type: 'ReportCategory',
      args: {
        where: 'ReportCategoryWhereInput',
        orderBy: arg({ type: 'ReportCategoryOrderByInput' }),
        cursor: 'ReportCategoryWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.reportCategory.findFirst(args as any)
      },
    })
    t.crud.reportCategories({ filtering: true, ordering: true })
    t.field('reportCategoriesCount', {
      type: 'Int',
      args: {
        where: 'ReportCategoryWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.reportCategory.count(args as any)
      },
    })
  },
})

export const reportCategoryMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneReportCategory()
    t.crud.updateOneReportCategory()
    t.crud.upsertOneReportCategory()
    t.crud.deleteOneReportCategory()
    t.crud.updateManyReportCategory()
  },
})
