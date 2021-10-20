import { queryField, list } from 'nexus'

export const InsurerContractFindFirstQuery = queryField(
  'findFirstInsurerContract',
  {
    type: 'InsurerContract',
    args: {
      where: 'InsurerContractWhereInput',
      orderBy: list('InsurerContractOrderByWithRelationInput'),
      cursor: 'InsurerContractWhereUniqueInput',
      distinct: 'InsurerContractScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.insurerContract.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
