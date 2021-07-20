import { mutationField, nonNull } from 'nexus'

export const XeroIntegrationUpdateOneMutation = mutationField(
  'updateOneXeroIntegration',
  {
    type: nonNull('XeroIntegration'),
    args: {
      where: nonNull('XeroIntegrationWhereUniqueInput'),
      data: nonNull('XeroIntegrationUpdateInput'),
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
