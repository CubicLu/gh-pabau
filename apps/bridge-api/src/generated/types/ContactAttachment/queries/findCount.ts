import { queryField, nonNull, list } from 'nexus'

export const ContactAttachmentFindCountQuery = queryField(
  'findManyContactAttachmentCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ContactAttachmentWhereInput',
      orderBy: list('ContactAttachmentOrderByInput'),
      cursor: 'ContactAttachmentWhereUniqueInput',
      distinct: 'ContactAttachmentScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactAttachment.count(args as any)
    },
  },
)
