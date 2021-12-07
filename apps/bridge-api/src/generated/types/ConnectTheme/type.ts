import { objectType } from 'nexus'

export const ConnectTheme = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ConnectTheme',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('title')
    t.string('bgcolor')
    t.string('bgimage')
    t.string('logoimage')
    t.nullable.string('customtitle')
    t.nullable.string('customcontent')
    t.nullable.string('headercolor')
    t.nullable.string('footercolor')
    t.nullable.string('buttoncolor')
    t.nullable.string('boxshadowcolor')
    t.nullable.string('timecolor')
    t.nullable.string('fontcolor')
    t.nullable.string('buttontextcolor')
    t.nullable.string('linkcolor')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
