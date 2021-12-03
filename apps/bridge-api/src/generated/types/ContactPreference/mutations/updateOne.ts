import { mutationField, nonNull } from 'nexus'

export const ContactPreferenceUpdateOneMutation = mutationField(
  'updateOneContactPreference',
  {
    type: nonNull('ContactPreference'),
    args: {
      data: nonNull('ContactPreferenceUpdateInput'),
      where: nonNull('ContactPreferenceWhereUniqueInput'),
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
