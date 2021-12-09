import { queryField, list } from 'nexus'

export const EmailTemplateAttachmentFindFirstQuery = queryField(
  'findFirstEmailTemplateAttachment',
  {
    type: 'EmailTemplateAttachment',
    args: {
      where: 'EmailTemplateAttachmentWhereInput',
      orderBy: list('EmailTemplateAttachmentOrderByWithRelationInput'),
      cursor: 'EmailTemplateAttachmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('EmailTemplateAttachmentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.emailTemplateAttachment.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
