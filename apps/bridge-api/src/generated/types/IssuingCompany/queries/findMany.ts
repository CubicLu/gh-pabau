import { queryField, nonNull, list } from 'nexus'

export const IssuingCompanyFindManyQuery = queryField(
  'findManyIssuingCompany',
  {
    type: nonNull(list(nonNull('IssuingCompany'))),
    args: {
      where: 'IssuingCompanyWhereInput',
      orderBy: list('IssuingCompanyOrderByWithRelationInput'),
      cursor: 'IssuingCompanyWhereUniqueInput',
      distinct: 'IssuingCompanyScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.issuingCompany.findMany({
        ...args,
        ...select,
      })
    },
  },
)
