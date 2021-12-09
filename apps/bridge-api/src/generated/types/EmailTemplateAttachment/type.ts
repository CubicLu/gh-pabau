import { objectType } from 'nexus'

export const EmailTemplateAttachment = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'EmailTemplateAttachment',
  definition(t) {
    t.int('id')
    t.int('template_id')
    t.string('file')
    t.field('MessageTemplate', {
      type: 'MessageTemplate',
      resolve(root: any) {
        return root.MessageTemplate
      },
    })
  },
})
