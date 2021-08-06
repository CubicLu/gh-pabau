import { mutationField, nonNull } from 'nexus'

export const CmContactCustomCreateOneMutation = mutationField(
  'createOneCmContactCustom',
  {
    type: nonNull('CmContactCustom'),
    args: {
      data: nonNull('CmContactCustomCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmContactCustom.create({
        data,
        ...select,
      })
    },
  },
)
