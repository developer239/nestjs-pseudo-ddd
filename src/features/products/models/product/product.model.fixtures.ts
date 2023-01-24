import { ProductProperties } from 'src/features/products/models/product/product.model'

// TODO: use actual library for fixtures
const faker = {
  lorem: {
    word: () => 'word',
    paragraph: () => 'paragraph',
  },
  datatype: {
    number: (max?: number) => Math.floor(Math.random() * (max || 100)),
  },
}

export class ProductModelFixtures {
  static getData = (
    data?: Partial<ProductProperties>
  ): Omit<ProductProperties, 'id'> => ({
    name: data?.name || faker.lorem.word(),
    description: data?.description || faker.lorem.paragraph(),
    price: data?.price || faker.datatype.number(20),
  })

  static getModelData = (
    data?: Partial<ProductProperties>
  ): ProductProperties => ({
    id: data?.id || faker.datatype.number(),
    ...ProductModelFixtures.getData(data),
  })
}
