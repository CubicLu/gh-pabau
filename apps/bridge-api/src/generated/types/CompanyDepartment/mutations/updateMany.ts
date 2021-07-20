import { mutationField, nonNull } from 'nexus'

export const CompanyDepartmentUpdateManyMutation = mutationField(
  'updateManyCompanyDepartment',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CompanyDepartmentWhereInput',
      data: nonNull('CompanyDepartmentUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyDepartment.updateMany(args as any)
    },
  },
)
