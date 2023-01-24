import {
  IProductModel,
  ProductImplement,
  ProductProperties,
} from 'src/features/catalogue/domain/product/product.model'

// TODO: use new faker library
const faker = {
  lorem: {
    word: () => 'word',
    paragraph: () => 'paragraph',
  },
  datatype: {
    uuid: () => Math.random().toString(36).substring(2, 15),
    number: (max: number) => Math.floor(Math.random() * max),
  },
}

export const getProductDataFixture = (
  data?: Partial<ProductProperties>
): Omit<ProductProperties, 'id'> => ({
  name: data?.name || faker.lorem.word(),
  description: data?.description || faker.lorem.paragraph(),
  price: data?.price || faker.datatype.number(20),
})

export const getProductModelDataFixture = (
  data?: Partial<ProductProperties>
): ProductProperties => ({
  id: data?.id || faker.datatype.uuid(),
  name: data?.name || faker.lorem.word(),
  description: data?.description || faker.lorem.paragraph(),
  price: data?.price || faker.datatype.number(20),
})

export const getProductModelFixture = (
  data?: Partial<ProductProperties>
): IProductModel => new ProductImplement(getProductModelDataFixture(data))
