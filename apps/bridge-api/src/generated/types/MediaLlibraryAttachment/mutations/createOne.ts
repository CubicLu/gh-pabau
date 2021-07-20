import { mutationField, nonNull } from 'nexus'

export const MediaLlibraryAttachmentCreateOneMutation = mutationField(
  'createOneMediaLlibraryAttachment',
  {
    type: nonNull('MediaLlibraryAttachment'),
    args: {
      data: nonNull('MediaLlibraryAttachmentCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.mediaLlibraryAttachment.create({
        data,
        ...select,
      })
    },
  },
)
