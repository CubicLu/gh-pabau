import { objectType } from 'nexus'

export const FavoriteReport = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'FavoriteReport',
  definition(t) {
    t.int('id')
    t.nullable.int('company_id')
    t.nullable.int('report_id')
    t.int('stars')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('Report', {
      type: 'Report',
      resolve(root: any) {
        return root.Report
      },
    })
  },
})
