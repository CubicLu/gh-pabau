import { queryField, nonNull } from 'nexus'

export const CompanyLogFindUniqueQuery = queryField('findUniqueCompanyLog', {
  type: 'CompanyLog',
  args: {
    where: nonNull('CompanyLogWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.companyLog.findUnique({
      where,
      ...select,
    })
  },
})
