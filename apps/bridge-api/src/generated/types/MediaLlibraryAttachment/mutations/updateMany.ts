import { mutationField, nonNull } from 'nexus'

export const MediaLlibraryAttachmentUpdateManyMutation = mutationField(
  'updateManyMediaLlibraryAttachment',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('MediaLlibraryAttachmentUpdateManyMutationInput'),
      where: 'MediaLlibraryAttachmentWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.mediaLlibraryAttachment.updateMany(args as any)
    },
  },
)
