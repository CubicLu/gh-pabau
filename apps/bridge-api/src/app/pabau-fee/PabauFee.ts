import { Context } from '../../context'

export default class PabauFee {
  public constructor(private ctx: Context, private amount: number) {
    this.amount = amount
  }
  public async calculatePabauFee(billAmount: number = this.amount) {
    let feeAmount = 0.01
    const companySubrscriptionData = await this.ctx.prisma.companySubscription.findFirst(
      {
        where: {
          company_id: { equals: this.ctx.authenticated.company },
        },
      }
    )
    try {
      const fee = companySubrscriptionData.stripe_fee
      const feeType = companySubrscriptionData.stripe_fee_type

      switch (feeType) {
        case 'percentage':
          feeAmount = (billAmount * fee) / 100
          break
        case 'flat':
          feeAmount = fee
          break
        default:
          feeAmount = 0.01
          break
      }
    } catch {
      throw new Error('Invalid Fee')
    }
    return Math.round((feeAmount + Number.EPSILON) * 100)
  }
}
