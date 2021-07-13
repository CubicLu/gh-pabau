import { mutationField, nonNull } from 'nexus'

export const XeroIntegrationCreateOneMutation = mutationField(
  'createOneXeroIntegration',
  {
    type: nonNull('XeroIntegration'),
    args: {
      data: nonNull('XeroIntegrationCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.xeroIntegration.create({
        data,
        ...select,
      })
    },
  },
)
