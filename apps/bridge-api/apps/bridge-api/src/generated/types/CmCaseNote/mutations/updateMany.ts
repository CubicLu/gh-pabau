import { mutationField, nonNull } from 'nexus'

export const CmCaseNoteUpdateManyMutation = mutationField(
  'updateManyCmCaseNote',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmCaseNoteWhereInput',
      data: nonNull('CmCaseNoteUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmCaseNote.updateMany(args as any)
    },
  },
)
