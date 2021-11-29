import { queryField, nonNull, list } from 'nexus'

export const MediaLlibraryAttachmentFindCountQuery = queryField(
  'findManyMediaLlibraryAttachmentCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'MediaLlibraryAttachmentWhereInput',
      orderBy: list('MediaLlibraryAttachmentOrderByWithRelationInput'),
      cursor: 'MediaLlibraryAttachmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('MediaLlibraryAttachmentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.mediaLlibraryAttachment.count(args as any)
    },
  },
)
