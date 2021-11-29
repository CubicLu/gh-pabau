import { mutationField, nonNull } from 'nexus'

export const ContactPreferenceUpdateManyMutation = mutationField(
  'updateManyContactPreference',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ContactPreferenceUpdateManyMutationInput'),
      where: 'ContactPreferenceWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactPreference.updateMany(args as any)
    },
  },
)
