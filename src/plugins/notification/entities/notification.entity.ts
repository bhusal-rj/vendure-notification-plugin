import { DeepPartial, ID, VendureEntity, Customer } from "@vendure/core";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

@Entity()
export class NotificationItem extends VendureEntity {
  constructor(input?: DeepPartial<NotificationItem>) {
    super(input);
  }

  @Column()
  title: string;

  @Column()
  message: string;

  @ManyToMany(
    (type) => Customer,
    (customer) => customer.customFields.notification,
    { cascade: true }
  )
  @JoinTable()
  customer: Customer[];
}
