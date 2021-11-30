import { queryField, list } from 'nexus'

export const ContactAttachmentFindFirstQuery = queryField(
  'findFirstContactAttachment',
  {
    type: 'ContactAttachment',
    args: {
      where: 'ContactAttachmentWhereInput',
      orderBy: list('ContactAttachmentOrderByWithRelationInput'),
      cursor: 'ContactAttachmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ContactAttachmentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactAttachment.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
