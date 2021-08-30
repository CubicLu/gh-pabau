import { mutationField, nonNull } from 'nexus'

export const ContactInsuranceDeleteOneMutation = mutationField(
  'deleteOneContactInsurance',
  {
    type: 'ContactInsurance',
    args: {
      where: nonNull('ContactInsuranceWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.contactInsurance.delete({
        where,
        ...select,
      })
    },
  },
)
