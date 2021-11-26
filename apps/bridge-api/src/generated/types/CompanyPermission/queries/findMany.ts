import { queryField, nonNull, list } from 'nexus'

export const CompanyPermissionFindManyQuery = queryField(
  'findManyCompanyPermission',
  {
    type: nonNull(list(nonNull('CompanyPermission'))),
    args: {
      where: 'CompanyPermissionWhereInput',
      orderBy: list('CompanyPermissionOrderByWithRelationInput'),
      cursor: 'CompanyPermissionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyPermissionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyPermission.findMany({
        ...args,
        ...select,
      })
    },
  },
)
