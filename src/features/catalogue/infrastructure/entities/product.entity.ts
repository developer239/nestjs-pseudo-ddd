import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'src/features/catalogue/infrastructure/entities/base.entity'

@Entity()
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar' })
  name = ''

  @Column({ type: 'text' })
  description = ''

  @Column({ type: 'float' })
  price = 0
}
