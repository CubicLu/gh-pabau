import { mutationField, nonNull } from 'nexus'

export const ContactPreferenceUpsertOneMutation = mutationField(
  'upsertOneContactPreference',
  {
    type: nonNull('ContactPreference'),
    args: {
      where: nonNull('ContactPreferenceWhereUniqueInput'),
      create: nonNull('ContactPreferenceCreateInput'),
      update: nonNull('ContactPreferenceUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactPreference.upsert({
        ...args,
        ...select,
      })
    },
  },
)
