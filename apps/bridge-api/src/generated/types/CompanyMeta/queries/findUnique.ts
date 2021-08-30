import { queryField, nonNull } from 'nexus'

export const CompanyMetaFindUniqueQuery = queryField('findUniqueCompanyMeta', {
  type: 'CompanyMeta',
  args: {
    where: nonNull('CompanyMetaWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.companyMeta.findUnique({
      where,
      ...select,
    })
  },
})
