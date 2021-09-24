import { mutationField, nonNull } from 'nexus'

export const InsurerContractUpdateOneMutation = mutationField(
  'updateOneInsurerContract',
  {
    type: nonNull('InsurerContract'),
    args: {
      where: nonNull('InsurerContractWhereUniqueInput'),
      data: nonNull('InsurerContractUpdateInput'),
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
