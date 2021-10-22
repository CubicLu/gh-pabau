import { mutationField, nonNull } from 'nexus'

export const InsurerContractUpdateManyMutation = mutationField(
  'updateManyInsurerContract',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'InsurerContractWhereInput',
      data: nonNull('InsurerContractUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.insurerContract.updateMany(args as any)
    },
  },
)
