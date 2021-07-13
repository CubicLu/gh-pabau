import { mutationField, nonNull } from 'nexus'

export const ContactInsuranceUpdateManyMutation = mutationField(
  'updateManyContactInsurance',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ContactInsuranceWhereInput',
      data: nonNull('ContactInsuranceUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactInsurance.updateMany(args as any)
    },
  },
)
