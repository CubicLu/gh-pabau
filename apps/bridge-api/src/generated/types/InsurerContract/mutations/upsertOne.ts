import { mutationField, nonNull } from 'nexus'

export const InsurerContractUpsertOneMutation = mutationField(
  'upsertOneInsurerContract',
  {
    type: nonNull('InsurerContract'),
    args: {
      where: nonNull('InsurerContractWhereUniqueInput'),
      create: nonNull('InsurerContractCreateInput'),
      update: nonNull('InsurerContractUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.insurerContract.upsert({
        ...args,
        ...select,
      })
    },
  },
)
