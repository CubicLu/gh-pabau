import { mutationField, nonNull } from 'nexus'

export const CompanyBranchAttachmentUpdateManyMutation = mutationField(
  'updateManyCompanyBranchAttachment',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CompanyBranchAttachmentWhereInput',
      data: nonNull('CompanyBranchAttachmentUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyBranchAttachment.updateMany(args as any)
    },
  },
)
