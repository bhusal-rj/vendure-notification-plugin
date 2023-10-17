import { CustomCustomerFields } from "@vendure/core/dist/entity/custom-entity-fields";
import { NotificationItem } from "./entities/notification.entity";

declare module "@vendure/core/dist/entity/custom-entity-fields" {
  interface CustomCustomerFields {
    notification: NotificationItem[];
  }
}
