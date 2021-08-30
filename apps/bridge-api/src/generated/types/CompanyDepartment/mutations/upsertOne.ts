import { mutationField, nonNull } from 'nexus'

export const CompanyDepartmentUpsertOneMutation = mutationField(
  'upsertOneCompanyDepartment',
  {
    type: nonNull('CompanyDepartment'),
    args: {
      where: nonNull('CompanyDepartmentWhereUniqueInput'),
      create: nonNull('CompanyDepartmentCreateInput'),
      update: nonNull('CompanyDepartmentUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyDepartment.upsert({
        ...args,
        ...select,
      })
    },
  },
)
