import { objectType, extendType, list, nonNull, intArg, stringArg } from 'nexus'
import { Context } from '../../context'
import { Prisma } from '@prisma/client'

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
    t.string('location')
    t.string('created')
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
          let searchTerm
          const companyId = ctx.authenticated.company
          if (input.searchTerm) {
            searchTerm = `%${input.searchTerm}%`
          }

          const staffList = await ctx.prisma
            .$queryRaw`SELECT u.id,u.full_name,u.main_contact,u.job_title, u.admin,u.image,u.last_login,u.created,g.CellPhone,g.Email,g.ID as staff_id, c.name as location
                      FROM cm_staff_general g left join users u on g.pabau_id = u.id
                      left join (SELECT id, name FROM company_branches) as c on  g.DefaultLocation = c.id 
                      WHERE g.Occupier = ${companyId}
                       ${
                         input.admin
                           ? Prisma.sql` AND u.admin = ${input.admin} `
                           : Prisma.empty
                       }
                       ${
                         input.department
                           ? Prisma.sql` AND u.department = ${input.department} `
                           : Prisma.empty
                       }
                       ${
                         input.searchTerm
                           ? Prisma.sql` AND u.full_name LIKE ${searchTerm} `
                           : Prisma.empty
                       }
                       ${
                         input.locationId
                           ? Prisma.sql` AND g.DefaultLocation = ${input.locationId} `
                           : Prisma.empty
                       }
                       ${
                         input.active === 0
                           ? Prisma.sql` AND (g.deleted_on="0" or g.deleted_on="")
                            AND u.username NOT LIKE '%deleted%' AND u.deleted = 0 `
                           : Prisma.sql` AND u.deleted = 1 `
                       }
                       order by u.full_name
                       LIMIT ${input.limit} OFFSET ${input.offset}`

          const count = await ctx.prisma.$queryRaw`SELECT count(*) as userCount
               FROM cm_staff_general g left join users u on g.pabau_id = u.id
                WHERE g.Occupier = ${companyId}
                 ${
                   input.admin
                     ? Prisma.sql` AND u.admin = ${input.admin} `
                     : Prisma.empty
                 }
                 ${
                   input.department
                     ? Prisma.sql` AND u.department = ${input.department} `
                     : Prisma.empty
                 }
                 ${
                   input.searchTerm
                     ? Prisma.sql` AND u.full_name LIKE ${searchTerm} `
                     : Prisma.empty
                 }
                 ${
                   input.locationId
                     ? Prisma.sql` AND g.DefaultLocation = ${input.locationId} `
                     : Prisma.empty
                 }
                 ${
                   input.active === 0
                     ? Prisma.sql` AND (g.deleted_on="0" or g.deleted_on="")
                            AND u.username NOT LIKE '%deleted%' AND u.deleted = 0 `
                     : Prisma.sql` AND u.deleted = 1 `
                 }
                 `
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
