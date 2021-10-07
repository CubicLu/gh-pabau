import { queryField, nonNull } from 'nexus'

export const XeroIntegrationFindUniqueQuery = queryField(
  'findUniqueXeroIntegration',
  {
    type: 'XeroIntegration',
    args: {
      where: nonNull('XeroIntegrationWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.xeroIntegration.findUnique({
        where,
        ...select,
      })
    },
  },
)
