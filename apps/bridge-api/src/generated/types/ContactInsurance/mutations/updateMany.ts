import { mutationField, nonNull } from 'nexus'

export const ContactInsuranceUpdateManyMutation = mutationField(
  'updateManyContactInsurance',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ContactInsuranceUpdateManyMutationInput'),
      where: 'ContactInsuranceWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactInsurance.updateMany(args as any)
    },
  },
)
