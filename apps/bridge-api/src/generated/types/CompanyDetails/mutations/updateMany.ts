import { mutationField, nonNull } from 'nexus'

export const CompanyDetailsUpdateManyMutation = mutationField(
  'updateManyCompanyDetails',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CompanyDetailsUpdateManyMutationInput'),
      where: 'CompanyDetailsWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyDetails.updateMany(args as any)
    },
  },
)
