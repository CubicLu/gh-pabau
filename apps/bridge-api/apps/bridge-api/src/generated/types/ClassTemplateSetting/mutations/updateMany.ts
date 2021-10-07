import { mutationField, nonNull } from 'nexus'

export const ClassTemplateSettingUpdateManyMutation = mutationField(
  'updateManyClassTemplateSetting',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ClassTemplateSettingWhereInput',
      data: nonNull('ClassTemplateSettingUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classTemplateSetting.updateMany(args as any)
    },
  },
)
