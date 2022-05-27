import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Dvd } from "./dvd.entity";
import { User } from "./user.entity";
import { v4 as uuid } from "uuid";

@Entity()
export class Cart {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ default: false })
  paid: boolean;

  @Column({ type: "float", default: 0 })
  total: number;

  @ManyToMany((type) => Dvd, { eager: true })
  @JoinTable()
  dvds: Dvd[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
