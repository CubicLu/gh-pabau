import { mutationField, nonNull } from 'nexus'

export const CmContactMedicalConditionDeleteOneMutation = mutationField(
  'deleteOneCmContactMedicalCondition',
  {
    type: 'CmContactMedicalCondition',
    args: {
      where: nonNull('CmContactMedicalConditionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmContactMedicalCondition.delete({
        where,
        ...select,
      })
    },
  },
)
