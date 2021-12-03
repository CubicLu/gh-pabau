import { queryField, nonNull, list } from 'nexus'

export const IssuingCompanyFindManyQuery = queryField(
  'findManyIssuingCompany',
  {
    type: nonNull(list(nonNull('IssuingCompany'))),
    args: {
      where: 'IssuingCompanyWhereInput',
      orderBy: list('IssuingCompanyOrderByWithRelationInput'),
      cursor: 'IssuingCompanyWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('IssuingCompanyScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.issuingCompany.findMany({
        ...args,
        ...select,
      })
    },
  },
)
