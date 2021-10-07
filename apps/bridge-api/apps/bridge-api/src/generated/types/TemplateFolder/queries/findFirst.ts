import { queryField, list } from 'nexus'

export const TemplateFolderFindFirstQuery = queryField(
  'findFirstTemplateFolder',
  {
    type: 'TemplateFolder',
    args: {
      where: 'TemplateFolderWhereInput',
      orderBy: list('TemplateFolderOrderByWithRelationInput'),
      cursor: 'TemplateFolderWhereUniqueInput',
      distinct: 'TemplateFolderScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.templateFolder.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
