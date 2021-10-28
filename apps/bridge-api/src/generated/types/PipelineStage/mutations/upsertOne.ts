import { mutationField, nonNull } from 'nexus'

export const PipelineStageUpsertOneMutation = mutationField(
  'upsertOnePipelineStage',
  {
    type: nonNull('PipelineStage'),
    args: {
      where: nonNull('PipelineStageWhereUniqueInput'),
      create: nonNull('PipelineStageCreateInput'),
      update: nonNull('PipelineStageUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pipelineStage.upsert({
        ...args,
        ...select,
      })
    },
  },
)
