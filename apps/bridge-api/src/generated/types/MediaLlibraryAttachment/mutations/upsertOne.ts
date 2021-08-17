import { mutationField, nonNull } from 'nexus'

export const MediaLlibraryAttachmentUpsertOneMutation = mutationField(
  'upsertOneMediaLlibraryAttachment',
  {
    type: nonNull('MediaLlibraryAttachment'),
    args: {
      where: nonNull('MediaLlibraryAttachmentWhereUniqueInput'),
      create: nonNull('MediaLlibraryAttachmentCreateInput'),
      update: nonNull('MediaLlibraryAttachmentUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.mediaLlibraryAttachment.upsert({
        ...args,
        ...select,
      })
    },
  },
)
