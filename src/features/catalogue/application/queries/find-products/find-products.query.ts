import { IQuery } from '@nestjs/cqrs'

export class FindProductsQuery implements IQuery {
  constructor(readonly offset: number, readonly limit: number) {}
}
