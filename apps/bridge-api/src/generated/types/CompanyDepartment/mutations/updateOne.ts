import { mutationField, nonNull } from 'nexus'

export const CompanyDepartmentUpdateOneMutation = mutationField(
  'updateOneCompanyDepartment',
  {
    type: nonNull('CompanyDepartment'),
    args: {
      data: nonNull('CompanyDepartmentUpdateInput'),
      where: nonNull('CompanyDepartmentWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.companyDepartment.update({
        where,
        data,
        ...select,
      })
    },
  },
)
