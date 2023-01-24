import { BaseModel } from 'src/_packages/core/models/base.model'

// TODO: use interface
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ProductProperties = {
  readonly id: number
  readonly name: string
  readonly description: string
  readonly price: number
}

export type UnsavedProductProperties = Omit<ProductProperties, 'id'>

export class ProductModel extends BaseModel<ProductProperties> {
  private readonly id: number

  private readonly name: string

  private readonly price: number

  private readonly description: string
}
