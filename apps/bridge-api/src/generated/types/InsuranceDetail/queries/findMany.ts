import { queryField, nonNull, list } from 'nexus'

export const InsuranceDetailFindManyQuery = queryField(
  'findManyInsuranceDetail',
  {
    type: nonNull(list(nonNull('InsuranceDetail'))),
    args: {
      where: 'InsuranceDetailWhereInput',
      orderBy: list('InsuranceDetailOrderByInput'),
      cursor: 'InsuranceDetailWhereUniqueInput',
      distinct: 'InsuranceDetailScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.insuranceDetail.findMany({
        ...args,
        ...select,
      })
    },
  },
)
