import { mutationField, nonNull } from 'nexus'

export const InsurerContractCreateOneMutation = mutationField(
  'createOneInsurerContract',
  {
    type: nonNull('InsurerContract'),
    args: {
      data: nonNull('InsurerContractCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.insurerContract.create({
        data,
        ...select,
      })
    },
  },
)
