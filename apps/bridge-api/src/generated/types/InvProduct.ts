import { objectType, arg, extendType } from 'nexus'

export const InvProduct = objectType({
  name: 'InvProduct',
  definition(t) {
    t.model.id()
    t.model.code()
    t.model.name()
    t.model.sku()
    t.model.unit()
    t.model.size()
    t.model.product_order()
    t.model.um()
    t.model.cost()
    t.model.price()
    t.model.alert_quantity()
    t.model.show_on_website()
    t.model.image()
    t.model.category_id()
    t.model.supplier_id()
    t.model.note()
    t.model.company_id()
    t.model.uid()
    t.model.created_date()
    t.model.modified_date()
    t.model.Description()
    t.model.custom_id()
    t.model.category_custom_id()
    t.model.PriceListGroup_id()
    t.model.VATRate_id()
    t.model.imported()
    t.model.old_barcode()
    t.model.max_level()
    t.model.is_active()
    t.model.product_points()
    t.model.open_sale()
    t.model.new_imported()
    t.model.sage_nominal_code()
    t.model.procedure_date()
    t.model.product_account_code_xero()
    t.model.allow_negative_qty()
    t.model.User()
    t.model.Company()
    t.model.InvCategory()
    t.model.CmDrug()
  },
})

export const invProductQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.invProduct()
    t.field('findFirstInvProduct', {
      type: 'InvProduct',
      args: {
        where: 'InvProductWhereInput',
        orderBy: arg({ type: 'InvProductOrderByInput' }),
        cursor: 'InvProductWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.invProduct.findFirst(args as any)
      },
    })
    t.crud.invProducts({ filtering: true, ordering: true })
    t.field('invProductsCount', {
      type: 'Int',
      args: {
        where: 'InvProductWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.invProduct.count(args as any)
      },
    })
  },
})

export const invProductMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneInvProduct()
    t.crud.updateOneInvProduct()
    t.crud.upsertOneInvProduct()
    t.crud.deleteOneInvProduct()
    t.crud.updateManyInvProduct()
  },
})
