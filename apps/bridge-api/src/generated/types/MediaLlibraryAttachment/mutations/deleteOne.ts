import { mutationField, nonNull } from 'nexus'

export const MediaLlibraryAttachmentDeleteOneMutation = mutationField(
  'deleteOneMediaLlibraryAttachment',
  {
    type: 'MediaLlibraryAttachment',
    args: {
      where: nonNull('MediaLlibraryAttachmentWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.mediaLlibraryAttachment.delete({
        where,
        ...select,
      })
    },
  },
)
