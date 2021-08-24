import { mutationField, nonNull } from 'nexus'

export const MediaLlibraryAttachmentUpdateManyMutation = mutationField(
  'updateManyMediaLlibraryAttachment',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'MediaLlibraryAttachmentWhereInput',
      data: nonNull('MediaLlibraryAttachmentUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.mediaLlibraryAttachment.updateMany(args as any)
    },
  },
)
