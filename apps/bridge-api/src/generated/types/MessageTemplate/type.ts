import { objectType } from 'nexus'

export const MessageTemplate = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'MessageTemplate',
  definition(t) {
    t.int('template_id')
    t.int('company_id')
    t.string('template_name')
    t.string('subject')
    t.string('message')
    t.nullable.int('created_by')
    t.string('template_type')
    t.nullable.field('created_at', { type: 'DateTime' })
    t.nullable.field('date_changed_at', { type: 'DateTime' })
    t.int('template_sub_type')
    t.int('template_sub_type_service')
    t.nullable.int('parent_id')
    t.string('header')
    t.string('footer')
    t.int('exclude_margins')
    t.string('template_group')
    t.string('subtype_letter')
    t.string('word_template')
    t.boolean('is_default')
    t.nullable.int('folder_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('TemplateFolder', {
      type: 'TemplateFolder',
      resolve(root: any) {
        return root.TemplateFolder
      },
    })
    t.nullable.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
    t.nullable.field('ParrentTemplate', {
      type: 'MessageTemplate',
      resolve(root: any) {
        return root.ParrentTemplate
      },
    })
    t.list.field('MessageTemplate', {
      type: 'MessageTemplate',
      args: {
        where: 'MessageTemplateWhereInput',
        orderBy: 'MessageTemplateOrderByWithRelationInput',
        cursor: 'MessageTemplateWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'MessageTemplateScalarFieldEnum',
      },
      resolve(root: any) {
        return root.MessageTemplate
      },
    })
    t.nullable.field('_count', {
      type: 'MessageTemplateCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
