import { mutationField, nonNull } from 'nexus'

export const AttachmentHelperLiteDeleteOneMutation = mutationField(
  'deleteOneAttachmentHelperLite',
  {
    type: 'AttachmentHelperLite',
    args: {
      where: nonNull('AttachmentHelperLiteWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.attachmentHelperLite.delete({
        where,
        ...select,
      })
    },
  },
)
