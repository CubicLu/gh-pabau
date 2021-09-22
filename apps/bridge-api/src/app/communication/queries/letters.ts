import { Prisma } from '@prisma/client'

import {
  extendType,
  inputObjectType,
  intArg,
  nullable,
  objectType,
} from 'nexus'
import { Context } from '../../../context'

interface LettersInputType {
  skip?: number
  take?: number
  where?: {
    recipient_id?: number
    company_id?: number
  }
}

export const LettersResult = objectType({
  name: 'Letters',
  definition(t) {
    t.int('id')
    t.int('recipient_id')
    t.string('recipient_type')
    t.string('status')
    t.string('merge_values')
    t.int('created_by')
    t.int('location_id')
    t.int('secure')
    t.string('created_date')
    t.int('related_id')
    t.string('related_type')
    t.string('subject')
    t.string('body')
    t.string('template_url')
    t.string('due_date')
    t.int('assigned_to')
    t.int('completed')
    t.int('lines')
    t.string('shared_with')
  },
})

export const LettersInput = inputObjectType({
  name: 'LettersInput',
  definition(t) {
    t.nullable.int('recipient_id')
    t.nullable.int('company_id')
  },
})

export const Letters = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('Letters', {
      type: LettersResult,
      description: 'Returns letters for a given recipient ID',
      args: {
        where: nullable(LettersInput),
        skip: intArg(),
        take: intArg(),
      },
      resolve(_root, args: LettersInputType, ctx: Context) {
        return ctx.prisma
          .$queryRaw`SELECT c.id, cr.recipient_id, cr.recipient_type, cr.status, cr.merge_values, c.uid As created_by, c.location_id, c.secure,
                    c.date AS created_date, c.related_id, c.related_type, cc.subject, cc.body AS template_url, ld.letter_body AS body,
                    '' AS due_date, 0 AS assigned_to, 0 AS completed, 0 AS \`lines\`, '' AS shared_with
                    FROM \`communications_recipients\` AS cr
                    INNER JOIN communications AS c ON c.id = cr.communications_id
                    INNER JOIN communications_content AS cc ON cc.id = c.communications_content_id
                    INNER JOIN letter_recipient_data AS ld ON ld.communication_id = c.id
                    WHERE c.company_id = ${ctx.authenticated.company}
                    ${
                      args.where.recipient_id
                        ? Prisma.sql`AND cr.recipient_id = ${args.where.recipient_id}`
                        : Prisma.empty
                    }
                    LIMIT ${args.skip ?? 0}, ${args.take ?? 50}`
      },
    })
  },
})
