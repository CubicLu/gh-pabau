import { objectType, arg, extendType } from 'nexus'

export const XeroIntegration = objectType({
  name: 'XeroIntegration',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.client_id()
    t.model.tenant_id()
    t.model.client_secret()
    t.model.refresh_token()
    t.model.redirect_uri()
    t.model.default_tax_method()
    t.model.payments_account_code()
    t.model.items_account_code()
    t.model.payments_enabled()
    t.model.tracking_categories_enabled()
    t.model.default_invoice_status()
    t.model.enabled()
    t.model.created_at()
    t.model.modified_at()
    t.model.Company()
  },
})

export const xeroIntegrationQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.xeroIntegration()
    t.field('findFirstXeroIntegration', {
      type: 'XeroIntegration',
      args: {
        where: 'XeroIntegrationWhereInput',
        orderBy: arg({ type: 'XeroIntegrationOrderByInput' }),
        cursor: 'XeroIntegrationWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.xeroIntegration.findFirst(args as any)
      },
    })
    t.crud.xeroIntegrations({ filtering: true, ordering: true })
    t.field('xeroIntegrationsCount', {
      type: 'Int',
      args: {
        where: 'XeroIntegrationWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.xeroIntegration.count(args as any)
      },
    })
  },
})

export const xeroIntegrationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneXeroIntegration()
    t.crud.updateOneXeroIntegration()
    t.crud.upsertOneXeroIntegration()
    t.crud.deleteOneXeroIntegration()
  },
})
