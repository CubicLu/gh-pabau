import { queryField, nonNull } from 'nexus'

export const InsurerContractFindUniqueQuery = queryField(
  'findUniqueInsurerContract',
  {
    type: 'InsurerContract',
    args: {
      where: nonNull('InsurerContractWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.insurerContract.findUnique({
        where,
        ...select,
      })
    },
  },
)
