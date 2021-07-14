import { queryField, nonNull } from 'nexus'

export const InsuranceDetailFindUniqueQuery = queryField(
  'findUniqueInsuranceDetail',
  {
    type: 'InsuranceDetail',
    args: {
      where: nonNull('InsuranceDetailWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.insuranceDetail.findUnique({
        where,
        ...select,
      })
    },
  },
)
