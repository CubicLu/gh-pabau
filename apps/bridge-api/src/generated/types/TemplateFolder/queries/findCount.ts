import { queryField, nonNull, list } from 'nexus'

export const TemplateFolderFindCountQuery = queryField(
  'findManyTemplateFolderCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'TemplateFolderWhereInput',
      orderBy: list('TemplateFolderOrderByWithRelationInput'),
      cursor: 'TemplateFolderWhereUniqueInput',
      distinct: 'TemplateFolderScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.templateFolder.count(args as any)
    },
  },
)
