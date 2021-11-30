import { queryField, nonNull, list } from 'nexus'

export const CompanyMetaFindCountQuery = queryField(
  'findManyCompanyMetaCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyMetaWhereInput',
      orderBy: list('CompanyMetaOrderByWithRelationInput'),
      cursor: 'CompanyMetaWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyMetaScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyMeta.count(args as any)
    },
  },
)
