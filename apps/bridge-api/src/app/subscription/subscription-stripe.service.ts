import Stripe from 'stripe'
import { Context } from '../../context'
import {
  SubscriptionCardDetailsOutput,
  SubscriptionDetailsOutput,
  SubscriptionQueryInputs,
} from './dto/subscription.dto'
import { SubscriptionInvoice } from './nexus-type'
import { SubscriptionService } from './subscription.service'

export default class SubscriptionStripe extends SubscriptionService {
  client: Stripe
  public constructor(protected ctx: Context, protected client_id: string) {
    super(ctx, client_id)
  }
  public async build(): Promise<void> {
    console.info('Subscription Stripe is initialized')
    this.type = 'Stripe'
    this.client = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
    })
  }

  public async listSubscriptions(
    input: SubscriptionQueryInputs
  ): Promise<typeof SubscriptionInvoice[]> {
    const params: { [key: string]: string | number } = {
      customer: this.client_id,
      limit: 100,
    }

    if (input.status === 'PAID') {
      input.status = 'succeeded'
    }

    // let response = await this.client.invoices.list(params)
    let response = await this.client.charges.list(params)

    let invoices = []
    let has_more = true

    while (has_more && response?.data) {
      invoices = [
        ...invoices,
        ...response.data
          ?.filter(
            (item) =>
              (input.searchTerm &&
                `${
                  item.description +
                  item.amount +
                  (item.invoice ?? item.id) +
                  item.created +
                  (item.status === 'succeeded' ? 'paid' : item.status)
                }`
                  .toLowerCase()
                  .includes(input.searchTerm.toLowerCase())) ||
              !input.searchTerm
          )
          ?.filter(
            (item) =>
              (input.status === 'succeeded' && item.status === 'succeeded') ||
              (input.status !== '' &&
                input.status !== 'succeeded' &&
                item.status !== 'succeeded') ||
              input.status === ''
          )
          .map((item) => ({
            ...item,
            id: item.invoice ?? item.id,
            amount: (item.amount / 100).toFixed(2),
            currency: item.currency?.toUpperCase(),
            date: new Date(item.created * 1000).toLocaleDateString('en-US'),
            description: item.description ?? 'Pabau Invoice',
            invoice_link: item.receipt_url,
            status:
              item.status === 'succeeded'
                ? 'Paid'
                : item.status?.replace('_', ' ')[0].toUpperCase() +
                  item.status?.replace('_', ' ').slice(1),
          })),
      ]

      response = await this.client.charges.list({
        ...params,
        starting_after: response.data[response.data.length - 1]?.id,
      })

      if (invoices.length >= input.limit + input.offset) break

      has_more = response.has_more ?? false
    }

    return invoices.slice(input.offset, input.offset + input.limit)
  }

  public async countSubscriptions(
    input: SubscriptionQueryInputs
  ): Promise<number> {
    let count = 0
    const params: { [key: string]: string | number } = {
      customer: this.client_id,
      limit: 100,
    }
    if (input.status === 'PAID') {
      input.status = 'succeeded'
    }

    let response = await this.client.charges.list(params)
    let has_more = true
    while (has_more && response?.data) {
      count += response.data
        ?.filter(
          (item) =>
            (input.searchTerm &&
              `${
                item.description +
                item.amount +
                (item.invoice ?? item.id) +
                item.created +
                (item.status === 'succeeded' ? 'paid' : item.status)
              }`
                .toLowerCase()
                .includes(input.searchTerm.toLowerCase())) ||
            !input.searchTerm
        )
        ?.filter(
          (item) =>
            (input.status === 'succeeded' && item.status === 'succeeded') ||
            (input.status !== '' &&
              input.status !== 'succeeded' &&
              item.status !== 'succeeded') ||
            input.status === ''
        ).length

      response = await this.client.charges.list({
        ...params,
        starting_after: response.data[response.data.length - 1]?.id,
      })

      has_more = response.has_more ?? false
    }
    return count
  }

  public async getDetails(): Promise<SubscriptionDetailsOutput> {
    const res = await this.client.subscriptions.list({
      customer: this.client_id,
      status: 'active',
    })
    const subscription = res.data[res.data.length - 1]

    const currentDate = new Date()
    const billingDay = new Date(
      subscription?.billing_cycle_anchor * 1000
    ).getDate()

    const nextChargeDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      billingDay
    )

    if (currentDate > nextChargeDate) {
      nextChargeDate.setMonth(nextChargeDate.getMonth() + 1)
    }

    return {
      id: subscription?.id ?? '',
      currency: subscription['plan']?.currency
        ? subscription['plan']?.currency?.toUpperCase()
        : '',
      app_fee: subscription?.application_fee_percent ?? 0,
      interval_unit: subscription['plan']?.interval || '',
      amount: subscription['plan']?.amount
        ? subscription['plan']?.amount / 100
        : 0,
      name: subscription['plan']?.nickname || 'Subscription Plan',
      status: subscription?.status || '',
      created_at: new Date(subscription['plan']?.created ?? ''),
      next_charge_date: nextChargeDate.toLocaleDateString('en-US'),
      next_charge_amount: subscription['plan']?.amount
        ? subscription['plan']?.amount / 100
        : 0,
    }
  }
  public async getCardDetails(): Promise<SubscriptionCardDetailsOutput> {
    let res = await this.client.customers.listSources(this.client_id, {
      object: 'bank_account',
    })
    let bank
    if (res?.data?.length > 0) bank = res.data[res?.data?.length - 1]

    res = await this.client.customers.listSources(this.client_id, {
      object: 'card',
    })
    let card
    if (res?.data?.length > 0) card = res.data[res?.data?.length - 1]

    return {
      ...bank,
      ...card,
      account_number_ending: bank?.last4,
      account_holder_name: card?.name,
    }
  }
}
