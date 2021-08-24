import { queryField, nonNull } from 'nexus'

export const ContactAttachmentFindUniqueQuery = queryField(
  'findUniqueContactAttachment',
  {
    type: 'ContactAttachment',
    args: {
      where: nonNull('ContactAttachmentWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.contactAttachment.findUnique({
        where,
        ...select,
      })
    },
  },
)
