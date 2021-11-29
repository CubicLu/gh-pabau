import { queryField, nonNull, list } from 'nexus'

export const CompanyBranchAttachmentFindCountQuery = queryField(
  'findManyCompanyBranchAttachmentCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyBranchAttachmentWhereInput',
      orderBy: list('CompanyBranchAttachmentOrderByWithRelationInput'),
      cursor: 'CompanyBranchAttachmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyBranchAttachmentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyBranchAttachment.count(args as any)
    },
  },
)
