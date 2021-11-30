import { queryField, list } from 'nexus'

export const CompanyBranchAttachmentFindFirstQuery = queryField(
  'findFirstCompanyBranchAttachment',
  {
    type: 'CompanyBranchAttachment',
    args: {
      where: 'CompanyBranchAttachmentWhereInput',
      orderBy: list('CompanyBranchAttachmentOrderByWithRelationInput'),
      cursor: 'CompanyBranchAttachmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyBranchAttachmentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyBranchAttachment.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
