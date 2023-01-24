import { ProductModel } from 'src/features/products/models/product/product.model'
import { ProductModelFixtures } from 'src/features/products/models/product/product.model.fixtures'

describe('[domain] product model', () => {
  describe('properties', () => {
    it('should return product properties', () => {
      const properties = ProductModelFixtures.getModelData()

      const product = new ProductModel(properties)

      expect(product.properties()).toStrictEqual(properties)
    })
  })
})
