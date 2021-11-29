import { mutationField, nonNull } from 'nexus'

export const TemplateFolderUpdateOneMutation = mutationField(
  'updateOneTemplateFolder',
  {
    type: nonNull('TemplateFolder'),
    args: {
      data: nonNull('TemplateFolderUpdateInput'),
      where: nonNull('TemplateFolderWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.templateFolder.update({
        where,
        data,
        ...select,
      })
    },
  },
)
