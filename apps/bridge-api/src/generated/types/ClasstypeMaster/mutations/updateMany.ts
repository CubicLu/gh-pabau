import { mutationField, nonNull } from 'nexus'

export const ClasstypeMasterUpdateManyMutation = mutationField(
  'updateManyClasstypeMaster',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ClasstypeMasterWhereInput',
      data: nonNull('ClasstypeMasterUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classtypeMaster.updateMany(args as any)
    },
  },
)
