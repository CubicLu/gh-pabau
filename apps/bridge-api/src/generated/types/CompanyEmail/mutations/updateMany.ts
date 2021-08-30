import { mutationField, nonNull } from 'nexus'

export const CompanyEmailUpdateManyMutation = mutationField(
  'updateManyCompanyEmail',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CompanyEmailWhereInput',
      data: nonNull('CompanyEmailUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyEmail.updateMany(args as any)
    },
  },
)
