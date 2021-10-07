import { queryField, list } from 'nexus'

export const CompanyPermissionFindFirstQuery = queryField(
  'findFirstCompanyPermission',
  {
    type: 'CompanyPermission',
    args: {
      where: 'CompanyPermissionWhereInput',
      orderBy: list('CompanyPermissionOrderByWithRelationInput'),
      cursor: 'CompanyPermissionWhereUniqueInput',
      distinct: 'CompanyPermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyPermission.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
