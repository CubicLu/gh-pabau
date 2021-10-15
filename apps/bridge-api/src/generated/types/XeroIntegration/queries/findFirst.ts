import { queryField, list } from 'nexus'

export const XeroIntegrationFindFirstQuery = queryField(
  'findFirstXeroIntegration',
  {
    type: 'XeroIntegration',
    args: {
      where: 'XeroIntegrationWhereInput',
      orderBy: list('XeroIntegrationOrderByInput'),
      cursor: 'XeroIntegrationWhereUniqueInput',
      distinct: 'XeroIntegrationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.xeroIntegration.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
