import { mutationField, nonNull } from 'nexus'

export const ContactPreferenceUpdateManyMutation = mutationField(
  'updateManyContactPreference',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ContactPreferenceWhereInput',
      data: nonNull('ContactPreferenceUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactPreference.updateMany(args as any)
    },
  },
)
