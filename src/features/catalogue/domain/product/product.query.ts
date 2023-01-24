import { IProductModel } from 'src/features/catalogue/domain/product/product.model'

export abstract class ProductQuery {
  abstract findProducts(offset: number, limit: number): Promise<IProductModel[]>
}
