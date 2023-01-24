import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateProductCommand } from 'src/features/catalogue/application/commands/create-product.command'
import { ProductResult } from 'src/features/catalogue/application/result.types'
import { ProductRepository } from 'src/features/catalogue/domain/product/product.repository'

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand, ProductResult>
{
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(command: CreateProductCommand): Promise<ProductResult> {
    const product = await this.productRepository.createProduct({
      // @ts-ignore TODO: replace with ''
      id: undefined,
      name: command.name,
      description: command.description,
      price: command.price,
    })

    product.create()
    product.commit()

    return product.properties()
  }
}
