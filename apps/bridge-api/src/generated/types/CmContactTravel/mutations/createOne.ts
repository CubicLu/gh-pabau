import { mutationField, nonNull } from 'nexus'

export const CmContactTravelCreateOneMutation = mutationField(
  'createOneCmContactTravel',
  {
    type: nonNull('CmContactTravel'),
    args: {
      data: nonNull('CmContactTravelCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmContactTravel.create({
        data,
        ...select,
      })
    },
  },
)
