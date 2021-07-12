import { objectType } from 'nexus'

export const BodyChartTemplate = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'BodyChartTemplate',
  definition(t) {
    t.int('id')
    t.string('template_name')
    t.string('template_url')
    t.string('tags')
    t.int('company_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.int('uid')
    t.field('creation_date', { type: 'DateTime' })
    t.int('chart_order')
    t.int('template_type')
  },
})
