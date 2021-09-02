import { queryField, nonNull, list } from 'nexus'

export const TemplateFolderFindManyQuery = queryField(
  'findManyTemplateFolder',
  {
    type: nonNull(list(nonNull('TemplateFolder'))),
    args: {
      where: 'TemplateFolderWhereInput',
      orderBy: list('TemplateFolderOrderByWithRelationInput'),
      cursor: 'TemplateFolderWhereUniqueInput',
      distinct: 'TemplateFolderScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.templateFolder.findMany({
        ...args,
        ...select,
      })
    },
  },
)
