import { queryField, nonNull, list } from 'nexus'

export const PipelineStageFindManyQuery = queryField('findManyPipelineStage', {
  type: nonNull(list(nonNull('PipelineStage'))),
  args: {
    where: 'PipelineStageWhereInput',
    orderBy: list('PipelineStageOrderByWithRelationInput'),
    cursor: 'PipelineStageWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PipelineStageScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pipelineStage.findMany({
      ...args,
      ...select,
    })
  },
})
