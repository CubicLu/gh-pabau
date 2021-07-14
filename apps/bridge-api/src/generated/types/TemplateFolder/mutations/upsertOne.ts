import { mutationField, nonNull } from 'nexus'

export const TemplateFolderUpsertOneMutation = mutationField(
  'upsertOneTemplateFolder',
  {
    type: nonNull('TemplateFolder'),
    args: {
      where: nonNull('TemplateFolderWhereUniqueInput'),
      create: nonNull('TemplateFolderCreateInput'),
      update: nonNull('TemplateFolderUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.templateFolder.upsert({
        ...args,
        ...select,
      })
    },
  },
)
