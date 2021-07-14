import { mutationField, nonNull } from 'nexus'

export const CompanyBranchAttachmentDeleteOneMutation = mutationField(
  'deleteOneCompanyBranchAttachment',
  {
    type: 'CompanyBranchAttachment',
    args: {
      where: nonNull('CompanyBranchAttachmentWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.companyBranchAttachment.delete({
        where,
        ...select,
      })
    },
  },
)
