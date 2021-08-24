import { mutationField, nonNull } from 'nexus'

export const AcLogActionUpdateOneMutation = mutationField(
  'updateOneAcLogAction',
  {
    type: nonNull('AcLogAction'),
    args: {
      where: nonNull('AcLogActionWhereUniqueInput'),
      data: nonNull('AcLogActionUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.acLogAction.update({
        where,
        data,
        ...select,
      })
    },
  },
)
