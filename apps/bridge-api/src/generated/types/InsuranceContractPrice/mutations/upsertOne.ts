import { mutationField, nonNull } from 'nexus'

export const InsuranceContractPriceUpsertOneMutation = mutationField(
  'upsertOneInsuranceContractPrice',
  {
    type: nonNull('InsuranceContractPrice'),
    args: {
      where: nonNull('InsuranceContractPriceWhereUniqueInput'),
      create: nonNull('InsuranceContractPriceCreateInput'),
      update: nonNull('InsuranceContractPriceUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.insuranceContractPrice.upsert({
        ...args,
        ...select,
      })
    },
  },
)
