import { queryField, nonNull, list } from 'nexus'

export const EmailTemplateAttachmentFindManyQuery = queryField(
  'findManyEmailTemplateAttachment',
  {
    type: nonNull(list(nonNull('EmailTemplateAttachment'))),
    args: {
      where: 'EmailTemplateAttachmentWhereInput',
      orderBy: list('EmailTemplateAttachmentOrderByWithRelationInput'),
      cursor: 'EmailTemplateAttachmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('EmailTemplateAttachmentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.emailTemplateAttachment.findMany({
        ...args,
        ...select,
      })
    },
  },
)
