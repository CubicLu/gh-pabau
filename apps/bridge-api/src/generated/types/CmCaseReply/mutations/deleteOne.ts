import { mutationField, nonNull } from 'nexus'

export const CmCaseReplyDeleteOneMutation = mutationField(
  'deleteOneCmCaseReply',
  {
    type: 'CmCaseReply',
    args: {
      where: nonNull('CmCaseReplyWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmCaseReply.delete({
        where,
        ...select,
      })
    },
  },
)
