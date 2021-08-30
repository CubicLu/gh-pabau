import { mutationField, nonNull } from 'nexus'

export const CompanyDepartmentDeleteOneMutation = mutationField(
  'deleteOneCompanyDepartment',
  {
    type: 'CompanyDepartment',
    args: {
      where: nonNull('CompanyDepartmentWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.companyDepartment.delete({
        where,
        ...select,
      })
    },
  },
)
