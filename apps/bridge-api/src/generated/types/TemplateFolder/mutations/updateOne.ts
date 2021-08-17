import { mutationField, nonNull } from 'nexus'

export const TemplateFolderUpdateOneMutation = mutationField(
  'updateOneTemplateFolder',
  {
    type: nonNull('TemplateFolder'),
    args: {
      where: nonNull('TemplateFolderWhereUniqueInput'),
      data: nonNull('TemplateFolderUpdateInput'),
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
