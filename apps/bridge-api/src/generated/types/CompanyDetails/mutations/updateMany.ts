import { mutationField, nonNull } from 'nexus'

export const CompanyDetailsUpdateManyMutation = mutationField(
  'updateManyCompanyDetails',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CompanyDetailsWhereInput',
      data: nonNull('CompanyDetailsUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyDetails.updateMany(args as any)
    },
  },
)
