import { mutationField, nonNull } from 'nexus'

export const XeroIntegrationUpsertOneMutation = mutationField(
  'upsertOneXeroIntegration',
  {
    type: nonNull('XeroIntegration'),
    args: {
      where: nonNull('XeroIntegrationWhereUniqueInput'),
      create: nonNull('XeroIntegrationCreateInput'),
      update: nonNull('XeroIntegrationUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.xeroIntegration.upsert({
        ...args,
        ...select,
      })
    },
  },
)
