import { queryField, list } from 'nexus'

export const XeroIntegrationFindFirstQuery = queryField(
  'findFirstXeroIntegration',
  {
    type: 'XeroIntegration',
    args: {
      where: 'XeroIntegrationWhereInput',
      orderBy: list('XeroIntegrationOrderByWithRelationInput'),
      cursor: 'XeroIntegrationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('XeroIntegrationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.xeroIntegration.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
