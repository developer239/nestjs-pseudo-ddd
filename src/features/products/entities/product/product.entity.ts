import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'src/_packages/core/entities/base.entity'

@Entity()
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column({ type: 'varchar' }) name = ''

  @Column({ type: 'text' }) description = ''

  @Column({ type: 'float' }) price = 0
}
