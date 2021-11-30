import { queryField, nonNull, list } from 'nexus'

export const MediaLlibraryAttachmentFindManyQuery = queryField(
  'findManyMediaLlibraryAttachment',
  {
    type: nonNull(list(nonNull('MediaLlibraryAttachment'))),
    args: {
      where: 'MediaLlibraryAttachmentWhereInput',
      orderBy: list('MediaLlibraryAttachmentOrderByWithRelationInput'),
      cursor: 'MediaLlibraryAttachmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('MediaLlibraryAttachmentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.mediaLlibraryAttachment.findMany({
        ...args,
        ...select,
      })
    },
  },
)
