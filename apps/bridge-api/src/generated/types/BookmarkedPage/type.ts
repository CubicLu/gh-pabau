import { objectType } from 'nexus'

export const BookmarkedPage = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'BookmarkedPage',
  definition(t) {
    t.int('id')
    t.int('uid')
    t.string('link')
    t.int('companyid')
    t.string('title')
    t.string('icon')
  },
})
