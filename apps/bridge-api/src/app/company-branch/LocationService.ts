import { Context } from '../../context'
import { Prisma } from '@prisma/client'
import {
  BadgesList,
  CompanyBranchLastOrder,
  UpdateBranchInputType,
  CreateBranchInputType,
  CreateBranchResponseType,
  UpdateBranchResponseType,
} from './dto'

export default class LocationService {
  public constructor(private ctx: Context) {}

  public async findCompanyBranchLastOrder(): Promise<CompanyBranchLastOrder> {
    return await this.ctx.prisma.companyBranch.findFirst({
      orderBy: {
        loc_order: 'desc',
      },
      select: {
        loc_order: true,
      },
    })
  }

  public async createCompanyBranch(
    input: CreateBranchInputType,
    companyBranchRecord: CompanyBranchLastOrder,
    companyGroupId: number,
    companyId: number
  ) {
    return await this.ctx.prisma.companyBranch.create({
      data: {
        address: input.address,
        bookable_online: input.bookable,
        calendar_bookable: input.hasCalender,
        city: input.city,
        color: input.color,
        county: input.country,
        custom_id: input.customId,
        email: input.email,
        group_id: companyGroupId,
        is_active: input.isActive,
        is_default: false,
        lat: input.lat,
        lng: input.lng,
        loc_order: companyBranchRecord.loc_order + 1,
        name: input.name,
        online_bookings: input.onlineBooking,
        phone: input.phone,
        postcode: input.postcode,
        region: input.region,
        send_conf_email: input.sendConfEmil,
        street: input.street,
        website: input.website,
        show_online: input.showOnline,
        company_id: companyId,
      },
    })
  }

  public async updateCompanyBranch(
    locationId: number,
    input: UpdateBranchInputType
  ) {
    return await this.ctx.prisma.companyBranch.update({
      where: {
        id: locationId,
      },
      data: {
        address: {
          set: input.address,
        },
        bookable_online: {
          set: input.bookable,
        },
        calendar_bookable: {
          set: input.hasCalender,
        },
        city: {
          set: input.city,
        },
        county: {
          set: input.country,
        },
        email: {
          set: input.email,
        },
        is_active: {
          set: input.isActive,
        },
        lat: {
          set: input.lat,
        },
        lng: {
          set: input.lng,
        },
        name: {
          set: input.name,
        },
        online_bookings: {
          set: input.onlineBooking,
        },
        phone: {
          set: input.phone,
        },
        postcode: {
          set: input.postcode,
        },
        region: {
          set: input.region,
        },
        send_conf_email: {
          set: input.sendConfEmil,
        },
        street: {
          set: input.street,
        },
        website: {
          set: input.website,
        },
        show_online: {
          set: input.showOnline,
        },
      },
    })
  }

  public async createCompanyBranchAttachments(
    companyId: number,
    locationId: number,
    badges: BadgesList[]
  ): Promise<void> {
    const insertArray = []
    for (const item of badges) {
      insertArray.push({
        location_id: locationId,
        company_id: companyId,
        type: 'antd_badge',
        url: item.icon,
        description: item.name,
      })
    }

    if (insertArray.length > 0) {
      await this.ctx.prisma.companyBranchAttachment.createMany({
        data: insertArray,
      })
    }
  }

  public async createLocation(
    input: CreateBranchInputType
  ): Promise<CreateBranchResponseType> {
    const companyId = this.ctx?.authenticated?.company
    try {
      const companyGroupRecord = await this.ctx.prisma.companyBranchGroup.findFirst(
        {
          where: {
            company_id: {
              equals: companyId,
            },
          },
        }
      )
      const companyBranchRecord = await this.findCompanyBranchLastOrder()
      const companyBranch = await this.createCompanyBranch(
        input,
        companyBranchRecord,
        companyGroupRecord.id,
        companyId
      )

      const locationId = companyBranch.id
      const assignedUsers = []
      for (const user of input?.employees) {
        assignedUsers.push(user.id)
      }

      const list = `,${locationId}`
      if (assignedUsers.length > 0) {
        await this.ctx.prisma
          .$executeRaw`UPDATE cm_staff_general SET Location = CONCAT(Location, ${list}) where ID IN (${Prisma.join(
          assignedUsers
        )});`
      }

      await this.createCompanyBranchAttachments(
        companyId,
        locationId,
        input.badges
      )

      return {
        id: locationId,
      }
    } catch (error) {
      return error
    }
  }

  public async updateLocation(
    input: UpdateBranchInputType
  ): Promise<UpdateBranchResponseType> {
    const companyId = this.ctx?.authenticated?.company
    try {
      const locationId = input?.id
      const companyBranch = await this.updateCompanyBranch(locationId, input)

      const list = `,${locationId}`
      await this.ctx.prisma
        .$executeRaw`UPDATE cm_staff_general SET Location = REPLACE(Location,${list},"") where FIND_IN_SET(${locationId}, Location);`

      const assignedUsers = []
      for (const user of input?.employees) {
        assignedUsers.push(user.id)
      }

      if (assignedUsers.length > 0) {
        await this.ctx.prisma
          .$executeRaw`UPDATE cm_staff_general SET Location = CONCAT(Location, ${list}) where ID IN (${Prisma.join(
          assignedUsers
        )});`
      }

      await this.ctx.prisma.companyBranchAttachment.deleteMany({
        where: {
          location_id: { equals: locationId },
        },
      })

      await this.createCompanyBranchAttachments(
        companyId,
        locationId,
        input.badges
      )

      return {
        affected_row: companyBranch ? 1 : 0,
      }
    } catch (error) {
      return error
    }
  }
}
