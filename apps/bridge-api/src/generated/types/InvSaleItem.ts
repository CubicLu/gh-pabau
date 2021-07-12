import { objectType, arg, extendType } from 'nexus'

export const InvSaleItem = objectType({
  name: 'InvSaleItem',
  definition(t) {
    t.model.id()
    t.model.sale_id()
    t.model.product_id()
    t.model.product_code()
    t.model.product_name()
    t.model.product_unit()
    t.model.tax_rate_id()
    t.model.tax()
    t.model.quantity()
    t.model.unit_price()
    t.model.gross_total()
    t.model.val_tax()
    t.model.occupier()
    t.model.uid()
    t.model.staff_purchase()
    t.model.created_date()
    t.model.modified_date()
    t.model.custom_id()
    t.model.sale_custom_id()
    t.model.contact_custom_id()
    t.model.product_custom_id()
    t.model.Practitioner_id()
    t.model.Threatment_id()
    t.model.User_id()
    t.model.VAT_id()
    t.model.LineDiscount()
    t.model.imported()
    t.model.UnitDiscount()
    t.model.discount_reason()
    t.model.product_category_id()
    t.model.product_category_name()
    t.model.product_category_type()
    t.model.from_pos()
    t.model.tax_total()
    t.model.custom_product_name()
    t.model.booking_id()
    t.model.Tax()
  },
})

export const invSaleItemQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.invSaleItem()
    t.field('findFirstInvSaleItem', {
      type: 'InvSaleItem',
      args: {
        where: 'InvSaleItemWhereInput',
        orderBy: arg({ type: 'InvSaleItemOrderByInput' }),
        cursor: 'InvSaleItemWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.invSaleItem.findFirst(args as any)
      },
    })
    t.crud.invSaleItems({ filtering: true, ordering: true })
    t.field('invSaleItemsCount', {
      type: 'Int',
      args: {
        where: 'InvSaleItemWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.invSaleItem.count(args as any)
      },
    })
  },
})

export const invSaleItemMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneInvSaleItem()
    t.crud.updateOneInvSaleItem()
    t.crud.upsertOneInvSaleItem()
    t.crud.deleteOneInvSaleItem()
    t.crud.updateManyInvSaleItem()
  },
})
