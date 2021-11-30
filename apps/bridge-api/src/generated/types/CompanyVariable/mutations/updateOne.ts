import { mutationField, nonNull } from 'nexus'

export const CompanyVariableUpdateOneMutation = mutationField(
  'updateOneCompanyVariable',
  {
    type: nonNull('CompanyVariable'),
    args: {
      data: nonNull('CompanyVariableUpdateInput'),
      where: nonNull('CompanyVariableWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.companyVariable.update({
        where,
        data,
        ...select,
      })
    },
  },
)
