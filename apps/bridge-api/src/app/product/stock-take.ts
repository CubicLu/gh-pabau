import type {
  InventoryMovement,
  InvProduct,
  InvWarehouseProduct,
} from '@prisma/client'
import type { Context } from '../../context'
import type { InventoryStock, ProductStockPerLocation } from './dto'

export default class Stock {
  get availableStock(): InventoryStock[] | Promise<InventoryStock[]> {
    return this._availableStock
      ? this._availableStock
      : this.calculateAvailableStock(this.product_id ?? null).then(
          (stock) => stock
        )
  }
  private _availableStock: InventoryStock[]

  public constructor(private ctx: Context, private product_id: number) {
    this.calculateAvailableStock(this.product_id ?? null).then(
      (product) => (this._availableStock = product)
    )
  }
  /**
   * Raw query fetches all locations and available stock per location for the requested product_id
   *
   * @param product_id-number
   */
  private calculateAvailableStock(
    product_id: number
  ): Promise<InventoryStock[]> {
    return this.ctx.prisma.$queryRaw<InventoryStock[]>`
    SELECT DISTINCT l.id, l.name,
    SUM(IF(w.product_id=${product_id}, w.quantity, 0)) as quantity
    FROM  company_branches l
    LEFT JOIN inv_warehouses_products w on w.location_id = l.id
    LEFT JOIN inv_products p ON w.product_id = p.id
    WHERE l.company_id = ${this.ctx.authenticated.company}
    AND l.is_active = 1
    GROUP BY l.id`
  }
  public async availableStockPerLocation(
    location_id: number
  ): Promise<InventoryStock> {
    const stock = await this.calculateAvailableStock(
      this.product_id ?? null
    ).then((stock) => stock)
    console.log('all stock', stock)
    return this._availableStock?.find((stock) => stock?.id === location_id)
  }
  /**
   *
   * @param location_id-number
   * @param new_stock-number
   */
  public async update(
    location_id: number,
    new_stock: number,
    room_id?: number,
    sale_item_id?: number
  ): Promise<InvWarehouseProduct> {
    const stock = await this.availableStockPerLocation(location_id)
    const quantity =
      new_stock > stock?.quantity
        ? new_stock - stock?.quantity
        : stock?.quantity - new_stock
    const user = await this.ctx.prisma.user.findUnique({
      where: {
        id: this.ctx.authenticated.user,
      },
      select: {
        full_name: true,
      },
    })
    const warehouse = this.ctx.prisma.invWarehouseProduct.create({
      data: {
        Location: {
          connect: {
            id: stock?.id,
          },
        },
        Product: {
          connect: {
            id: this?.product_id,
          },
        },
        Company: {
          connect: {
            id: this.ctx.authenticated.company,
          },
        },
        User: {
          connect: {
            id: this.ctx.authenticated.user,
          },
        },
        quantity: new_stock,
        batch_code: '',
        description: '',
        expiry_date: null,
      },
    })
    await this.ctx.prisma.inventoryMovement.create({
      data: {
        Location: {
          connect: {
            id: stock?.id,
          },
        },
        Product: {
          connect: {
            id: this?.product_id,
          },
        },
        Company: {
          connect: {
            id: this.ctx.authenticated.company,
          },
        },
        User: {
          connect: {
            id: this.ctx.authenticated.user,
          },
        },
        description: '',
        type: `${user?.full_name}  Logged: ${quantity}`,
        new_quantity: quantity,
        quantity: new_stock,
        room_id: room_id ?? 0,
        sale_item_id: sale_item_id ?? 0,
      },
    })
    return warehouse
  }

  private async createNewLocationStock(
    product: InvProduct,
    stock: ProductStockPerLocation,
    warehouse_id?: number
  ): Promise<InvWarehouseProduct> {
    const warehouse = await this.ctx.prisma.invWarehouseProduct.create({
      data: {
        quantity: stock?.max ?? 0,
        Company: {
          connect: {
            id: this.ctx.authenticated.company,
          },
        },
        Product: {
          connect: {
            id: product?.id,
          },
        },
        Location: {
          connect: {
            id: stock?.id,
          },
        },
        User: {
          connect: {
            id: this.ctx.authenticated.user,
          },
        },
        warehouse_id: warehouse_id ?? 0,
        description: product.Description,
      },
    })
    await this.ctx.prisma.inventoryMovement.create({
      data: {
        Location: {
          connect: {
            id: stock?.id,
          },
        },
        Product: {
          connect: {
            id: this?.product_id,
          },
        },
        Company: {
          connect: {
            id: this.ctx.authenticated.company,
          },
        },
        User: {
          connect: {
            id: this.ctx.authenticated.user,
          },
        },
        description: '',
        type: `Opening Count`,
        new_quantity: stock?.max,
        quantity: stock?.max,
        room_id: 0,
        sale_item_id: 0,
      },
    })
    return warehouse
  }

  public async create(
    product: InvProduct,
    quantities?: ProductStockPerLocation[],
    warehouse_id?: number
  ): Promise<Promise<InvWarehouseProduct>[]> {
    return quantities?.map(
      async (stock) =>
        await this.createNewLocationStock(product, stock, warehouse_id)
    )
  }
  public async newStockMovement(
    product: InvProduct,
    quantity?: number,
    description?: string,
    sale_id?: number,
    room_id?: number,
    type?: string
  ): Promise<InventoryMovement> {
    // TODO Raise this issue should we store the inv_product created_date time as autogen UTC datetime by prisma or in company timezone?
    return await this.ctx.prisma.inventoryMovement.create({
      data: {
        Company: {
          connect: {
            id: this.ctx.authenticated.company,
          },
        },
        User: {
          connect: {
            id: this.ctx.authenticated.user,
          },
        },
        type: type ?? 'Opening Count',
        quantity: quantity ?? 0,
        new_quantity: quantity ?? 0,
        Product: {
          connect: {
            id: product.id,
          },
        },
        date: new Date().getUTCDate(),
        description: description ?? '',
        sale_item_id: sale_id ?? 0,
        room_id: room_id ?? 0,
      },
    })
  }
}
