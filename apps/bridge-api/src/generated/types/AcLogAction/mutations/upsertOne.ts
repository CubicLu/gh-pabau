import { mutationField, nonNull } from 'nexus'

export const AcLogActionUpsertOneMutation = mutationField(
  'upsertOneAcLogAction',
  {
    type: nonNull('AcLogAction'),
    args: {
      where: nonNull('AcLogActionWhereUniqueInput'),
      create: nonNull('AcLogActionCreateInput'),
      update: nonNull('AcLogActionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.acLogAction.upsert({
        ...args,
        ...select,
      })
    },
  },
)
