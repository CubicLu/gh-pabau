import { queryField, nonNull, list } from 'nexus'

export const CompanyPermissionFindManyQuery = queryField(
  'findManyCompanyPermission',
  {
    type: nonNull(list(nonNull('CompanyPermission'))),
    args: {
      where: 'CompanyPermissionWhereInput',
      orderBy: list('CompanyPermissionOrderByInput'),
      cursor: 'CompanyPermissionWhereUniqueInput',
      distinct: 'CompanyPermissionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyPermission.findMany({
        ...args,
        ...select,
      })
    },
  },
)
