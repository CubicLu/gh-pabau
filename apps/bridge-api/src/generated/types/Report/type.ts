import { objectType } from 'nexus'

export const Report = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Report',
  definition(t) {
    t.int('id')
    t.nullable.int('report_category_id')
    t.nullable.string('name')
    t.nullable.string('description')
    t.int('company_id')
    t.nullable.string('group_field')
    t.nullable.string('link')
    t.nullable.int('send')
    t.string('date_limit')
    t.nullable.string('filter')
    t.string('search_result')
    t.string('column_names')
    t.string('preview_image')
    t.string('exc_vat_column')
    t.string('filter_json')
    t.int('grand_total')
    t.string('report_code')
    t.string('show_hide_columns')
    t.int('users_mode')
    t.nullable.string('filter_user')
    t.int('iframe')
    t.string('iframe_url')
    t.int('package_usage')
    t.int('show_package_usage')
    t.int('deleted')
    t.int('marketing')
    t.int('has_summary')
    t.nullable.int('filter_summary')
    t.int('admin_only')
    t.string('thumbnail_preview')
    t.int('total_revenue')
    t.int('show_custom_ids')
    t.int('show_custom_fields')
    t.string('custom_fields_defined')
    t.int('show_in_leads')
    t.string('other_custom_fields')
    t.string('custom_fields_group')
    t.string('custom_filter')
    t.string('sub_category')
    t.string('easy_filters')
    t.string('easy_filters_advanced')
    t.int('show_accounting')
    t.int('show_revenue')
    t.int('support_location_filter')
    t.int('checks_complete')
    t.int('custom_ids_checked')
    t.string('flag_video')
    t.string('flag_video_2')
    t.int('checks_complete_2')
    t.string('companies_included')
    t.int('checks_complete_3')
    t.string('flag_video_3')
    t.int('checks_complete_4')
    t.string('flag_video_4')
    t.nullable.string('subscribed_filter')
    t.string('print_page_size')
    t.string('sort_columns')
    t.string('group_column')
    t.int('mask_client_name')
    t.int('core_report')
    t.string('hide_columns')
    t.int('summary_mode')
    t.int('graph_mode')
    t.int('detailed_mode')
    t.nullable.field('ReportCategory', {
      type: 'ReportCategory',
      resolve(root: any) {
        return root.ReportCategory
      },
    })
    t.list.field('UserReport', {
      type: 'UserReport',
      args: {
        where: 'UserReportWhereInput',
        orderBy: 'UserReportOrderByWithRelationInput',
        cursor: 'UserReportWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserReportScalarFieldEnum',
      },
      resolve(root: any) {
        return root.UserReport
      },
    })
    t.list.field('FavoriteReport', {
      type: 'FavoriteReport',
      args: {
        where: 'FavoriteReportWhereInput',
        orderBy: 'FavoriteReportOrderByWithRelationInput',
        cursor: 'FavoriteReportWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'FavoriteReportScalarFieldEnum',
      },
      resolve(root: any) {
        return root.FavoriteReport
      },
    })
    t.field('_count', {
      type: 'ReportCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
