import { queryField, list } from 'nexus'

export const TemplateFolderAggregateQuery = queryField(
  'aggregateTemplateFolder',
  {
    type: 'AggregateTemplateFolder',
    args: {
      where: 'TemplateFolderWhereInput',
      orderBy: list('TemplateFolderOrderByWithRelationInput'),
      cursor: 'TemplateFolderWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.templateFolder.aggregate({ ...args, ...select }) as any
    },
  },
)
