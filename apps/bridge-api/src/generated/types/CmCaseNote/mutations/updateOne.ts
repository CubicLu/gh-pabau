import { mutationField, nonNull } from 'nexus'

export const CmCaseNoteUpdateOneMutation = mutationField(
  'updateOneCmCaseNote',
  {
    type: nonNull('CmCaseNote'),
    args: {
      data: nonNull('CmCaseNoteUpdateInput'),
      where: nonNull('CmCaseNoteWhereUniqueInput'),
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
