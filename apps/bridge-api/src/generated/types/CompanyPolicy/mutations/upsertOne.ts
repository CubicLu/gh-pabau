import { mutationField, nonNull } from 'nexus'

export const CompanyPolicyUpsertOneMutation = mutationField(
  'upsertOneCompanyPolicy',
  {
    type: nonNull('CompanyPolicy'),
    args: {
      where: nonNull('CompanyPolicyWhereUniqueInput'),
      create: nonNull('CompanyPolicyCreateInput'),
      update: nonNull('CompanyPolicyUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyPolicy.upsert({
        ...args,
        ...select,
      })
    },
  },
)
