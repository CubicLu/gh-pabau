import { queryField, nonNull, list } from 'nexus'

export const ContactAttachmentFindCountQuery = queryField(
  'findManyContactAttachmentCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ContactAttachmentWhereInput',
      orderBy: list('ContactAttachmentOrderByWithRelationInput'),
      cursor: 'ContactAttachmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ContactAttachmentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactAttachment.count(args as any)
    },
  },
)
