import { mutationField, nonNull } from 'nexus'

export const AppBeforeAfterUpdateOneMutation = mutationField(
  'updateOneAppBeforeAfter',
  {
    type: nonNull('AppBeforeAfter'),
    args: {
      where: nonNull('AppBeforeAfterWhereUniqueInput'),
      data: nonNull('AppBeforeAfterUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.appBeforeAfter.update({
        where,
        data,
        ...select,
      })
    },
  },
)
