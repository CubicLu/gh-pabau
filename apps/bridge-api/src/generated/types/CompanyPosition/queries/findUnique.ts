import { queryField, nonNull } from 'nexus'

export const CompanyPositionFindUniqueQuery = queryField(
  'findUniqueCompanyPosition',
  {
    type: 'CompanyPosition',
    args: {
      where: nonNull('CompanyPositionWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.companyPosition.findUnique({
        where,
        ...select,
      })
    },
  },
)
