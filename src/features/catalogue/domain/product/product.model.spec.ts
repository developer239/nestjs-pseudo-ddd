import { ProductImplement } from 'src/features/catalogue/domain/product/product.model'
import { getProductModelDataFixture } from 'src/features/catalogue/domain/product/product.model.fixtures'

describe('[domain] product model', () => {
  describe('properties', () => {
    it('should return product properties', () => {
      const properties = getProductModelDataFixture()

      const product = new ProductImplement(properties)

      expect(product.properties()).toStrictEqual(properties)
    })
  })
})
