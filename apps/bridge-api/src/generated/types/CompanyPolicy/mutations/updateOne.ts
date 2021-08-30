import { mutationField, nonNull } from 'nexus'

export const CompanyPolicyUpdateOneMutation = mutationField(
  'updateOneCompanyPolicy',
  {
    type: nonNull('CompanyPolicy'),
    args: {
      where: nonNull('CompanyPolicyWhereUniqueInput'),
      data: nonNull('CompanyPolicyUpdateInput'),
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
