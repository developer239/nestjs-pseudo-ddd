import { Injectable } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'
import {
  IProductModel,
  ProductImplement,
  ProductProperties,
} from 'src/features/catalogue/domain/product/product.model'

@Injectable()
export class ProductFactory {
  constructor(private readonly eventPublisher: EventPublisher) {}

  create(properties: ProductProperties): IProductModel {
    return this.eventPublisher.mergeObjectContext(
      new ProductImplement(properties)
    )
  }
}
