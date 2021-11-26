import { mutationField, nonNull } from 'nexus'

export const AcLogActionUpdateOneMutation = mutationField(
  'updateOneAcLogAction',
  {
    type: nonNull('AcLogAction'),
    args: {
      data: nonNull('AcLogActionUpdateInput'),
      where: nonNull('AcLogActionWhereUniqueInput'),
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
