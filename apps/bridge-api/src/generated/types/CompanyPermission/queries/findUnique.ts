import { queryField, nonNull } from 'nexus'

export const CompanyPermissionFindUniqueQuery = queryField(
  'findUniqueCompanyPermission',
  {
    type: 'CompanyPermission',
    args: {
      where: nonNull('CompanyPermissionWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.companyPermission.findUnique({
        where,
        ...select,
      })
    },
  },
)
