import { mutationField, nonNull } from 'nexus'

export const ClasstypeMasterDeleteOneMutation = mutationField(
  'deleteOneClasstypeMaster',
  {
    type: 'ClasstypeMaster',
    args: {
      where: nonNull('ClasstypeMasterWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.classtypeMaster.delete({
        where,
        ...select,
      })
    },
  },
)
