import { queryField, nonNull, list } from 'nexus'

export const CompanyBranchAttachmentFindManyQuery = queryField(
  'findManyCompanyBranchAttachment',
  {
    type: nonNull(list(nonNull('CompanyBranchAttachment'))),
    args: {
      where: 'CompanyBranchAttachmentWhereInput',
      orderBy: list('CompanyBranchAttachmentOrderByInput'),
      cursor: 'CompanyBranchAttachmentWhereUniqueInput',
      distinct: 'CompanyBranchAttachmentScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyBranchAttachment.findMany({
        ...args,
        ...select,
      })
    },
  },
)
