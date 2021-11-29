import { queryField, nonNull, list } from 'nexus'

export const CompanyMetaFindManyQuery = queryField('findManyCompanyMeta', {
  type: nonNull(list(nonNull('CompanyMeta'))),
  args: {
    where: 'CompanyMetaWhereInput',
    orderBy: list('CompanyMetaOrderByWithRelationInput'),
    cursor: 'CompanyMetaWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CompanyMetaScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyMeta.findMany({
      ...args,
      ...select,
    })
  },
})
