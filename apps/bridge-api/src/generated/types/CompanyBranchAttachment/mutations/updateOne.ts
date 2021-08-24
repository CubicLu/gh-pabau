import { mutationField, nonNull } from 'nexus'

export const CompanyBranchAttachmentUpdateOneMutation = mutationField(
  'updateOneCompanyBranchAttachment',
  {
    type: nonNull('CompanyBranchAttachment'),
    args: {
      where: nonNull('CompanyBranchAttachmentWhereUniqueInput'),
      data: nonNull('CompanyBranchAttachmentUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.companyBranchAttachment.update({
        where,
        data,
        ...select,
      })
    },
  },
)
