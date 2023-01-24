/* eslint-disable @typescript-eslint/ban-types,@typescript-eslint/prefer-readonly */
import { ApiProperty } from '@nestjs/swagger'
import { BaseModel } from 'src/_packages/core/models/base.model'

export type ProductRequiredProperties = Required<{
  readonly id: number
  readonly name: string
  readonly description: string
  readonly price: number
}>

export type ProductOptionalProperties = Partial<{}>

export type ProductProperties = ProductRequiredProperties &
  ProductOptionalProperties

export type UnsavedProductProperties = Omit<ProductProperties, 'id'>

export class ProductModel extends BaseModel<
  ProductRequiredProperties,
  ProductOptionalProperties,
  UnsavedProductProperties
> {
  @ApiProperty({ format: 'number' }) private readonly id: number

  @ApiProperty({ example: 'Jacuzzi' }) private readonly name: string

  @ApiProperty({ example: 'So that you can have fun after work.' })
  private readonly price: number

  @ApiProperty({ example: 42 }) private readonly description: string
}
