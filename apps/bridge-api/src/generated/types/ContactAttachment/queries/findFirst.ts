import { queryField, list } from 'nexus'

export const ContactAttachmentFindFirstQuery = queryField(
  'findFirstContactAttachment',
  {
    type: 'ContactAttachment',
    args: {
      where: 'ContactAttachmentWhereInput',
      orderBy: list('ContactAttachmentOrderByWithRelationInput'),
      cursor: 'ContactAttachmentWhereUniqueInput',
      distinct: 'ContactAttachmentScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactAttachment.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
