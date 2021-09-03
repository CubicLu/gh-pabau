import { mutationField, nonNull } from 'nexus'

export const ContactPreferenceCreateOneMutation = mutationField(
  'createOneContactPreference',
  {
    type: nonNull('ContactPreference'),
    args: {
      data: nonNull('ContactPreferenceCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.contactPreference.create({
        data,
        ...select,
      })
    },
  },
)
