import { mutationField, nonNull } from 'nexus'

export const TemplateFolderUpdateManyMutation = mutationField(
  'updateManyTemplateFolder',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'TemplateFolderWhereInput',
      data: nonNull('TemplateFolderUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.templateFolder.updateMany(args as any)
    },
  },
)
