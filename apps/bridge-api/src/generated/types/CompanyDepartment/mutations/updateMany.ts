import { mutationField, nonNull } from 'nexus'

export const CompanyDepartmentUpdateManyMutation = mutationField(
  'updateManyCompanyDepartment',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CompanyDepartmentUpdateManyMutationInput'),
      where: 'CompanyDepartmentWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyDepartment.updateMany(args as any)
    },
  },
)
