import { queryField, nonNull } from 'nexus'

export const CompanyLocationFindUniqueQuery = queryField(
  'findUniqueCompanyLocation',
  {
    type: 'CompanyLocation',
    args: {
      where: nonNull('CompanyLocationWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.companyLocation.findUnique({
        where,
        ...select,
      })
    },
  },
)
