import { mutationField, nonNull } from 'nexus'

export const CompanyPolicyCreateOneMutation = mutationField(
  'createOneCompanyPolicy',
  {
    type: nonNull('CompanyPolicy'),
    args: {
      data: nonNull('CompanyPolicyCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.companyPolicy.create({
        data,
        ...select,
      })
    },
  },
)
