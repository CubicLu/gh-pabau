import { queryField, list } from 'nexus'

export const InsuranceDetailFindFirstQuery = queryField(
  'findFirstInsuranceDetail',
  {
    type: 'InsuranceDetail',
    args: {
      where: 'InsuranceDetailWhereInput',
      orderBy: list('InsuranceDetailOrderByWithRelationInput'),
      cursor: 'InsuranceDetailWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('InsuranceDetailScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.insuranceDetail.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
