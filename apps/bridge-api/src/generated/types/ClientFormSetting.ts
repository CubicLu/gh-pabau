import { objectType, arg, extendType } from 'nexus'

export const ClientFormSetting = objectType({
  name: 'ClientFormSetting',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.enable_medical()
    t.model.form_id()
    t.model.not_seen_months()
    t.model.enable_new_and_old()
    t.model.checked_by_default()
    t.model.new_client_template()
    t.model.not_seen_template()
  },
})

export const clientFormSettingQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.clientFormSetting()
    t.field('findFirstClientFormSetting', {
      type: 'ClientFormSetting',
      args: {
        where: 'ClientFormSettingWhereInput',
        orderBy: arg({ type: 'ClientFormSettingOrderByInput' }),
        cursor: 'ClientFormSettingWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.clientFormSetting.findFirst(args as any)
      },
    })
    t.crud.clientFormSettings({ filtering: true, ordering: true })
    t.field('clientFormSettingsCount', {
      type: 'Int',
      args: {
        where: 'ClientFormSettingWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.clientFormSetting.count(args as any)
      },
    })
  },
})

export const clientFormSettingMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneClientFormSetting()
    t.crud.updateOneClientFormSetting()
    t.crud.upsertOneClientFormSetting()
    t.crud.deleteOneClientFormSetting()
  },
})
