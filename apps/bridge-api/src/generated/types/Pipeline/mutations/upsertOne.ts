import { mutationField, nonNull } from 'nexus'

export const PipelineUpsertOneMutation = mutationField('upsertOnePipeline', {
  type: nonNull('Pipeline'),
  args: {
    where: nonNull('PipelineWhereUniqueInput'),
    create: nonNull('PipelineCreateInput'),
    update: nonNull('PipelineUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pipeline.upsert({
      ...args,
      ...select,
    })
  },
})
