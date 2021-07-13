import { queryField, nonNull } from 'nexus'

export const MediaLlibraryAttachmentFindUniqueQuery = queryField(
  'findUniqueMediaLlibraryAttachment',
  {
    type: 'MediaLlibraryAttachment',
    args: {
      where: nonNull('MediaLlibraryAttachmentWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.mediaLlibraryAttachment.findUnique({
        where,
        ...select,
      })
    },
  },
)
