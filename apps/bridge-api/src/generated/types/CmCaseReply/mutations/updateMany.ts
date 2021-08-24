import { mutationField, nonNull } from 'nexus'

export const CmCaseReplyUpdateManyMutation = mutationField(
  'updateManyCmCaseReply',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmCaseReplyWhereInput',
      data: nonNull('CmCaseReplyUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmCaseReply.updateMany(args as any)
    },
  },
)
