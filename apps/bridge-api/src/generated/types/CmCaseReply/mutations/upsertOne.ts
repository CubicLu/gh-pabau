import { mutationField, nonNull } from 'nexus'

export const CmCaseReplyUpsertOneMutation = mutationField(
  'upsertOneCmCaseReply',
  {
    type: nonNull('CmCaseReply'),
    args: {
      where: nonNull('CmCaseReplyWhereUniqueInput'),
      create: nonNull('CmCaseReplyCreateInput'),
      update: nonNull('CmCaseReplyUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmCaseReply.upsert({
        ...args,
        ...select,
      })
    },
  },
)
