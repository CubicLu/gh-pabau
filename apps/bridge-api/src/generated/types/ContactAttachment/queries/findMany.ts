import { queryField, nonNull, list } from 'nexus'

export const ContactAttachmentFindManyQuery = queryField(
  'findManyContactAttachment',
  {
    type: nonNull(list(nonNull('ContactAttachment'))),
    args: {
      where: 'ContactAttachmentWhereInput',
      orderBy: list('ContactAttachmentOrderByWithRelationInput'),
      cursor: 'ContactAttachmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ContactAttachmentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactAttachment.findMany({
        ...args,
        ...select,
      })
    },
  },
)
