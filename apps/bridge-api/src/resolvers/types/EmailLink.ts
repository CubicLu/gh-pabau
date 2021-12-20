import { Context } from '../../context'
import { extendType, list, objectType, enumType } from 'nexus'
import { findManyContacts } from '../../app/contact/contact.service'
import { findManyLeads } from '../../app/lead/lead.service'

const EmailLinkTypeEnum = enumType({
  name: 'EmailLinkTypeEnum',
  members: ['contact', 'lead'],
})

const EmailLink = objectType({
  name: 'EmailLink',
  definition(t) {
    t.int('id')
    t.string('email')
    t.string('fistName')
    t.string('lastName')
    t.field('type', { type: EmailLinkTypeEnum })
  },
})

export const checkEmailLink = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('checkEmailLink', {
      type: EmailLink,
      description: 'Checks if emails have linked client or lead',
      args: {
        emails: list('String'),
      },
      async resolve(_root, args, ctx: Context) {
        if (!args.emails || args.emails.length === 0) {
          return []
        }
        const res = []
        const where = {
          Email: { in: args.emails },
          company_id: {
            equals: ctx.authenticated.company,
          },
        }
        const contacts = await findManyContacts(where, ctx)
        const leads = await findManyLeads(where, ctx)

        for (const contact of contacts) {
          res.push({
            id: contact.ID,
            email: contact.Email,
            fistName: contact.Fname,
            lastName: contact.Lname,
            type: 'contact',
          })
        }

        for (const lead of leads) {
          res.push({
            id: lead.ID,
            email: lead.Email,
            fistName: lead.Fname,
            lastName: lead.Lname,
            type: 'lead',
          })
        }

        return res
      },
    })
  },
})
