import { queryField, nonNull, list } from 'nexus'

export const MediaLlibraryAttachmentFindManyQuery = queryField(
  'findManyMediaLlibraryAttachment',
  {
    type: nonNull(list(nonNull('MediaLlibraryAttachment'))),
    args: {
      where: 'MediaLlibraryAttachmentWhereInput',
      orderBy: list('MediaLlibraryAttachmentOrderByWithRelationInput'),
      cursor: 'MediaLlibraryAttachmentWhereUniqueInput',
      distinct: 'MediaLlibraryAttachmentScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.mediaLlibraryAttachment.findMany({
        ...args,
        ...select,
      })
    },
  },
)
