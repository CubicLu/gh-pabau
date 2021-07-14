import { mutationField, nonNull } from 'nexus'

export const CompanyVariableUpdateOneMutation = mutationField(
  'updateOneCompanyVariable',
  {
    type: nonNull('CompanyVariable'),
    args: {
      where: nonNull('CompanyVariableWhereUniqueInput'),
      data: nonNull('CompanyVariableUpdateInput'),
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
