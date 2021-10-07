import { mutationField, nonNull } from 'nexus'

export const ClassMasterDeleteOneMutation = mutationField(
  'deleteOneClassMaster',
  {
    type: 'ClassMaster',
    args: {
      where: nonNull('ClassMasterWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.classMaster.delete({
        where,
        ...select,
      })
    },
  },
)
