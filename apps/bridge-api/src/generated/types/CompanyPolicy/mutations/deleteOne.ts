import { mutationField, nonNull } from 'nexus'

export const CompanyPolicyDeleteOneMutation = mutationField(
  'deleteOneCompanyPolicy',
  {
    type: 'CompanyPolicy',
    args: {
      where: nonNull('CompanyPolicyWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.companyPolicy.delete({
        where,
        ...select,
      })
    },
  },
)
