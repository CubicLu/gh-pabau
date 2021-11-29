import { mutationField, nonNull } from 'nexus'

export const InsurerContractUpdateOneMutation = mutationField(
  'updateOneInsurerContract',
  {
    type: nonNull('InsurerContract'),
    args: {
      data: nonNull('InsurerContractUpdateInput'),
      where: nonNull('InsurerContractWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.insurerContract.update({
        where,
        data,
        ...select,
      })
    },
  },
)
