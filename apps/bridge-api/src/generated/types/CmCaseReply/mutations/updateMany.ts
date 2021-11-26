import { mutationField, nonNull } from 'nexus'

export const CmCaseReplyUpdateManyMutation = mutationField(
  'updateManyCmCaseReply',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmCaseReplyUpdateManyMutationInput'),
      where: 'CmCaseReplyWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmCaseReply.updateMany(args as any)
    },
  },
)
