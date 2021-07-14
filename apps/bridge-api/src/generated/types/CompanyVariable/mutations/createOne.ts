import { mutationField, nonNull } from 'nexus'

export const CompanyVariableCreateOneMutation = mutationField(
  'createOneCompanyVariable',
  {
    type: nonNull('CompanyVariable'),
    args: {
      data: nonNull('CompanyVariableCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.companyVariable.create({
        data,
        ...select,
      })
    },
  },
)
