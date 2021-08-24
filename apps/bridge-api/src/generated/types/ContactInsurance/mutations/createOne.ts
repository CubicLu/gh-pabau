import { mutationField, nonNull } from 'nexus'

export const ContactInsuranceCreateOneMutation = mutationField(
  'createOneContactInsurance',
  {
    type: nonNull('ContactInsurance'),
    args: {
      data: nonNull('ContactInsuranceCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.contactInsurance.create({
        data,
        ...select,
      })
    },
  },
)
