import { queryField, nonNull, list } from 'nexus'

export const CompanyBranchAttachmentFindManyQuery = queryField(
  'findManyCompanyBranchAttachment',
  {
    type: nonNull(list(nonNull('CompanyBranchAttachment'))),
    args: {
      where: 'CompanyBranchAttachmentWhereInput',
      orderBy: list('CompanyBranchAttachmentOrderByWithRelationInput'),
      cursor: 'CompanyBranchAttachmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyBranchAttachmentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyBranchAttachment.findMany({
        ...args,
        ...select,
      })
    },
  },
)
