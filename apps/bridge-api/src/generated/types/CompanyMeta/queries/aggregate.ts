import { queryField, list } from 'nexus'

export const CompanyMetaAggregateQuery = queryField('aggregateCompanyMeta', {
  type: 'AggregateCompanyMeta',
  args: {
    where: 'CompanyMetaWhereInput',
    orderBy: list('CompanyMetaOrderByInput'),
    cursor: 'CompanyMetaWhereUniqueInput',
    distinct: 'CompanyMetaScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyMeta.aggregate({ ...args, ...select }) as any
  },
})
