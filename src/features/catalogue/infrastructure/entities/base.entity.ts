import {
  BaseEntity as TypeORMBaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class BaseEntity extends TypeORMBaseEntity {
  @CreateDateColumn()
  createdAt?: Date = new Date()

  @UpdateDateColumn()
  updatedAt?: Date = new Date()

  @DeleteDateColumn()
  deletedAt?: Date | null = null
}
