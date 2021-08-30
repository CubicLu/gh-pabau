import { mutationField, nonNull } from 'nexus'

export const CompanyPermissionCreateOneMutation = mutationField(
  'createOneCompanyPermission',
  {
    type: nonNull('CompanyPermission'),
    args: {
      data: nonNull('CompanyPermissionCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.companyPermission.create({
        data,
        ...select,
      })
    },
  },
)
