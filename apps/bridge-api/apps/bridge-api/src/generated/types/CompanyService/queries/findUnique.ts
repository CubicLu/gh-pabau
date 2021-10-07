import { queryField, nonNull } from 'nexus'

export const CompanyServiceFindUniqueQuery = queryField(
  'findUniqueCompanyService',
  {
    type: 'CompanyService',
    args: {
      where: nonNull('CompanyServiceWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.companyService.findUnique({
        where,
        ...select,
      })
    },
  },
)
