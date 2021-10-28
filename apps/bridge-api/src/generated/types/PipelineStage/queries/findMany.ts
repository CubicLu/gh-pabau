import { queryField, nonNull, list } from 'nexus'

export const PipelineStageFindManyQuery = queryField('findManyPipelineStage', {
  type: nonNull(list(nonNull('PipelineStage'))),
  args: {
    where: 'PipelineStageWhereInput',
    orderBy: list('PipelineStageOrderByWithRelationInput'),
    cursor: 'PipelineStageWhereUniqueInput',
    distinct: 'PipelineStageScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pipelineStage.findMany({
      ...args,
      ...select,
    })
  },
})
