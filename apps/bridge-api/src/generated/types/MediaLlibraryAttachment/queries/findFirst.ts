import { queryField, list } from 'nexus'

export const MediaLlibraryAttachmentFindFirstQuery = queryField(
  'findFirstMediaLlibraryAttachment',
  {
    type: 'MediaLlibraryAttachment',
    args: {
      where: 'MediaLlibraryAttachmentWhereInput',
      orderBy: list('MediaLlibraryAttachmentOrderByWithRelationInput'),
      cursor: 'MediaLlibraryAttachmentWhereUniqueInput',
      distinct: 'MediaLlibraryAttachmentScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.mediaLlibraryAttachment.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
