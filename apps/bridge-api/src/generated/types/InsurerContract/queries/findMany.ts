import { queryField, nonNull, list } from 'nexus'

export const InsurerContractFindManyQuery = queryField(
  'findManyInsurerContract',
  {
    type: nonNull(list(nonNull('InsurerContract'))),
    args: {
      where: 'InsurerContractWhereInput',
      orderBy: list('InsurerContractOrderByInput'),
      cursor: 'InsurerContractWhereUniqueInput',
      distinct: 'InsurerContractScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.insurerContract.findMany({
        ...args,
        ...select,
      })
    },
  },
)
