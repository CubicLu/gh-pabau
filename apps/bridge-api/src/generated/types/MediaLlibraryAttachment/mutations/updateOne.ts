import { mutationField, nonNull } from 'nexus'

export const MediaLlibraryAttachmentUpdateOneMutation = mutationField(
  'updateOneMediaLlibraryAttachment',
  {
    type: nonNull('MediaLlibraryAttachment'),
    args: {
      where: nonNull('MediaLlibraryAttachmentWhereUniqueInput'),
      data: nonNull('MediaLlibraryAttachmentUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.mediaLlibraryAttachment.update({
        where,
        data,
        ...select,
      })
    },
  },
)
