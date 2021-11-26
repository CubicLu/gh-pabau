import { mutationField, nonNull } from 'nexus'

export const CmCaseNoteUpdateManyMutation = mutationField(
  'updateManyCmCaseNote',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmCaseNoteUpdateManyMutationInput'),
      where: 'CmCaseNoteWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmCaseNote.updateMany(args as any)
    },
  },
)
