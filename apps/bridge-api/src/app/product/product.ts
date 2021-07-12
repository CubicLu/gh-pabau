import type { InvProduct } from '@prisma/client'
import type { Context } from '../../context'
import Stock from './stock-take'

export default class Product {
  get stock(): Stock {
    return new Stock(this.ctx, this.id)
  }
  public constructor(private ctx: Context, private id: number) {}

  public async create(data): Promise<InvProduct> {
    try {
      return await this.ctx.prisma.invProduct.create({
        data: {
          ...data,
          Company: {
            connect: { id: this.ctx.authenticated.company },
          },
          User: {
            connect: { id: this.ctx.authenticated.user },
          },
        },
      })
    } catch {
      throw new Error(`Unexpected error occurred while creating, ${data?.name}`)
    }
  }

  public async update(data, where): Promise<InvProduct> {
    try {
      return await this.ctx.prisma.invProduct.update({
        where: {
          id: where?.id,
        },
        data: {
          ...data,
          Company: {
            connect: { id: this.ctx.authenticated.company },
          },
          User: {
            connect: { id: this.ctx.authenticated.user },
          },
        },
      })
    } catch {
      throw new Error(`Unexpected error occurred while creating, ${data?.name}`)
    }
  }
}
