import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm'
import { BaseEntity } from 'src/_packages/core/entities/base.entity'
import { UserEntity } from 'src/features/auth/infrastructure/user.entity'

@Entity()
export class EventEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column({ length: 100 }) title: string

  @Column({ type: 'text' }) description: string

  @Column({ type: 'timestamp' }) startsAt: Date

  @Column({
    default: 1,
  })
  capacity: number

  @ManyToOne(() => UserEntity, (user) => user.id, {
    cascade: true,
  })
  @JoinColumn()
  owner: UserEntity

  @ManyToMany(() => UserEntity, {
    cascade: true,
  })
  @JoinTable()
  attendees: UserEntity[]
}
