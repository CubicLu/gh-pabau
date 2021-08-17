import { mutationField, nonNull } from 'nexus'

export const CompanyBranchAttachmentCreateOneMutation = mutationField(
  'createOneCompanyBranchAttachment',
  {
    type: nonNull('CompanyBranchAttachment'),
    args: {
      data: nonNull('CompanyBranchAttachmentCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.companyBranchAttachment.create({
        data,
        ...select,
      })
    },
  },
)
