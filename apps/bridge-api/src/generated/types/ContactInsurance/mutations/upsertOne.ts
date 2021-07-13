import { mutationField, nonNull } from 'nexus'

export const ContactInsuranceUpsertOneMutation = mutationField(
  'upsertOneContactInsurance',
  {
    type: nonNull('ContactInsurance'),
    args: {
      where: nonNull('ContactInsuranceWhereUniqueInput'),
      create: nonNull('ContactInsuranceCreateInput'),
      update: nonNull('ContactInsuranceUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactInsurance.upsert({
        ...args,
        ...select,
      })
    },
  },
)
