import { extendType, list } from 'nexus'
import { Context } from '../../context'
import LocationService from '../../app/company-branch/LocationService'
import {
  CreateBranchInputType,
  UpdateBranchInputType,
} from '../../app/company-branch/dto'
import {
  CreateCompanyBranchResponse,
  UpdateCompanyBranchResponse,
  CreateCompanyBranchInputType,
  UpdateCompanyBranchInputType,
} from '../../app/company-branch/nexus-type'

export const findAllowedLocation = extendType({
  type: 'Query',
  definition(t) {
    t.field('findAllowedLocation', {
      type: list('CompanyBranch'),
      description: 'Retrieve list of allow locations based on company',
      async resolve(_root, input, ctx: Context) {
        const companyId = ctx.authenticated.company
        const userId = ctx.authenticated.user
        try {
          const userLocation = await ctx.prisma.cmStaffGeneral.findFirst({
            where: {
              pabau_id: { equals: userId },
            },
            select: {
              Location: true,
            },
          })
          const locationIds = userLocation.Location
          if (!locationIds) {
            return []
          }
          const ids = []
          for (const item of locationIds?.split(',')) {
            ids.push(Number.parseInt(item))
          }
          const location = await ctx.prisma.companyBranch.findMany({
            where: {
              company_id: { equals: companyId },
              is_active: { equals: 1 },
              id: { in: ids },
            },
            orderBy: {
              name: 'asc',
            },
          })
          return location
        } catch (error) {
          return error
        }
      },
    })
  },
})

export const CreateCompanyBranch = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createOneCompanyBranchWithAssignedStaff', {
      type: CreateCompanyBranchResponse,
      description: 'Creates one company branch with cm_staff_general',
      args: CreateCompanyBranchInputType,
      async resolve(_, input: CreateBranchInputType, ctx: Context) {
        return await new LocationService(ctx).createLocation(input)
      },
    })
    t.field('updateOneCompanyBranchWithAssignedStaff', {
      type: UpdateCompanyBranchResponse,
      description: 'Update one company branch with cm_staff_general',
      args: UpdateCompanyBranchInputType,
      async resolve(_, input: UpdateBranchInputType, ctx: Context) {
        return await new LocationService(ctx).updateLocation(input)
      },
    })
  },
})
