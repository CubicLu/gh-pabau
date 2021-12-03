import { queryField, nonNull, list } from 'nexus'

export const XeroIntegrationFindManyQuery = queryField(
  'findManyXeroIntegration',
  {
    type: nonNull(list(nonNull('XeroIntegration'))),
    args: {
      where: 'XeroIntegrationWhereInput',
      orderBy: list('XeroIntegrationOrderByWithRelationInput'),
      cursor: 'XeroIntegrationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('XeroIntegrationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.xeroIntegration.findMany({
        ...args,
        ...select,
      })
    },
  },
)
