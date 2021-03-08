import { objectType, arg, extendType } from 'nexus'

export const ClassTemplateSetting = objectType({
  name: 'ClassTemplateSetting',
  definition(t) {
    t.model.id()
    t.model.companyId()
    t.model.classWaitListTemplateEnable()
    t.model.classWaitListTemplateId()
    t.model.classWaitListSmsTemplateEnable()
    t.model.classWaitListSmsTemplateId()
    t.model.uid()
    t.model.creationDate()
    t.model.modifiedDate()
  },
})

export const classTemplateSettingQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.classTemplateSetting()
    t.field('findFirstClassTemplateSetting', {
      type: 'ClassTemplateSetting',
      args: {
        where: 'ClassTemplateSettingWhereInput',
        orderBy: arg({ type: 'ClassTemplateSettingOrderByInput' }),
        cursor: 'ClassTemplateSettingWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.classTemplateSetting.findFirst(args as any)
      },
    })
    t.crud.classTemplateSettings({ filtering: true, ordering: true })
    t.field('classTemplateSettingsCount', {
      type: 'Int',
      args: {
        where: 'ClassTemplateSettingWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.classTemplateSetting.count(args as any)
      },
    })
  },
})

export const classTemplateSettingMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneClassTemplateSetting()
    t.crud.updateOneClassTemplateSetting()
    t.crud.upsertOneClassTemplateSetting()
    t.crud.deleteOneClassTemplateSetting()
    t.crud.updateManyClassTemplateSetting()
    t.crud.deleteManyClassTemplateSetting()
  },
})
