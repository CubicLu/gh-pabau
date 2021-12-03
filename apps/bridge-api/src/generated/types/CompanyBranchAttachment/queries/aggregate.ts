import { queryField, list } from 'nexus'

export const CompanyBranchAttachmentAggregateQuery = queryField(
  'aggregateCompanyBranchAttachment',
  {
    type: 'AggregateCompanyBranchAttachment',
    args: {
      where: 'CompanyBranchAttachmentWhereInput',
      orderBy: list('CompanyBranchAttachmentOrderByWithRelationInput'),
      cursor: 'CompanyBranchAttachmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyBranchAttachment.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
