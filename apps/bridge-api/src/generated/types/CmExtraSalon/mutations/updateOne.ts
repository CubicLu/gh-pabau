import { mutationField, nonNull } from 'nexus'

export const CmExtraSalonUpdateOneMutation = mutationField(
  'updateOneCmExtraSalon',
  {
    type: nonNull('CmExtraSalon'),
    args: {
      data: nonNull('CmExtraSalonUpdateInput'),
      where: nonNull('CmExtraSalonWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmExtraSalon.update({
        where,
        data,
        ...select,
      })
    },
  },
)
