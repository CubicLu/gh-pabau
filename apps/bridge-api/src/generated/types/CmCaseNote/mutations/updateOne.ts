import { mutationField, nonNull } from 'nexus'

export const CmCaseNoteUpdateOneMutation = mutationField(
  'updateOneCmCaseNote',
  {
    type: nonNull('CmCaseNote'),
    args: {
      where: nonNull('CmCaseNoteWhereUniqueInput'),
      data: nonNull('CmCaseNoteUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmCaseNote.update({
        where,
        data,
        ...select,
      })
    },
  },
)
