import { queryField, list } from 'nexus'

export const CompanyPermissionFindFirstQuery = queryField(
  'findFirstCompanyPermission',
  {
    type: 'CompanyPermission',
    args: {
      where: 'CompanyPermissionWhereInput',
      orderBy: list('CompanyPermissionOrderByWithRelationInput'),
      cursor: 'CompanyPermissionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyPermissionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyPermission.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
