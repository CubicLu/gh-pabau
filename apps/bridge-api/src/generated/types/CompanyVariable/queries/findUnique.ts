import { queryField, nonNull } from 'nexus'

export const CompanyVariableFindUniqueQuery = queryField(
  'findUniqueCompanyVariable',
  {
    type: 'CompanyVariable',
    args: {
      where: nonNull('CompanyVariableWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.companyVariable.findUnique({
        where,
        ...select,
      })
    },
  },
)
