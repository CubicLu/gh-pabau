import { mutationField, nonNull } from 'nexus'

export const CmAccountNoteCreateOneMutation = mutationField(
  'createOneCmAccountNote',
  {
    type: nonNull('CmAccountNote'),
    args: {
      data: nonNull('CmAccountNoteCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmAccountNote.create({
        data,
        ...select,
      })
    },
  },
)
