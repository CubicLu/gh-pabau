import { objectType, arg, extendType } from 'nexus'

export const CompanyService = objectType({
  name: 'CompanyService',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.service()
    t.model.duration()
    t.model.description()
    t.model.price()
    t.model.disabledusers()
    t.model.color()
    t.model.group_id()
    t.model.online_book()
    t.model.product_id()
    t.model.imported()
    t.model.communication_template()
    t.model.service_order()
    t.model.sms_mode()
    t.model.sms_name()
    t.model.sms_days_after()
    t.model.sms_send_time()
    t.model.sms_id()
    t.model.treatment_group_id()
    t.model.custom_id()
    t.model.pos_only()
    t.model.prep_time()
    t.model.finish_time()
    t.model.deposit_amount()
    t.model.friendly_name()
    t.model.max_clients()
    t.model.default_room_id()
    t.model.follow_up_period()
    t.model.deposit_type()
    t.model.max_models()
    t.model.availability()
    t.model.force_credit_payment()
    t.model.disabled_locations()
    t.model.addon_services()
    t.model.service_participants()
    t.model.with_summary_title()
    t.model.online_book_type()
    t.model.proc_code()
    t.model.duration_day()
    t.model.invoice_text()
    t.model.invoice_item_name()
    t.model.online_only_service()
    t.model.Company()
    t.model.CompanyRoomService()
  },
})

export const companyServiceQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.companyService()
    t.field('findFirstCompanyService', {
      type: 'CompanyService',
      args: {
        where: 'CompanyServiceWhereInput',
        orderBy: arg({ type: 'CompanyServiceOrderByInput' }),
        cursor: 'CompanyServiceWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyService.findFirst(args as any)
      },
    })
    t.crud.companyServices({ filtering: true, ordering: true })
    t.field('companyServicesCount', {
      type: 'Int',
      args: {
        where: 'CompanyServiceWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyService.count(args as any)
      },
    })
  },
})

export const companyServiceMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCompanyService()
    t.crud.updateOneCompanyService()
    t.crud.upsertOneCompanyService()
    t.crud.deleteOneCompanyService()
    t.crud.updateManyCompanyService()
    t.crud.deleteManyCompanyService()
  },
})
