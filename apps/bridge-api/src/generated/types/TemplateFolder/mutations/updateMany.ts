import { mutationField, nonNull } from 'nexus'

export const TemplateFolderUpdateManyMutation = mutationField(
  'updateManyTemplateFolder',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('TemplateFolderUpdateManyMutationInput'),
      where: 'TemplateFolderWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.templateFolder.updateMany(args as any)
    },
  },
)
