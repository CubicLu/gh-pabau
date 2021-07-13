import { mutationField, nonNull } from 'nexus'

export const XeroIntegrationDeleteOneMutation = mutationField(
  'deleteOneXeroIntegration',
  {
    type: 'XeroIntegration',
    args: {
      where: nonNull('XeroIntegrationWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.xeroIntegration.delete({
        where,
        ...select,
      })
    },
  },
)
