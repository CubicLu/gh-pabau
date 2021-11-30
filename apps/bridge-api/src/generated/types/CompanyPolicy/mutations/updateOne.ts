import { mutationField, nonNull } from 'nexus'

export const CompanyPolicyUpdateOneMutation = mutationField(
  'updateOneCompanyPolicy',
  {
    type: nonNull('CompanyPolicy'),
    args: {
      data: nonNull('CompanyPolicyUpdateInput'),
      where: nonNull('CompanyPolicyWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.companyPolicy.update({
        where,
        data,
        ...select,
      })
    },
  },
)
