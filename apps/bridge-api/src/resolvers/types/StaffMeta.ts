import { StaffMeta, User } from '@prisma/client'
import {
  booleanArg,
  extendType,
  inputObjectType,
  intArg,
  list,
  nonNull,
  stringArg,
} from 'nexus'
import { Context } from '../../context'

interface StaffMetaInput {
  meta_name: string
  meta_value: boolean
  group_id: number
}

interface StaffMetaInputFields {
  meta_name: string
  meta_value: boolean
}

interface MultipleStaffMetaInput {
  staff_meta: StaffMetaInputFields[]
  group_id: number
}

const StaffMetaInput = inputObjectType({
  name: 'staffMetaInput',
  definition(t) {
    t.nonNull.string('meta_name')
    t.nonNull.boolean('meta_value')
  },
})

export const PabauStaffMeta = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('upsertManyStaffMetaByGroupId', {
      type: 'Int',
      description:
        'Creates/Updates a single StaffMeta entry for all Users belonging to the provided group_id',
      args: {
        meta_name: nonNull(stringArg()),
        meta_value: nonNull(booleanArg()),
        group_id: nonNull(intArg()),
      },
      async resolve(_, input: StaffMetaInput, ctx: Context) {
        try {
          const stringifiedMetaValue = Number(input.meta_value).toString()
          const users: User[] = await ctx.prisma.user.findMany({
            where: {
              UserGroupMember: {
                group_id: {
                  equals: input.group_id,
                },
              },
            },
            include: {
              StaffMeta: true,
            },
          })
          return users.map(async (user: User & { StaffMeta: StaffMeta[] }) => {
            const meta = user?.StaffMeta?.find(
              (meta: StaffMeta) => meta.meta_name === input.meta_name
            )
            return await (meta
              ? ctx.prisma.staffMeta.update({
                  where: {
                    id: meta.id,
                  },
                  data: {
                    meta_value: {
                      set: stringifiedMetaValue,
                    },
                  },
                })
              : ctx.prisma.staffMeta.create({
                  data: {
                    meta_name: input.meta_name,
                    meta_value: stringifiedMetaValue,
                    staff_id: user.id,
                  },
                }))
          }).length
        } catch (error) {
          return error
        }
      },
    })
  },
})

export const PabauStaffMetaMultiple = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateManyStaffMetaFeaturesByGroupId', {
      type: 'Int',
      description:
        'Creates/Updates a multiple StaffMeta entry for all Users belonging to the provided group_id',
      args: {
        group_id: nonNull(intArg()),
        staff_meta: list(StaffMetaInput),
      },
      async resolve(_, input: MultipleStaffMetaInput, ctx: Context) {
        try {
          return input.staff_meta.map(async (metaData: StaffMetaInput) => {
            const stringifiedMetaValue = Number(metaData.meta_value).toString()
            const users: User[] = await ctx.prisma.user.findMany({
              where: {
                UserGroupMember: {
                  group_id: {
                    equals: input.group_id,
                  },
                },
              },
              include: {
                StaffMeta: true,
              },
            })
            return users.map(
              async (user: User & { StaffMeta: StaffMeta[] }) => {
                const meta = user?.StaffMeta?.find(
                  (meta: StaffMeta) => meta.meta_name === metaData.meta_name
                )
                return await (meta
                  ? ctx.prisma.staffMeta.update({
                      where: {
                        id: meta.id,
                      },
                      data: {
                        meta_value: {
                          set: stringifiedMetaValue,
                        },
                      },
                    })
                  : ctx.prisma.staffMeta.create({
                      data: {
                        meta_name: metaData.meta_name,
                        meta_value: stringifiedMetaValue,
                        staff_id: user.id,
                      },
                    }))
              }
            ).length
          }).length
        } catch (error) {
          return error
        }
      },
    })
  },
})
