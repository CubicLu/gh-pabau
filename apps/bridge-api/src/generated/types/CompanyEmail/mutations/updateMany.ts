import { mutationField, nonNull } from 'nexus'

export const CompanyEmailUpdateManyMutation = mutationField(
  'updateManyCompanyEmail',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CompanyEmailUpdateManyMutationInput'),
      where: 'CompanyEmailWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyEmail.updateMany(args as any)
    },
  },
)
