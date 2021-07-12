import { mutationField, nonNull } from 'nexus'

export const CompanyVariableUpsertOneMutation = mutationField(
  'upsertOneCompanyVariable',
  {
    type: nonNull('CompanyVariable'),
    args: {
      where: nonNull('CompanyVariableWhereUniqueInput'),
      create: nonNull('CompanyVariableCreateInput'),
      update: nonNull('CompanyVariableUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyVariable.upsert({
        ...args,
        ...select,
      })
    },
  },
)
