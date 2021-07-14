import { mutationField, nonNull } from 'nexus'

export const BacsAccountCreateOneMutation = mutationField(
  'createOneBacsAccount',
  {
    type: nonNull('BacsAccount'),
    args: {
      data: nonNull('BacsAccountCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.bacsAccount.create({
        data,
        ...select,
      })
    },
  },
)
