import { mutationField, nonNull } from 'nexus'

export const MediaLlibraryAttachmentUpdateOneMutation = mutationField(
  'updateOneMediaLlibraryAttachment',
  {
    type: nonNull('MediaLlibraryAttachment'),
    args: {
      data: nonNull('MediaLlibraryAttachmentUpdateInput'),
      where: nonNull('MediaLlibraryAttachmentWhereUniqueInput'),
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
