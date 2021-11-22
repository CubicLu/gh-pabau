import { mutationField, nonNull } from 'nexus'

export const ContactMedicalConditionUpdateManyMutation = mutationField(
  'updateManyContactMedicalCondition',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ContactMedicalConditionWhereInput',
      data: nonNull('ContactMedicalConditionUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactMedicalCondition.updateMany(args as any)
    },
  },
)
