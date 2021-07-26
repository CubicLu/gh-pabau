import { mutationField, nonNull } from 'nexus'

export const CompanyEmailUpsertOneMutation = mutationField(
  'upsertOneCompanyEmail',
  {
    type: nonNull('CompanyEmail'),
    args: {
      where: nonNull('CompanyEmailWhereUniqueInput'),
      create: nonNull('CompanyEmailCreateInput'),
      update: nonNull('CompanyEmailUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyEmail.upsert({
        ...args,
        ...select,
      })
    },
  },
)
