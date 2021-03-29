import { objectType, arg, extendType } from 'nexus'

export const PointOfSaleSetting = objectType({
  name: 'PointOfSaleSetting',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.disable_service()
    t.model.disable_products()
    t.model.disable_packages()
    t.model.disable_giftcards()
    t.model.disable_account()
    t.model.disable_price_override()
    t.model.print_mode()
    t.model.disable_discount()
    t.model.email_receipt_text()
    t.model.theme_col()
    t.model.bank_account()
    t.model.bank_number()
    t.model.sort_code()
    t.model.bank_name()
    t.model.iban()
    t.model.swift()
    t.model.cashup_settings()
    t.model.default_payment_type()
    t.model.disable_loyalty()
    t.model.email_receipt_template()
    t.model.enable_bank_details()
    t.model.vat()
    t.model.enable_biller_settings()
    t.model.display_taxes()
    t.model.use_pabau_id()
    t.model.starting_invoice_number()
    t.model.enable_next_appointment()
    t.model.show_paid_label()
    t.model.paid_label()
    t.model.display_quantity()
    t.model.display_unit_cost()
    t.model.logo_position()
    t.model.force_discount_reason()
    t.model.automatic_booking()
    t.model.gift_msg_template_id()
    t.model.gift_sms_template_id()
    t.model.package_use_by_date()
    t.model.locked()
    t.model.cron_day()
    t.model.lock_sale_date()
    t.model.stock_mode()
    t.model.inv_template()
    t.model.lock_invoice_edit()
    t.model.Company()
  },
})

export const pointOfSaleSettingQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.pointOfSaleSetting()
    t.field('findFirstPointOfSaleSetting', {
      type: 'PointOfSaleSetting',
      args: {
        where: 'PointOfSaleSettingWhereInput',
        orderBy: arg({ type: 'PointOfSaleSettingOrderByInput' }),
        cursor: 'PointOfSaleSettingWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.pointOfSaleSetting.findFirst(args as any)
      },
    })
    t.crud.pointOfSaleSettings({ filtering: true, ordering: true })
    t.field('pointOfSaleSettingsCount', {
      type: 'Int',
      args: {
        where: 'PointOfSaleSettingWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.pointOfSaleSetting.count(args as any)
      },
    })
  },
})

export const pointOfSaleSettingMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOnePointOfSaleSetting()
    t.crud.updateOnePointOfSaleSetting()
    t.crud.upsertOnePointOfSaleSetting()
    t.crud.deleteOnePointOfSaleSetting()
  },
})
