import { mutationField, nonNull } from 'nexus'

export const ContactMedicalConditionDeleteOneMutation = mutationField(
  'deleteOneContactMedicalCondition',
  {
    type: 'ContactMedicalCondition',
    args: {
      where: nonNull('ContactMedicalConditionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.contactMedicalCondition.delete({
        where,
        ...select,
      })
    },
  },
)
