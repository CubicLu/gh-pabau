import { mutationField, nonNull } from 'nexus'

export const CompanyPermissionUpdateOneMutation = mutationField(
  'updateOneCompanyPermission',
  {
    type: nonNull('CompanyPermission'),
    args: {
      data: nonNull('CompanyPermissionUpdateInput'),
      where: nonNull('CompanyPermissionWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.companyPermission.update({
        where,
        data,
        ...select,
      })
    },
  },
)
