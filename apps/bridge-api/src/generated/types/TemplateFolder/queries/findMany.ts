import { queryField, nonNull, list } from 'nexus'

export const TemplateFolderFindManyQuery = queryField(
  'findManyTemplateFolder',
  {
    type: nonNull(list(nonNull('TemplateFolder'))),
    args: {
      where: 'TemplateFolderWhereInput',
      orderBy: list('TemplateFolderOrderByWithRelationInput'),
      cursor: 'TemplateFolderWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('TemplateFolderScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.templateFolder.findMany({
        ...args,
        ...select,
      })
    },
  },
)
