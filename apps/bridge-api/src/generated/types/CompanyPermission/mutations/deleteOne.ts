import { mutationField, nonNull } from 'nexus'

export const CompanyPermissionDeleteOneMutation = mutationField(
  'deleteOneCompanyPermission',
  {
    type: 'CompanyPermission',
    args: {
      where: nonNull('CompanyPermissionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.companyPermission.delete({
        where,
        ...select,
      })
    },
  },
)
