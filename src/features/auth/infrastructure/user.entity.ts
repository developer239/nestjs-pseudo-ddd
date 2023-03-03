import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'src/_packages/core/entities/base.entity'

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column() username: string

  @Column() password: string

  @Column() salt: string
}
