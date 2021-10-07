import { queryField, nonNull, list } from 'nexus'

export const MediaLlibraryAttachmentFindCountQuery = queryField(
  'findManyMediaLlibraryAttachmentCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'MediaLlibraryAttachmentWhereInput',
      orderBy: list('MediaLlibraryAttachmentOrderByWithRelationInput'),
      cursor: 'MediaLlibraryAttachmentWhereUniqueInput',
      distinct: 'MediaLlibraryAttachmentScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.mediaLlibraryAttachment.count(args as any)
    },
  },
)
