import { IQueryResult } from '@nestjs/cqrs'

export class ProductResult {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly price: number
  ) {}
}

export class ProductsResult
  extends Array<ProductResult>
  implements IQueryResult {}
