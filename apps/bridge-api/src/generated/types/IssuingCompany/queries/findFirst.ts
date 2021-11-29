import { queryField, list } from 'nexus'

export const IssuingCompanyFindFirstQuery = queryField(
  'findFirstIssuingCompany',
  {
    type: 'IssuingCompany',
    args: {
      where: 'IssuingCompanyWhereInput',
      orderBy: list('IssuingCompanyOrderByWithRelationInput'),
      cursor: 'IssuingCompanyWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('IssuingCompanyScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.issuingCompany.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
