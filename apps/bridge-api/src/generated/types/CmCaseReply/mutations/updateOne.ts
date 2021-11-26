import { mutationField, nonNull } from 'nexus'

export const CmCaseReplyUpdateOneMutation = mutationField(
  'updateOneCmCaseReply',
  {
    type: nonNull('CmCaseReply'),
    args: {
      data: nonNull('CmCaseReplyUpdateInput'),
      where: nonNull('CmCaseReplyWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmCaseReply.update({
        where,
        data,
        ...select,
      })
    },
  },
)
