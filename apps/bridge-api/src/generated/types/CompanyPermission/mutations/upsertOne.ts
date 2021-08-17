import { mutationField, nonNull } from 'nexus'

export const CompanyPermissionUpsertOneMutation = mutationField(
  'upsertOneCompanyPermission',
  {
    type: nonNull('CompanyPermission'),
    args: {
      where: nonNull('CompanyPermissionWhereUniqueInput'),
      create: nonNull('CompanyPermissionCreateInput'),
      update: nonNull('CompanyPermissionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyPermission.upsert({
        ...args,
        ...select,
      })
    },
  },
)
