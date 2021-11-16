import { mutationField, nonNull } from 'nexus'

export const LabRequestDeleteOneMutation = mutationField(
  'deleteOneLabRequest',
  {
    type: 'LabRequest',
    args: {
      where: nonNull('LabRequestWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.labRequest.delete({
        where,
        ...select,
      })
    },
  },
)
