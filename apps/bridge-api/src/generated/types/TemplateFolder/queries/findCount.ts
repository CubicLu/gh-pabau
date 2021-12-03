import { queryField, nonNull, list } from 'nexus'

export const TemplateFolderFindCountQuery = queryField(
  'findManyTemplateFolderCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'TemplateFolderWhereInput',
      orderBy: list('TemplateFolderOrderByWithRelationInput'),
      cursor: 'TemplateFolderWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('TemplateFolderScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.templateFolder.count(args as any)
    },
  },
)
