import { objectType, arg, extendType } from 'nexus'

export const Report = objectType({
  name: 'Report',
  definition(t) {
    t.model.id()
    t.model.report_category_id()
    t.model.name()
    t.model.description()
    t.model.company_id()
    t.model.group_field()
    t.model.link()
    t.model.send()
    t.model.date_limit()
    t.model.filter()
    t.model.search_result()
    t.model.column_names()
    t.model.preview_image()
    t.model.exc_vat_column()
    t.model.filter_json()
    t.model.grand_total()
    t.model.report_code()
    t.model.show_hide_columns()
    t.model.users_mode()
    t.model.filter_user()
    t.model.iframe()
    t.model.iframe_url()
    t.model.package_usage()
    t.model.show_package_usage()
    t.model.deleted()
    t.model.marketing()
    t.model.has_summary()
    t.model.filter_summary()
    t.model.admin_only()
    t.model.thumbnail_preview()
    t.model.total_revenue()
    t.model.show_custom_ids()
    t.model.show_custom_fields()
    t.model.custom_fields_defined()
    t.model.show_in_leads()
    t.model.other_custom_fields()
    t.model.custom_fields_group()
    t.model.custom_filter()
    t.model.sub_category()
    t.model.easy_filters()
    t.model.easy_filters_advanced()
    t.model.show_accounting()
    t.model.show_revenue()
    t.model.support_location_filter()
    t.model.checks_complete()
    t.model.custom_ids_checked()
    t.model.flag_video()
    t.model.flag_video_2()
    t.model.checks_complete_2()
    t.model.companies_included()
    t.model.checks_complete_3()
    t.model.flag_video_3()
    t.model.checks_complete_4()
    t.model.flag_video_4()
    t.model.subscribed_filter()
    t.model.print_page_size()
    t.model.sort_columns()
    t.model.group_column()
    t.model.mask_client_name()
    t.model.core_report()
    t.model.hide_columns()
    t.model.summary_mode()
    t.model.graph_mode()
    t.model.detailed_mode()
    t.model.ReportCategory()
    t.model.UserReport()
  },
})

export const reportQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.report()
    t.field('findFirstReport', {
      type: 'Report',
      args: {
        where: 'ReportWhereInput',
        orderBy: arg({ type: 'ReportOrderByInput' }),
        cursor: 'ReportWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.report.findFirst(args as any)
      },
    })
    t.crud.reports({ filtering: true, ordering: true })
    t.field('reportsCount', {
      type: 'Int',
      args: {
        where: 'ReportWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.report.count(args as any)
      },
    })
  },
})

export const reportMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneReport()
    t.crud.updateOneReport()
    t.crud.upsertOneReport()
    t.crud.deleteOneReport()
    t.crud.updateManyReport()
  },
})
