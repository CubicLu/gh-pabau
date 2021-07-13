import { mutationField, nonNull } from 'nexus'

export const CompanyDepartmentCreateOneMutation = mutationField(
  'createOneCompanyDepartment',
  {
    type: nonNull('CompanyDepartment'),
    args: {
      data: nonNull('CompanyDepartmentCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.companyDepartment.create({
        data,
        ...select,
      })
    },
  },
)
