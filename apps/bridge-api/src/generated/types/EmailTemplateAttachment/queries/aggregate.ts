import { queryField, list } from 'nexus'

export const EmailTemplateAttachmentAggregateQuery = queryField(
  'aggregateEmailTemplateAttachment',
  {
    type: 'AggregateEmailTemplateAttachment',
    args: {
      where: 'EmailTemplateAttachmentWhereInput',
      orderBy: list('EmailTemplateAttachmentOrderByWithRelationInput'),
      cursor: 'EmailTemplateAttachmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.emailTemplateAttachment.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
