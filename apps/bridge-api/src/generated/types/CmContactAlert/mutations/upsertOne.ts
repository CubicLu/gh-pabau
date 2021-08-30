import { mutationField, nonNull } from 'nexus'

export const CmContactAlertUpsertOneMutation = mutationField(
  'upsertOneCmContactAlert',
  {
    type: nonNull('CmContactAlert'),
    args: {
      where: nonNull('CmContactAlertWhereUniqueInput'),
      create: nonNull('CmContactAlertCreateInput'),
      update: nonNull('CmContactAlertUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactAlert.upsert({
        ...args,
        ...select,
      })
    },
  },
)
