import { queryField, nonNull, list } from 'nexus'

export const CompanyMetaFindCountQuery = queryField(
  'findManyCompanyMetaCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyMetaWhereInput',
      orderBy: list('CompanyMetaOrderByInput'),
      cursor: 'CompanyMetaWhereUniqueInput',
      distinct: 'CompanyMetaScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyMeta.count(args as any)
    },
  },
)
