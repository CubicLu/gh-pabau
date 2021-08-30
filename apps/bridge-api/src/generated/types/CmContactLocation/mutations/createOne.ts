import { mutationField, nonNull } from 'nexus'

export const CmContactLocationCreateOneMutation = mutationField(
  'createOneCmContactLocation',
  {
    type: nonNull('CmContactLocation'),
    args: {
      data: nonNull('CmContactLocationCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmContactLocation.create({
        data,
        ...select,
      })
    },
  },
)
