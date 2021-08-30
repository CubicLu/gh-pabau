import { mutationField, nonNull } from 'nexus'

export const CompanyPermissionUpdateOneMutation = mutationField(
  'updateOneCompanyPermission',
  {
    type: nonNull('CompanyPermission'),
    args: {
      where: nonNull('CompanyPermissionWhereUniqueInput'),
      data: nonNull('CompanyPermissionUpdateInput'),
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
