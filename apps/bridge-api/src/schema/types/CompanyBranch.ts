import { extendType } from 'nexus'
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
