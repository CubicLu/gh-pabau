import { mutationField, nonNull } from 'nexus'

export const TemplateFolderDeleteOneMutation = mutationField(
  'deleteOneTemplateFolder',
  {
    type: 'TemplateFolder',
    args: {
      where: nonNull('TemplateFolderWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.templateFolder.delete({
        where,
        ...select,
      })
    },
  },
)
