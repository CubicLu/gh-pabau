import { mutationField, nonNull } from 'nexus'

export const CompanyPositionUpdateManyMutation = mutationField(
  'updateManyCompanyPosition',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CompanyPositionWhereInput',
      data: nonNull('CompanyPositionUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyPosition.updateMany(args as any)
    },
  },
)
