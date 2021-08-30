import { mutationField, nonNull } from 'nexus'

export const CmCaseNoteCreateOneMutation = mutationField(
  'createOneCmCaseNote',
  {
    type: nonNull('CmCaseNote'),
    args: {
      data: nonNull('CmCaseNoteCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmCaseNote.create({
        data,
        ...select,
      })
    },
  },
)
