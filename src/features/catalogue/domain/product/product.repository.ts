import {
  IProductModel,
  ProductProperties,
} from 'src/features/catalogue/domain/product/product.model'

export abstract class ProductRepository {
  abstract createProduct(data: ProductProperties): Promise<IProductModel>
}
