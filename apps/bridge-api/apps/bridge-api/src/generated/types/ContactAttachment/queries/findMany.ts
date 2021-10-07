import { queryField, nonNull, list } from 'nexus'

export const ContactAttachmentFindManyQuery = queryField(
  'findManyContactAttachment',
  {
    type: nonNull(list(nonNull('ContactAttachment'))),
    args: {
      where: 'ContactAttachmentWhereInput',
      orderBy: list('ContactAttachmentOrderByWithRelationInput'),
      cursor: 'ContactAttachmentWhereUniqueInput',
      distinct: 'ContactAttachmentScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactAttachment.findMany({
        ...args,
        ...select,
      })
    },
  },
)
