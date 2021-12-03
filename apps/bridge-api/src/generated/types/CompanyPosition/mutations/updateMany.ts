import { mutationField, nonNull } from 'nexus'

export const CompanyPositionUpdateManyMutation = mutationField(
  'updateManyCompanyPosition',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CompanyPositionUpdateManyMutationInput'),
      where: 'CompanyPositionWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyPosition.updateMany(args as any)
    },
  },
)
