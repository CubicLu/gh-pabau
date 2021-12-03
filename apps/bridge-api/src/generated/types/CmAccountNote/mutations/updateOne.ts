import { mutationField, nonNull } from 'nexus'

export const CmAccountNoteUpdateOneMutation = mutationField(
  'updateOneCmAccountNote',
  {
    type: nonNull('CmAccountNote'),
    args: {
      data: nonNull('CmAccountNoteUpdateInput'),
      where: nonNull('CmAccountNoteWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmAccountNote.update({
        where,
        data,
        ...select,
      })
    },
  },
)
