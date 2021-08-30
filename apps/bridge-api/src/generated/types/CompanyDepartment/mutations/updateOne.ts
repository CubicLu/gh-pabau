import { mutationField, nonNull } from 'nexus'

export const CompanyDepartmentUpdateOneMutation = mutationField(
  'updateOneCompanyDepartment',
  {
    type: nonNull('CompanyDepartment'),
    args: {
      where: nonNull('CompanyDepartmentWhereUniqueInput'),
      data: nonNull('CompanyDepartmentUpdateInput'),
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
