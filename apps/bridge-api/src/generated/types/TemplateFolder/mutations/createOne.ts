import { mutationField, nonNull } from 'nexus'

export const TemplateFolderCreateOneMutation = mutationField(
  'createOneTemplateFolder',
  {
    type: nonNull('TemplateFolder'),
    args: {
      data: nonNull('TemplateFolderCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.templateFolder.create({
        data,
        ...select,
      })
    },
  },
)
