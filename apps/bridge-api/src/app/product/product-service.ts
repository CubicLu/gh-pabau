import type { InvProduct } from '@prisma/client'
import type { Context } from '../../context'
import type { ProductStockPerLocation, InventoryStock } from './dto'
import Product from './product'

export default class ProductService {
  private product: Product
  public constructor(private ctx: Context, private product_id?: number) {
    this.product = new Product(this.ctx, this.product_id)
  }
  public async updateStock(locations: { id: number; max: number }[]) {
    try {
      for (const location of locations) {
        await this.product.stock.update(location?.id, location.max)
      }
    } catch (error) {
      throw new Error(`Product stock was not updated, error: ${error}`)
    }
  }
  public async newProduct(
    data,
    stock?: ProductStockPerLocation[]
  ): Promise<InvProduct> {
    try {
      const product = await this.product.create(data)
      if (stock) {
        await this.product.stock.create(product, stock)
      }
      return product
    } catch {
      throw new Error(`Something went wrong while creating a new product`)
    }
  }
  public async updateProduct(
    data,
    where,
    stock?: ProductStockPerLocation[]
  ): Promise<InvProduct> {
    try {
      const product = await this.product.update(data, where)
      if (stock) {
        await this.updateStock(stock)
      }
      return product
    } catch (error) {
      throw new Error(
        `Something went wrong while creating a new product error: ${error}`
      )
    }
  }
  public async availableProductStock(): Promise<InventoryStock[]> {
    return this.product.stock.availableStock
  }
}
