import { mutationField, nonNull } from 'nexus'

export const ContactPreferenceDeleteOneMutation = mutationField(
  'deleteOneContactPreference',
  {
    type: 'ContactPreference',
    args: {
      where: nonNull('ContactPreferenceWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.contactPreference.delete({
        where,
        ...select,
      })
    },
  },
)
