import { queryField, list } from 'nexus'

export const CompanyMetaFindFirstQuery = queryField('findFirstCompanyMeta', {
  type: 'CompanyMeta',
  args: {
    where: 'CompanyMetaWhereInput',
    orderBy: list('CompanyMetaOrderByWithRelationInput'),
    cursor: 'CompanyMetaWhereUniqueInput',
    distinct: 'CompanyMetaScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyMeta.findFirst({
      ...args,
      ...select,
    })
  },
})
