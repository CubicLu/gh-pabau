import { mutationField, nonNull } from 'nexus'

export const ClasstypeMasterUpdateManyMutation = mutationField(
  'updateManyClasstypeMaster',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ClasstypeMasterUpdateManyMutationInput'),
      where: 'ClasstypeMasterWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classtypeMaster.updateMany(args as any)
    },
  },
)
