import { mutationField, nonNull } from 'nexus'

export const CmExtraGymCreateOneMutation = mutationField(
  'createOneCmExtraGym',
  {
    type: nonNull('CmExtraGym'),
    args: {
      data: nonNull('CmExtraGymCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmExtraGym.create({
        data,
        ...select,
      })
    },
  },
)
