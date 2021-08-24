import { mutationField, nonNull } from 'nexus'

export const ClassMasterUpdateManyMutation = mutationField(
  'updateManyClassMaster',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ClassMasterWhereInput',
      data: nonNull('ClassMasterUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classMaster.updateMany(args as any)
    },
  },
)
