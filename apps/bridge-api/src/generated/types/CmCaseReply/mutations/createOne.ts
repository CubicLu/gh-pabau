import { mutationField, nonNull } from 'nexus'

export const CmCaseReplyCreateOneMutation = mutationField(
  'createOneCmCaseReply',
  {
    type: nonNull('CmCaseReply'),
    args: {
      data: nonNull('CmCaseReplyCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmCaseReply.create({
        data,
        ...select,
      })
    },
  },
)
