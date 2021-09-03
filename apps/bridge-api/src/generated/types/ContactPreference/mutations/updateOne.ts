import { mutationField, nonNull } from 'nexus'

export const ContactPreferenceUpdateOneMutation = mutationField(
  'updateOneContactPreference',
  {
    type: nonNull('ContactPreference'),
    args: {
      where: nonNull('ContactPreferenceWhereUniqueInput'),
      data: nonNull('ContactPreferenceUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.contactPreference.update({
        where,
        data,
        ...select,
      })
    },
  },
)
