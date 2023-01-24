import { IEvent } from '@nestjs/cqrs'
import { ProductProperties } from 'src/features/catalogue/domain/product/product.model'

export class ProductCreatedEvent implements IEvent, ProductProperties {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly price: number
}
