import { queryField, nonNull, list } from 'nexus'

export const InsurerContractFindCountQuery = queryField(
  'findManyInsurerContractCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'InsurerContractWhereInput',
      orderBy: list('InsurerContractOrderByWithRelationInput'),
      cursor: 'InsurerContractWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('InsurerContractScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.insurerContract.count(args as any)
    },
  },
)
