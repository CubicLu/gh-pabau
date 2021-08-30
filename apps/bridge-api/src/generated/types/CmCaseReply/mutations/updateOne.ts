import { mutationField, nonNull } from 'nexus'

export const CmCaseReplyUpdateOneMutation = mutationField(
  'updateOneCmCaseReply',
  {
    type: nonNull('CmCaseReply'),
    args: {
      where: nonNull('CmCaseReplyWhereUniqueInput'),
      data: nonNull('CmCaseReplyUpdateInput'),
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
