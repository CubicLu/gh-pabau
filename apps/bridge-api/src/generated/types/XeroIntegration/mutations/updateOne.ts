import { mutationField, nonNull } from 'nexus'

export const XeroIntegrationUpdateOneMutation = mutationField(
  'updateOneXeroIntegration',
  {
    type: nonNull('XeroIntegration'),
    args: {
      data: nonNull('XeroIntegrationUpdateInput'),
      where: nonNull('XeroIntegrationWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.xeroIntegration.update({
        where,
        data,
        ...select,
      })
    },
  },
)
