import { objectType, extendType, list, nonNull, intArg, stringArg } from 'nexus'
import { Context } from '../../context'

interface StaffListInput {
  searchTerm: string
  offset: number
  limit: number
  active: number
  department: string
  locationId: number
  admin: number
}

const StaffListType = objectType({
  name: 'StaffListType',
  definition(t) {
    t.int('id')
    t.int('staff_id')
    t.boolean('main_contact')
    t.string('full_name')
    t.string('job_title')
    t.boolean('admin')
    t.string('image')
    t.string('last_login')
    t.string('CellPhone')
    t.string('Email')
    t.string('City')
  },
})

const StaffReturnType = objectType({
  name: 'StaffReturnType',
  definition(t) {
    t.int('count')
    t.field('staffList', { type: list(StaffListType) })
  },
})

export const PabauStaffList = extendType({
  type: 'Query',
  definition(t) {
    t.field('staffList', {
      type: StaffReturnType,
      description: 'Get staff list',
      args: {
        offset: nonNull(intArg()),
        limit: nonNull(intArg()),
        active: nonNull(intArg()),
        department: stringArg(),
        locationId: intArg(),
        admin: intArg(),
        searchTerm: stringArg(),
      },
      async resolve(_, input: StaffListInput, ctx: Context) {
        try {
          let staffList
          let count = 0
          let queryString = `FROM cm_staff_general g left join users u on g.pabau_id = u.id
                       where g.Occupier = ${ctx.user.company}`

          if (input.searchTerm) {
            queryString =
              queryString + ` AND u.full_name LIKE '%${input.searchTerm}%' `
          }

          if (input.department) {
            queryString =
              queryString + ` AND u.department = '${input.department}' `
          }

          if (input.locationId) {
            queryString =
              queryString + ` AND g.DefaultLocation = ${input.locationId} `
          }

          if (input.admin) {
            queryString = queryString + ` AND u.admin = ${input.admin} `
          }

          if (input.active === 0) {
            staffList = await ctx.prisma
              .$queryRaw(`SELECT u.id,u.full_name,u.main_contact,u.job_title, u.admin,u.image,u.last_login,g.CellPhone,g.Email,g.City,g.ID as staff_id
                       ${queryString}
                       AND (g.deleted_on="0" or g.deleted_on="")
                       AND u.username NOT LIKE '%deleted%' AND u.deleted = 0
                       order by u.full_name
                       LIMIT ${input.limit} OFFSET ${input.offset}`)

            count = await ctx.prisma
              .$queryRaw(`SELECT count(*) as userCount ${queryString} AND (g.deleted_on="0" or g.deleted_on="")
                         AND u.username NOT LIKE '%deleted%' AND u.deleted = 0
                         `)
          } else {
            staffList = await ctx.prisma
              .$queryRaw(`SELECT u.id,u.full_name,u.main_contact,u.job_title, u.admin,u.image,u.last_login,g.CellPhone,g.Email,g.City,g.ID as staff_id
                         ${queryString}
                         AND u.deleted = 1
                         order by u.full_name
                         LIMIT ${input.limit} OFFSET ${input.offset}`)

            count = await ctx.prisma.$queryRaw(
              `SELECT count(*) as userCount ${queryString} AND u.deleted = 1`
            )
          }

          return {
            count: count[0].userCount,
            staffList: staffList,
          }
        } catch (error) {
          return error
        }
      },
    })
  },
})
