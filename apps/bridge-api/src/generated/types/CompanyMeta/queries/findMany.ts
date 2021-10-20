import { queryField, nonNull, list } from 'nexus'

export const CompanyMetaFindManyQuery = queryField('findManyCompanyMeta', {
  type: nonNull(list(nonNull('CompanyMeta'))),
  args: {
    where: 'CompanyMetaWhereInput',
    orderBy: list('CompanyMetaOrderByWithRelationInput'),
    cursor: 'CompanyMetaWhereUniqueInput',
    distinct: 'CompanyMetaScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyMeta.findMany({
      ...args,
      ...select,
    })
  },
})
