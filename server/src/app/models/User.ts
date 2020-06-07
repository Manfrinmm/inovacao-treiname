import { Exclude } from "class-transformer";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import UserCourses from "./UserCourses";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  rg: string;

  @Column()
  phone: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => UserCourses, userCourses => userCourses.courses)
  courses: UserCourses[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
