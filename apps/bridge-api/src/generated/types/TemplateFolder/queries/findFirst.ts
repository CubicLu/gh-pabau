import { queryField, list } from 'nexus'

export const TemplateFolderFindFirstQuery = queryField(
  'findFirstTemplateFolder',
  {
    type: 'TemplateFolder',
    args: {
      where: 'TemplateFolderWhereInput',
      orderBy: list('TemplateFolderOrderByWithRelationInput'),
      cursor: 'TemplateFolderWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('TemplateFolderScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.templateFolder.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
