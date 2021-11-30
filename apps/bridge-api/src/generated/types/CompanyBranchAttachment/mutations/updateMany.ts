import { mutationField, nonNull } from 'nexus'

export const CompanyBranchAttachmentUpdateManyMutation = mutationField(
  'updateManyCompanyBranchAttachment',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CompanyBranchAttachmentUpdateManyMutationInput'),
      where: 'CompanyBranchAttachmentWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyBranchAttachment.updateMany(args as any)
    },
  },
)
