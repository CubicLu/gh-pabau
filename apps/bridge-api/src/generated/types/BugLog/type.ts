import { objectType } from 'nexus'

export const BugLog = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'BugLog',
  definition(t) {
    t.int('id')
    t.string('bug_message')
    t.int('datetime')
    t.int('uid')
    t.int('related_id')
  },
})
