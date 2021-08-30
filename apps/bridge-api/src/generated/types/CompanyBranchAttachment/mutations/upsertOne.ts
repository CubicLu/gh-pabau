import { mutationField, nonNull } from 'nexus'

export const CompanyBranchAttachmentUpsertOneMutation = mutationField(
  'upsertOneCompanyBranchAttachment',
  {
    type: nonNull('CompanyBranchAttachment'),
    args: {
      where: nonNull('CompanyBranchAttachmentWhereUniqueInput'),
      create: nonNull('CompanyBranchAttachmentCreateInput'),
      update: nonNull('CompanyBranchAttachmentUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyBranchAttachment.upsert({
        ...args,
        ...select,
      })
    },
  },
)
