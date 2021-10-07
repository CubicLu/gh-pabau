import { queryField, list } from 'nexus'

export const IssuingCompanyFindFirstQuery = queryField(
  'findFirstIssuingCompany',
  {
    type: 'IssuingCompany',
    args: {
      where: 'IssuingCompanyWhereInput',
      orderBy: list('IssuingCompanyOrderByWithRelationInput'),
      cursor: 'IssuingCompanyWhereUniqueInput',
      distinct: 'IssuingCompanyScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.issuingCompany.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
