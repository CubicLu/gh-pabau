import { queryField, nonNull, list } from 'nexus'

export const InsurerContractFindManyQuery = queryField(
  'findManyInsurerContract',
  {
    type: nonNull(list(nonNull('InsurerContract'))),
    args: {
      where: 'InsurerContractWhereInput',
      orderBy: list('InsurerContractOrderByWithRelationInput'),
      cursor: 'InsurerContractWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('InsurerContractScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.insurerContract.findMany({
        ...args,
        ...select,
      })
    },
  },
)
