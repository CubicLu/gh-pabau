import { queryField, list } from 'nexus'

export const CompanyBranchAttachmentAggregateQuery = queryField(
  'aggregateCompanyBranchAttachment',
  {
    type: 'AggregateCompanyBranchAttachment',
    args: {
      where: 'CompanyBranchAttachmentWhereInput',
      orderBy: list('CompanyBranchAttachmentOrderByWithRelationInput'),
      cursor: 'CompanyBranchAttachmentWhereUniqueInput',
      distinct: 'CompanyBranchAttachmentScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyBranchAttachment.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
