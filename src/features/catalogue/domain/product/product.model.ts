import { AggregateRoot } from '@nestjs/cqrs'
import { ProductCreatedEvent } from 'src/features/catalogue/domain/product/product.events'

export type ProductRequiredProperties = Required<{
  readonly id: string
  readonly name: string
  readonly description: string
  readonly price: number
}>

export type ProductOptionalProperties = Partial<{}>

export type ProductProperties = ProductRequiredProperties &
  ProductOptionalProperties

export interface IProductModel {
  properties: () => ProductProperties
  create: () => void
  commit: () => void
}

export class ProductImplement extends AggregateRoot implements IProductModel {
  private readonly id: string
  private readonly name: string
  private readonly price: number
  private readonly description: string

  constructor(
    properties: ProductRequiredProperties & ProductOptionalProperties
  ) {
    super()
    Object.assign(this, properties)
  }

  public properties(): ProductProperties {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
    }
  }

  create(): void {
    this.apply(Object.assign(new ProductCreatedEvent(), this))
  }
}
