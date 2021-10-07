import { queryField, nonNull, list } from 'nexus'

export const IssuingCompanyFindCountQuery = queryField(
  'findManyIssuingCompanyCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'IssuingCompanyWhereInput',
      orderBy: list('IssuingCompanyOrderByWithRelationInput'),
      cursor: 'IssuingCompanyWhereUniqueInput',
      distinct: 'IssuingCompanyScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.issuingCompany.count(args as any)
    },
  },
)
