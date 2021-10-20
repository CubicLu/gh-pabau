import { mutationField, nonNull } from 'nexus'

export const PathwayStepUpsertOneMutation = mutationField(
  'upsertOnePathwayStep',
  {
    type: nonNull('PathwayStep'),
    args: {
      where: nonNull('PathwayStepWhereUniqueInput'),
      create: nonNull('PathwayStepCreateInput'),
      update: nonNull('PathwayStepUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pathwayStep.upsert({
        ...args,
        ...select,
      })
    },
  },
)
