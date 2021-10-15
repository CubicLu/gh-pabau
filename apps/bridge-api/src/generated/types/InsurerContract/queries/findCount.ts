import { queryField, nonNull, list } from 'nexus'

export const InsurerContractFindCountQuery = queryField(
  'findManyInsurerContractCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'InsurerContractWhereInput',
      orderBy: list('InsurerContractOrderByInput'),
      cursor: 'InsurerContractWhereUniqueInput',
      distinct: 'InsurerContractScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.insurerContract.count(args as any)
    },
  },
)
