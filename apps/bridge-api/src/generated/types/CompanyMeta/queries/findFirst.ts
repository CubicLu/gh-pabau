import { queryField, list } from 'nexus'

export const CompanyMetaFindFirstQuery = queryField('findFirstCompanyMeta', {
  type: 'CompanyMeta',
  args: {
    where: 'CompanyMetaWhereInput',
    orderBy: list('CompanyMetaOrderByWithRelationInput'),
    cursor: 'CompanyMetaWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CompanyMetaScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyMeta.findFirst({
      ...args,
      ...select,
    })
  },
})
