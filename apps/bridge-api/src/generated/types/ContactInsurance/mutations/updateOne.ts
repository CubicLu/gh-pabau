import { mutationField, nonNull } from 'nexus'

export const ContactInsuranceUpdateOneMutation = mutationField(
  'updateOneContactInsurance',
  {
    type: nonNull('ContactInsurance'),
    args: {
      where: nonNull('ContactInsuranceWhereUniqueInput'),
      data: nonNull('ContactInsuranceUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.contactInsurance.update({
        where,
        data,
        ...select,
      })
    },
  },
)
