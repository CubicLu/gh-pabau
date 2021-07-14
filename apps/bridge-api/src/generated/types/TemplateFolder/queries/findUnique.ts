import { queryField, nonNull } from 'nexus'

export const TemplateFolderFindUniqueQuery = queryField(
  'findUniqueTemplateFolder',
  {
    type: 'TemplateFolder',
    args: {
      where: nonNull('TemplateFolderWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.templateFolder.findUnique({
        where,
        ...select,
      })
    },
  },
)
