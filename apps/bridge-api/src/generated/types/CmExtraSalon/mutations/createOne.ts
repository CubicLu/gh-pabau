import { mutationField, nonNull } from 'nexus'

export const CmExtraSalonCreateOneMutation = mutationField(
  'createOneCmExtraSalon',
  {
    type: nonNull('CmExtraSalon'),
    args: {
      data: nonNull('CmExtraSalonCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmExtraSalon.create({
        data,
        ...select,
      })
    },
  },
)
