import { mutationField, nonNull } from 'nexus'

export const InsurerContractUpdateManyMutation = mutationField(
  'updateManyInsurerContract',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('InsurerContractUpdateManyMutationInput'),
      where: 'InsurerContractWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.insurerContract.updateMany(args as any)
    },
  },
)
