import { queryField, list } from 'nexus'

export const MediaLlibraryAttachmentFindFirstQuery = queryField(
  'findFirstMediaLlibraryAttachment',
  {
    type: 'MediaLlibraryAttachment',
    args: {
      where: 'MediaLlibraryAttachmentWhereInput',
      orderBy: list('MediaLlibraryAttachmentOrderByWithRelationInput'),
      cursor: 'MediaLlibraryAttachmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('MediaLlibraryAttachmentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.mediaLlibraryAttachment.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
