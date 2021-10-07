import { objectType } from 'nexus'

export const Timezone = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Timezone',
  definition(t) {
    t.int('timezone_id')
    t.string('label')
    t.string('php_format')
    t.string('db_format')
    t.int('offset_seconds')
    t.boolean('supported')
    t.list.field('CompanyDetails', {
      type: 'CompanyDetails',
      args: {
        where: 'CompanyDetailsWhereInput',
        orderBy: 'CompanyDetailsOrderByWithRelationInput',
        cursor: 'CompanyDetailsWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyDetailsScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyDetails
      },
    })
    t.nullable.field('_count', {
      type: 'TimezoneCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
