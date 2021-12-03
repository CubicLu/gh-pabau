import { mutationField, nonNull } from 'nexus'

export const ContactInsuranceUpdateOneMutation = mutationField(
  'updateOneContactInsurance',
  {
    type: nonNull('ContactInsurance'),
    args: {
      data: nonNull('ContactInsuranceUpdateInput'),
      where: nonNull('ContactInsuranceWhereUniqueInput'),
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
