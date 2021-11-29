import { queryField, nonNull, list } from 'nexus'

export const InsuranceDetailFindCountQuery = queryField(
  'findManyInsuranceDetailCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'InsuranceDetailWhereInput',
      orderBy: list('InsuranceDetailOrderByWithRelationInput'),
      cursor: 'InsuranceDetailWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('InsuranceDetailScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.insuranceDetail.count(args as any)
    },
  },
)
