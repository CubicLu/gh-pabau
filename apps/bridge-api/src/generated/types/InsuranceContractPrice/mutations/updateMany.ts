import { mutationField, nonNull } from 'nexus'

export const InsuranceContractPriceUpdateManyMutation = mutationField(
  'updateManyInsuranceContractPrice',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('InsuranceContractPriceUpdateManyMutationInput'),
      where: 'InsuranceContractPriceWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.insuranceContractPrice.updateMany(args as any)
    },
  },
)
