import { mutationField, nonNull } from 'nexus'

export const CmAccountNoteUpdateOneMutation = mutationField(
  'updateOneCmAccountNote',
  {
    type: nonNull('CmAccountNote'),
    args: {
      where: nonNull('CmAccountNoteWhereUniqueInput'),
      data: nonNull('CmAccountNoteUpdateInput'),
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
