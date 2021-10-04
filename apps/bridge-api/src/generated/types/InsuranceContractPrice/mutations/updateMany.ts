import { mutationField, nonNull } from 'nexus'

export const InsuranceContractPriceUpdateManyMutation = mutationField(
  'updateManyInsuranceContractPrice',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'InsuranceContractPriceWhereInput',
      data: nonNull('InsuranceContractPriceUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.insuranceContractPrice.updateMany(args as any)
    },
  },
)
