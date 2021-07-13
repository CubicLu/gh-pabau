import { mutationField, nonNull } from 'nexus'

export const CmContactJsonCreateOneMutation = mutationField(
  'createOneCmContactJson',
  {
    type: nonNull('CmContactJson'),
    args: {
      data: nonNull('CmContactJsonCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmContactJson.create({
        data,
        ...select,
      })
    },
  },
)
