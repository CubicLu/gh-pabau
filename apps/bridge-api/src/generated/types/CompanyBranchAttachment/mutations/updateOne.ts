import { mutationField, nonNull } from 'nexus'

export const CompanyBranchAttachmentUpdateOneMutation = mutationField(
  'updateOneCompanyBranchAttachment',
  {
    type: nonNull('CompanyBranchAttachment'),
    args: {
      data: nonNull('CompanyBranchAttachmentUpdateInput'),
      where: nonNull('CompanyBranchAttachmentWhereUniqueInput'),
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
