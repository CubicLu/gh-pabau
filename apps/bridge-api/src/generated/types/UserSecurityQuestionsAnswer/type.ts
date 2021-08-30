import { objectType } from 'nexus'

export const UserSecurityQuestionsAnswer = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'UserSecurityQuestionsAnswer',
  definition(t) {
    t.int('id')
    t.int('user_id')
    t.string('question')
    t.int('question_no')
    t.string('answer')
    t.field('users', {
      type: 'User',
      resolve(root: any) {
        return root.users
      },
    })
  },
})
