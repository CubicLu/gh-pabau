import { objectType } from 'nexus'

export const ReportCategory = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ReportCategory',
  definition(t) {
    t.int('id')
    t.nullable.string('name')
    t.nullable.string('description')
    t.nullable.int('company_id')
    t.string('type')
    t.string('colour')
    t.list.field('Report', {
      type: 'Report',
      args: {
        where: 'ReportWhereInput',
        orderBy: 'ReportOrderByWithRelationInput',
        cursor: 'ReportWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ReportScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Report
      },
    })
    t.nullable.field('_count', {
      type: 'ReportCategoryCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
