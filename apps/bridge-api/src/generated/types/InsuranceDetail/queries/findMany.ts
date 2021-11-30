import { queryField, nonNull, list } from 'nexus'

export const InsuranceDetailFindManyQuery = queryField(
  'findManyInsuranceDetail',
  {
    type: nonNull(list(nonNull('InsuranceDetail'))),
    args: {
      where: 'InsuranceDetailWhereInput',
      orderBy: list('InsuranceDetailOrderByWithRelationInput'),
      cursor: 'InsuranceDetailWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('InsuranceDetailScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.insuranceDetail.findMany({
        ...args,
        ...select,
      })
    },
  },
)
