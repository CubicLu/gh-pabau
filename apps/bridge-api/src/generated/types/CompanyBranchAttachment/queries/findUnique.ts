import { queryField, nonNull } from 'nexus'

export const CompanyBranchAttachmentFindUniqueQuery = queryField(
  'findUniqueCompanyBranchAttachment',
  {
    type: 'CompanyBranchAttachment',
    args: {
      where: nonNull('CompanyBranchAttachmentWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.companyBranchAttachment.findUnique({
        where,
        ...select,
      })
    },
  },
)
