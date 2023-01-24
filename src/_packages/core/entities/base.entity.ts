import { Exclude } from 'class-transformer'
import {
  BaseEntity as TypeORMBaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class BaseEntity extends TypeORMBaseEntity {
  @Exclude() @CreateDateColumn({ select: false }) createdAt?: Date = new Date()

  @Exclude() @UpdateDateColumn({ select: false }) updatedAt?: Date = new Date()

  @Exclude() @DeleteDateColumn({ select: false }) deletedAt?: Date | null = null
}
